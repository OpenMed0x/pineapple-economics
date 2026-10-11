import { supabaseAdmin } from '../supabase/server';

const CACHE_TTL_MINUTES = 5;

interface CachedPrice {
  price: number;
  fetchedAt: string;
}

/** 从 market_data_cache 读缓存，命中且未过期就直接用，否则回源拉取 */
async function getCachedOrFetch(
  assetType: string,
  symbol: string,
  fetcher: () => Promise<number>
): Promise<CachedPrice> {
  const { data: cached } = await supabaseAdmin
    .from('market_data_cache')
    .select('*')
    .eq('asset_type', assetType)
    .eq('symbol', symbol)
    .maybeSingle();

  if (cached) {
    const ageMinutes = (Date.now() - new Date(cached.fetched_at).getTime()) / 60000;
    if (ageMinutes < CACHE_TTL_MINUTES) {
      return { price: cached.data.price, fetchedAt: cached.fetched_at };
    }
  }

  const price = await fetcher();
  const fetchedAt = new Date().toISOString();

  await supabaseAdmin
    .from('market_data_cache')
    .upsert(
      { asset_type: assetType, symbol, data: { price }, fetched_at: fetchedAt },
      { onConflict: 'asset_type,symbol' }
    );

  return { price, fetchedAt };
}

/** 加密货币价格 —— CoinGecko 免费接口，无需 API Key */
async function fetchCryptoPrice(symbol: string): Promise<number> {
  // CoinGecko 用的是 coin id（如 bitcoin、ethereum），不是 ticker（BTC/ETH）
  // 先做一个最常见币种的映射表，后面可以按需要补充
  const COINGECKO_ID_MAP: Record<string, string> = {
    BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana',
    BNB: 'binancecoin', XRP: 'ripple', DOGE: 'dogecoin',
    ADA: 'cardano', AVAX: 'avalanche-2',
  };
  const coinId = COINGECKO_ID_MAP[symbol.toUpperCase()] ?? symbol.toLowerCase();

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
  );
  if (!res.ok) throw new Error(`CoinGecko 请求失败: ${res.status}`);

  const json = await res.json();
  const price = json[coinId]?.usd;
  if (price == null) throw new Error(`CoinGecko 未找到标的: ${symbol}`);

  return price;
}

/** 股票价格 —— 待接入免费数据源（如 Alpha Vantage），需要申请 API Key */
async function fetchEquityPrice(symbol: string): Promise<number> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) {
    throw new Error('股票行情需要配置 ALPHA_VANTAGE_API_KEY 环境变量，暂未接入');
  }

  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
  );
  if (!res.ok) throw new Error(`Alpha Vantage 请求失败: ${res.status}`);

  const json = await res.json();
  const price = parseFloat(json['Global Quote']?.['05. price']);
  if (isNaN(price)) throw new Error(`Alpha Vantage 未找到标的: ${symbol}`);

  return price;
}

/** 统一入口：按资产类别拉取/读缓存价格 */
export async function getMarketPrice(
  assetClass: string,
  symbol: string
): Promise<number> {
  if (assetClass === 'crypto') {
    const { price } = await getCachedOrFetch('crypto', symbol, () => fetchCryptoPrice(symbol));
    return price;
  }
  if (assetClass === 'equity') {
    const { price } = await getCachedOrFetch('equity', symbol, () => fetchEquityPrice(symbol));
    return price;
  }
  throw new Error(`资产类别 ${assetClass} 不支持自动拉取价格`);
}