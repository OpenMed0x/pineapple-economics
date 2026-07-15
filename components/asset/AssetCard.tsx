"use client";

import React, { useState } from 'react';
import { AssetData, SignalStrength, CityREData } from '../../types/asset';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface AssetCardProps {
  data: AssetData;
  onEdit: (data: AssetData) => void;
  onDelete: () => void;
}

const SIGNAL_LABEL: Record<SignalStrength, string> = {
  strong_buy: '强烈看多', buy: '偏多', neutral: '中性',
  sell: '偏空', strong_sell: '强烈看空',
};
const SIGNAL_COLOR: Record<SignalStrength, string> = {
  strong_buy: 'bg-emerald-500 text-white',
  buy:        'bg-emerald-100 text-emerald-700',
  neutral:    'bg-slate-100 text-slate-600',
  sell:       'bg-rose-100 text-rose-700',
  strong_sell:'bg-rose-500 text-white',
};

const SUBTYPE_LABEL: Record<string, string> = {
  crypto: '加密货币', index: '股票指数', bond: '债券',
  commodity: '大宗商品', fx: '外汇', realestate: '房地产',
  stock: '股票', deposit: '存款', pe: '私募', fund: '公募',
  futures: '期货', options: '期权', insurance: '保险',
};

// ── 通用展示组件 ──────────────────────────────────────

export const KV = ({ label, value }: { label: string; value?: string | null }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 shrink-0">{label}</span>
      <span className="text-xs text-slate-700 flex-1 whitespace-pre-wrap">{value}</span>
    </div>
  );
};

export const Section = ({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const valid = React.Children.toArray(children).filter(Boolean);
  if (valid.length === 0) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-3.5 hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        {open
          ? <ChevronUp size={15} className="text-slate-400" />
          : <ChevronDown size={15} className="text-slate-400" />
        }
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
};

const SignalBadge = ({ signal }: { signal?: SignalStrength }) => {
  if (!signal) return null;
  return (
    <span className={`text-xs px-3 py-0.5 rounded-full font-semibold ${SIGNAL_COLOR[signal]}`}>
      {SIGNAL_LABEL[signal]}
    </span>
  );
};

// ── 各类型展示 ────────────────────────────────────────

function CryptoCard({ data }: { data: AssetData }) {
  const d = data.crypto;
  if (!d) return null;
  return (<>
    <Section title="🌐 加密市场整体">
      <KV label="总市值" value={d.totalMarketCap} />
      <KV label="BTC 主导率" value={d.btcDominance} />
      <KV label="ETH 主导率" value={d.ethDominance} />
      <KV label="全链 TVL" value={d.totalTvl} />
      <KV label="恐惧贪婪指数" value={d.fearGreedIndex} />
      <KV label="稳定币总供应" value={d.stablecoinSupply} />
      <KV label="ETF AUM" value={d.etfAum} />
      <KV label="机构采用程度" value={d.institutionAdoption} />
      <KV label="整体展望" value={d.overallOutlook} />
      <KV label="分析师笔记" value={d.analystNotes} />
    </Section>
    {d.layer1 && (
      <Section title="Layer 1" defaultOpen={false}>
        <KV label="名称" value={d.layer1.name} />
        <KV label="TVL" value={d.layer1.tvl} />
        <KV label="Market Cap" value={d.layer1.marketCap} />
        <KV label="TPS" value={d.layer1.tps} />
        <KV label="Staking Ratio" value={d.layer1.stakingRatio} />
        <KV label="Active Address" value={d.layer1.activeAddress} />
        <KV label="Revenue" value={d.layer1.revenue} />
        <KV label="备注" value={d.layer1.notes} />
      </Section>
    )}
    {d.layer2 && (
      <Section title="Layer 2" defaultOpen={false}>
        <KV label="名称" value={d.layer2.name} />
        <KV label="TVL" value={d.layer2.tvl} />
        <KV label="TPS" value={d.layer2.tps} />
        <KV label="Bridge Volume" value={d.layer2.bridgeVolume} />
        <KV label="备注" value={d.layer2.notes} />
      </Section>
    )}
    {d.defi && (
      <Section title="DeFi" defaultOpen={false}>
        <KV label="协议" value={d.defi.protocol} />
        <KV label="TVL" value={d.defi.tvl} />
        <KV label="Revenue" value={d.defi.revenue} />
        <KV label="Yield" value={d.defi.yield} />
        <KV label="Market Share" value={d.defi.marketShare} />
        <KV label="备注" value={d.defi.notes} />
      </Section>
    )}
    {d.stablecoin && (
      <Section title="Stablecoin" defaultOpen={false}>
        <KV label="名称" value={d.stablecoin.name} />
        <KV label="Supply" value={d.stablecoin.supply} />
        <KV label="Dominance" value={d.stablecoin.dominance} />
        <KV label="Reserve Asset" value={d.stablecoin.reserveAsset} />
        <KV label="备注" value={d.stablecoin.notes} />
      </Section>
    )}
    {d.rwa && (
      <Section title="RWA" defaultOpen={false}>
        <KV label="RWA TVL" value={d.rwa.rwatvl} />
        <KV label="Treasury" value={d.rwa.treasury} />
        <KV label="Yield" value={d.rwa.yield} />
        <KV label="Institution Adoption" value={d.rwa.institutionAdoption} />
        <KV label="备注" value={d.rwa.notes} />
      </Section>
    )}
    {d.exchange && (
      <Section title="Exchange" defaultOpen={false}>
        <KV label="名称" value={d.exchange.name} />
        <KV label="Spot Volume" value={d.exchange.spotVolume} />
        <KV label="Futures Volume" value={d.exchange.futuresVolume} />
        <KV label="BTC Reserve" value={d.exchange.btcReserve} />
        <KV label="Market Share" value={d.exchange.marketShare} />
        <KV label="备注" value={d.exchange.notes} />
      </Section>
    )}
    {d.token && (
      <Section title="Token 分析" defaultOpen={false}>
        <KV label="价格" value={d.token.price} />
        <KV label="Market Cap" value={d.token.marketCap} />
        <KV label="FDV" value={d.token.fdv} />
        <KV label="Volume" value={d.token.volume} />
        <KV label="Funding Rate" value={d.token.funding} />
        <KV label="OI" value={d.token.oi} />
        <KV label="MVRV" value={undefined} />
        <KV label="备注" value={d.token.notes} />
      </Section>
    )}
    {d.onChain && (
      <Section title="On-chain 指标" defaultOpen={false}>
        <KV label="BTC Active Address" value={d.onChain.btcActiveAddress} />
        <KV label="ETH Gas" value={d.onChain.ethGas} />
        <KV label="Exchange Reserve" value={d.onChain.exchangeReserve} />
        <KV label="MVRV" value={d.onChain.mvrv} />
        <KV label="NUPL" value={d.onChain.nupl} />
        <KV label="Hash Rate" value={d.onChain.hashRate} />
        <KV label="ETF Flow" value={d.onChain.etfFlow} />
        <KV label="备注" value={d.onChain.notes} />
      </Section>
    )}
  </>);
}

function IndexCard({ data }: { data: AssetData }) {
  const d = data.index;
  if (!d) return null;

  const regionGroups = [
    { label: '🇺🇸 美国', items: [
      ['S&P 500', d.us?.sp500], ['Nasdaq 100', d.us?.nasdaq100], ['道琼斯', d.us?.dowJones],
    ]},
    { label: '🇨🇳 中国', items: [
      ['上证', d.china?.shanghai], ['沪深300', d.china?.csi300], ['创业板', d.china?.chinext], ['科创50', d.china?.star50],
    ]},
    { label: '🇭🇰 香港', items: [
      ['恒生', d.hongkong?.hsi], ['恒生科技', d.hongkong?.hsTech],
    ]},
    { label: '🇯🇵 日本', items: [
      ['Nikkei225', d.japan?.nikkei225], ['TOPIX', d.japan?.topix],
    ]},
    { label: '🇰🇷 韩国', items: [
      ['KOSPI', d.korea?.kospi], ['KOSDAQ', d.korea?.kosdaq],
    ]},
    { label: '🇹🇼 台湾', items: [
      ['TAIEX', d.taiwan?.taiex],
    ]},
    { label: '🇪🇺 欧洲', items: [
      ['STOXX600', d.europe?.stoxx600], ['DAX', d.europe?.dax], ['CAC40', d.europe?.cac40], ['FTSE100', d.europe?.ftse100],
    ]},
    { label: '🌏 东南亚', items: [
      ['STI', d.southeastAsia?.sti], ['VNINDEX', d.southeastAsia?.vnindex], ['JCI', d.southeastAsia?.jci],
    ]},
    { label: '🇮🇳 印度', items: [
      ['Nifty50', d.india?.nifty50], ['Sensex', d.india?.sensex],
    ]},
    { label: '🌎 南美', items: [
      ['Bovespa', d.southAmerica?.bovespa],
    ]},
    { label: '🌍 中东', items: [
      ['Tadawul', d.middleEast?.tadawul], ['DFM', d.middleEast?.dfm],
    ]},
    { label: '🌐 全球', items: [
      ['MSCI World', d.global?.msciWorld], ['MSCI ACWI', d.global?.msciAcwi], ['MSCI EM', d.global?.msciEM],
    ]},
    { label: '📊 波动率', items: [
      ['VIX', d.volatility?.vix], ['MOVE', d.volatility?.move],
    ]},
  ] as const;

  return (<>
    {regionGroups.map(({ label, items }) => {
      const filled = items.filter(([, idx]) => idx && (idx.quote?.price || idx.analystNotes));
      if (filled.length === 0) return null;
      return (
        <Section key={label} title={label} defaultOpen={false}>
          {filled.map(([name, idx]) => idx && (
            <div key={name} className="py-2 border-b border-slate-50 last:border-0">
              <p className="text-xs font-semibold text-slate-600 mb-1">{name}</p>
              <KV label="价格" value={idx.quote?.price} />
              <KV label="涨跌%" value={idx.quote?.changePct} />
              <KV label="P/E" value={idx.valuation?.pe} />
              <KV label="Forward P/E" value={idx.valuation?.forwardPe} />
              <KV label="股息率" value={idx.valuation?.dividendYield} />
              <KV label="ETF资金流" value={idx.flow?.etfFlow} />
              <KV label="外资流入" value={idx.flow?.foreignInflow} />
              <KV label="分析笔记" value={idx.analystNotes} />
              {idx.investmentSignal && (
                <div className="mt-1">
                  <SignalBadge signal={idx.investmentSignal} />
                </div>
              )}
            </div>
          ))}
        </Section>
      );
    })}
    {(d.overallOutlook || d.analystNotes) && (
      <Section title="综合研判">
        <KV label="整体展望" value={d.overallOutlook} />
        <KV label="分析师笔记" value={d.analystNotes} />
      </Section>
    )}
  </>);
}

function BondCard({ data }: { data: AssetData }) {
  const d = data.bond;
  if (!d) return null;

  const bondGroups = [
    { label: '🇺🇸 美国国债', items: [
      ['3M', d.usT3m], ['2Y', d.usT2y], ['5Y', d.usT5y], ['10Y', d.usT10y], ['30Y', d.usT30y],
    ]},
    { label: '🇨🇳 中国国债', items: [
      ['2Y', d.cnB2y], ['5Y', d.cnB5y], ['10Y', d.cnB10y], ['30Y', d.cnB30y],
    ]},
    { label: '🇯🇵 日本', items: [['10Y', d.jpB10y], ['30Y', d.jpB30y]] },
    { label: '🇩🇪 德国', items: [['10Y Bund', d.deB10y]] },
    { label: '🇬🇧 英国', items: [['10Y Gilt', d.ukB10y]] },
    { label: '🇫🇷 法国', items: [['10Y OAT', d.frB10y]] },
    { label: '🇮🇹 意大利', items: [['10Y BTP', d.itB10y]] },
    { label: '🇮🇳 印度', items: [['10Y', d.inB10y]] },
    { label: '🇧🇷 巴西', items: [['10Y', d.brB10y]] },
  ] as const;

  return (<>
    {bondGroups.map(({ label, items }) => {
      const filled = items.filter(([, b]) => b?.yield || b?.analystNotes);
      if (filled.length === 0) return null;
      return (
        <Section key={label} title={label} defaultOpen={false}>
          {filled.map(([name, b]) => b && (
            <div key={name} className="py-2 border-b border-slate-50 last:border-0">
              <p className="text-xs font-semibold text-slate-600 mb-1">{name}</p>
              <KV label="收益率" value={b.yield} />
              <KV label="涨跌" value={b.change} />
              <KV label="2Y-10Y利差" value={b.spread2y10y} />
              <KV label="评级" value={b.rating} />
              <KV label="违约风险" value={b.defaultRisk} />
              <KV label="分析笔记" value={b.analystNotes} />
            </div>
          ))}
        </Section>
      );
    })}
    {(d.ig || d.hy || d.em) && (
      <Section title="企业债/信用债" defaultOpen={false}>
        {d.ig && (<>
          <p className="text-xs font-semibold text-slate-600 mt-2 mb-1">投资级 IG</p>
          <KV label="Yield" value={d.ig.yield} />
          <KV label="Credit Spread" value={d.ig.creditSpread} />
          <KV label="CDS" value={d.ig.cds} />
        </>)}
        {d.hy && (<>
          <p className="text-xs font-semibold text-slate-600 mt-2 mb-1">高收益 HY</p>
          <KV label="Yield" value={d.hy.yield} />
          <KV label="Credit Spread" value={d.hy.creditSpread} />
          <KV label="Default Risk" value={d.hy.defaultRisk} />
        </>)}
        {d.em && (<>
          <p className="text-xs font-semibold text-slate-600 mt-2 mb-1">新兴市场 EM</p>
          <KV label="Yield" value={d.em.yield} />
          <KV label="Credit Spread" value={d.em.creditSpread} />
        </>)}
      </Section>
    )}
    {(d.moveIndex || d.overallOutlook || d.analystNotes) && (
      <Section title="综合研判">
        <KV label="MOVE 债券波动率" value={d.moveIndex} />
        <KV label="整体展望" value={d.overallOutlook} />
        <KV label="分析师笔记" value={d.analystNotes} />
      </Section>
    )}
  </>);
}

function CommodityCard({ data }: { data: AssetData }) {
  const d = data.commodity;
  if (!d) return null;

  const groups = [
    { label: '⛽ 能源', keys: ['wti','brent','henryHub','ttfGas','lng','diesel','gasoline','coal'] as const,
      labels: { wti:'WTI原油', brent:'Brent原油', henryHub:'天然气(HH)', ttfGas:'TTF天然气', lng:'LNG', diesel:'柴油', gasoline:'汽油', coal:'煤炭' } },
    { label: '🥇 贵金属', keys: ['gold','silver','platinum','palladium'] as const,
      labels: { gold:'黄金', silver:'白银', platinum:'铂金', palladium:'钯金' } },
    { label: '🔩 工业金属', keys: ['copper','aluminum','nickel','zinc','lead','tin','lithium','cobalt','rareEarth'] as const,
      labels: { copper:'铜', aluminum:'铝', nickel:'镍', zinc:'锌', lead:'铅', tin:'锡', lithium:'锂', cobalt:'钴', rareEarth:'稀土' } },
    { label: '⚙️ 黑色系', keys: ['ironOre','rebar','hotRolled','cokingCoal','coke'] as const,
      labels: { ironOre:'铁矿石', rebar:'螺纹钢', hotRolled:'热卷', cokingCoal:'焦煤', coke:'焦炭' } },
    { label: '🌾 农产品', keys: ['corn','wheat','soybean','rice','cotton','rapeseed'] as const,
      labels: { corn:'玉米', wheat:'小麦', soybean:'大豆', rice:'大米', cotton:'棉花', rapeseed:'菜籽' } },
    { label: '☕ 软商品', keys: ['coffee','cocoa','sugar','oj','rubber'] as const,
      labels: { coffee:'咖啡', cocoa:'可可', sugar:'糖', oj:'橙汁', rubber:'橡胶' } },
  ];

  return (<>
    {groups.map(({ label, keys, labels }) => {
      const filled = keys.filter(k => d[k]?.price || d[k]?.analystNotes);
      if (filled.length === 0) return null;
      return (
        <Section key={label} title={label} defaultOpen={false}>
          {filled.map(k => {
            const item = d[k];
            if (!item) return null;
            return (
              <div key={k} className="py-2 border-b border-slate-50 last:border-0">
                <p className="text-xs font-semibold text-slate-600 mb-1">{(labels as Record<string, string>)[k]}</p>
                <KV label="价格" value={item.price} />
                <KV label="涨跌%" value={item.changePct} />
                <KV label="52周最高" value={item.week52High} />
                <KV label="52周最低" value={item.week52Low} />
                <KV label="LME库存" value={item.lmeInventory} />
                <KV label="上海库存" value={item.shInventory} />
                <KV label="DXY" value={item.dxy} />
                <KV label="价格预测" value={item.forecast} />
                {item.investmentSignal && <div className="mt-1"><SignalBadge signal={item.investmentSignal} /></div>}
                <KV label="分析笔记" value={item.analystNotes} />
              </div>

            );
          })}
        </Section>
      );
    })}
    {(d.overallOutlook || d.analystNotes) && (
      <Section title="综合研判">
        <KV label="CRB指数" value={d.crbIndex} />
        <KV label="整体展望" value={d.overallOutlook} />
        <KV label="分析师笔记" value={d.analystNotes} />
      </Section>
    )}
  </>);
}

function FxCard({ data }: { data: AssetData }) {
  const d = data.fx;
  if (!d) return null;

  const pairGroups = [
    { label: '💱 主要货币对', pairs: [
      ['EUR/USD', d.eurusd], ['USD/JPY', d.usdjpy], ['GBP/USD', d.gbpusd],
      ['USD/CHF', d.usdchf], ['AUD/USD', d.audusd], ['USD/CAD', d.usdcad],
    ]},
    { label: '🇨🇳 人民币', pairs: [
      ['USD/CNH（离岸）', d.usdcnh], ['USD/CNY（在岸）', d.usdcny],
    ]},
    { label: '🌏 亚洲货币', pairs: [
      ['USD/SGD', d.usdsgd], ['USD/HKD', d.usdhkd],
      ['USD/KRW', d.usdkrw], ['USD/TWD', d.usdtwd],
    ]},
    { label: '🌍 新兴市场', pairs: [
      ['USD/AED', d.usduae], ['USD/SAR', d.usdsar],
      ['USD/VND', d.usdvnd], ['USD/IDR', d.usdidr],
      ['USD/BRL', d.usdbrl], ['USD/ARS', d.usdars],
    ]},
  ] as const;

  return (<>
    {d.macro && (
      <Section title="🌐 宏观外汇市场">
        <KV label="DXY 美元指数" value={d.macro.dxy} />
        <KV label="全球外汇储备" value={d.macro.globalFxReserve} />
        <KV label="美元占储备比" value={d.macro.usdShareOfReserve} />
        <KV label="Carry Trade" value={d.macro.carryTrade} />
        <KV label="G10强弱排名" value={d.macro.g10Ranking} />
        <KV label="整体展望" value={d.macro.overallOutlook} />
        <KV label="分析师笔记" value={d.macro.analystNotes} />
      </Section>
    )}
    {pairGroups.map(({ label, pairs }) => {
      const filled = pairs.filter(([, p]) => p?.rate || p?.analystNotes);
      if (filled.length === 0) return null;
      return (
        <Section key={label} title={label} defaultOpen={false}>
          {filled.map(([name, p]) => p && (
            <div key={name} className="py-2 border-b border-slate-50 last:border-0">
              <p className="text-xs font-semibold text-slate-600 mb-1">{name}</p>
              <KV label="汇率" value={p.rate} />
              <KV label="涨跌%" value={p.changePct} />
              <KV label="波动率" value={p.volatility} />
              <KV label="利率差" value={p.rateDiff} />
              <KV label="10Y收益率差" value={p.bond10yDiff} />
              <KV label="经常账户" value={p.currentAccount} />
              {p.investmentSignal && <div className="mt-1"><SignalBadge signal={p.investmentSignal} /></div>}
              <KV label="分析笔记" value={p.analystNotes} />
            </div>
          ))}
        </Section>
      );
    })}
  </>);
}

function RECard({ data }: { data: AssetData }) {
  const re = data.realestate;
  if (!re) return null;

  const cityKeys = [
    'newYork','losAngeles','sanFrancisco','miami','austin','seattle','boston','dallas',
    'beijing','shanghai','shenzhen','guangzhou','hangzhou','chengdu','chongqing','suzhou',
    'tokyo','osaka','hongkong','taipei','seoul',
    'london','paris','berlin','amsterdam','madrid',
    'singapore','bangkok','kualaLumpur','jakarta','hochiminh','manila',
    'dubai','riyadh','abuDhabi','saoPaulo','buenosAires','santiago',
  ] as const;

  const cityLabels: Record<string, string> = {
    newYork:'New York', losAngeles:'Los Angeles', sanFrancisco:'San Francisco',
    miami:'Miami', austin:'Austin', seattle:'Seattle', boston:'Boston', dallas:'Dallas',
    beijing:'北京', shanghai:'上海', shenzhen:'深圳', guangzhou:'广州',
    hangzhou:'杭州', chengdu:'成都', chongqing:'重庆', suzhou:'苏州',
    tokyo:'东京', osaka:'大阪', hongkong:'香港', taipei:'台北', seoul:'首尔',
    london:'伦敦', paris:'巴黎', berlin:'柏林', amsterdam:'阿姆斯特丹', madrid:'马德里',
    singapore:'新加坡', bangkok:'曼谷', kualaLumpur:'吉隆坡',
    jakarta:'雅加达', hochiminh:'胡志明市', manila:'马尼拉',
    dubai:'迪拜', riyadh:'利雅得', abuDhabi:'阿布扎比',
    saoPaulo:'圣保罗', buenosAires:'布宜诺斯艾利斯', santiago:'圣地亚哥',
  };

  return (<>
    {re.macro && (
      <>
        <Section title="🌐 全球宏观">
          <KV label="全球利率环境" value={re.macro.globalRateEnv} />
          <KV label="REITs表现" value={re.macro.reitsPerformance} />
          <KV label="整体展望" value={re.macro.overallOutlook} />
        </Section>
        <Section title="🇺🇸 美国宏观" defaultOpen={false}>
          <KV label="30Y房贷利率" value={re.macro.usMortgage30y} />
          <KV label="Case-Shiller" value={re.macro.usCaseShiller} />
          <KV label="新屋开工" value={re.macro.usHousingStarts} />
          <KV label="成屋销售" value={re.macro.usExistingHomeSales} />
          <KV label="NAR可负担指数" value={re.macro.usNAR} />
        </Section>
        <Section title="🇨🇳 中国宏观" defaultOpen={false}>
          <KV label="LPR 5年期" value={re.macro.cnLpr5y} />
          <KV label="70城房价指数" value={re.macro.cn70CityIndex} />
          <KV label="商品房销售面积" value={re.macro.cnSalesArea} />
          <KV label="房企债务风险" value={re.macro.cnDeveloperDebt} />
        </Section>
      </>
    )}
    {cityKeys.map(key => {
      const city = re[key] as CityREData | undefined;
      if (!city) return null;
      return (
        <Section key={key} title={`🏙️ ${cityLabels[key]}`} defaultOpen={false}>
          <KV label="房价指数" value={city.priceIndex} />
          <KV label="中位房价" value={city.medianPrice} />
          <KV label="近1年涨跌" value={city.change1y} />
          <KV label="近5年涨跌" value={city.change5y} />
          <KV label="毛租金收益率" value={city.grossRentalYield} />
          <KV label="净租金收益率" value={city.netRentalYield} />
          <KV label="月库存" value={city.monthsSupply} />
          <KV label="空置率" value={city.vacancyRate} />
          <KV label="30Y房贷利率" value={city.mortgage30y} />
          <KV label="家庭收入中位数" value={city.householdIncome} />
          <KV label="泡沫指数" value={city.bubbleIndex} />
          {city.investmentSignal && <div className="mt-1"><SignalBadge signal={city.investmentSignal} /></div>}
          <KV label="分析笔记" value={city.analystNotes} />
        </Section>
      );
    })}
    {re.subMarkets && (
      <Section title="🏢 细分市场" defaultOpen={false}>
        <KV label="住宅" value={re.subMarkets.residential} />
        <KV label="写字楼" value={re.subMarkets.office} />
        <KV label="工业/仓储" value={re.subMarkets.industrial} />
        <KV label="数据中心" value={re.subMarkets.dataCenter} />
        <KV label="豪宅" value={re.subMarkets.luxury} />
        <KV label="养老地产" value={re.subMarkets.seniorHousing} />
        <KV label="分析笔记" value={re.subMarkets.analystNotes} />
      </Section>
    )}
  </>);
}

function StockCard({ data }: { data: AssetData }) {
  const d = data.stock;
  if (!d) return null;

  const markets = [
    { key: 'usStock' as const, label: '🇺🇸 美股' },
    { key: 'hkStock' as const, label: '🇭🇰 港股' },
    { key: 'chinaAShare' as const, label: '🇨🇳 A股' },
    { key: 'europeStock' as const, label: '🇪🇺 欧股' },
    { key: 'japanStock' as const, label: '🇯🇵 日股' },
    { key: 'koreaStock' as const, label: '🇰🇷 韩股' },
    { key: 'taiwanStock' as const, label: '🇹🇼 台股' },
    { key: 'seaStock' as const, label: '🌏 东南亚' },
    { key: 'indiaStock' as const, label: '🇮🇳 印度' },
    { key: 'southAmericaStock' as const, label: '🌎 南美' },
  ];

  return (<>
    {markets.map(({ key, label }) => {
      const m = d[key];
      if (!m) return null;
      return (
        <Section key={key} title={label} defaultOpen={false}>
          {m.macro && (<>
            <p className="text-xs font-semibold text-slate-500 mb-2 mt-1">市场宏观</p>
            <KV label="指数表现" value={m.macro.indexPerformance} />
            <KV label="总市值" value={m.macro.marketCap} />
            <KV label="市场P/E" value={m.macro.marketPe} />
            <KV label="外资流入" value={m.macro.foreignFlow} />
            <KV label="央行利率" value={m.macro.centralBankRate} />
            <KV label="分析笔记" value={m.macro.analystNotes} />
          </>)}
          {m.watchlist && m.watchlist.length > 0 && (<>
            <p className="text-xs font-semibold text-slate-500 mb-2 mt-3">个股研究</p>
            {m.watchlist.map((stock, idx) => (
              <div key={idx} className="py-2 border-b border-slate-50 last:border-0">
                <p className="text-xs font-semibold text-slate-700 mb-1">
                  {stock.ticker} {stock.name && `· ${stock.name}`}
                </p>
                <KV label="价格" value={stock.price} />
                <KV label="涨跌%" value={stock.changePct} />
                <KV label="P/E" value={stock.pe} />
                <KV label="Forward P/E" value={stock.forwardPe} />
                <KV label="市值" value={stock.marketCap} />
                <KV label="毛利率" value={stock.grossMargin} />
                <KV label="营收增速" value={stock.revenueGrowth} />
                <KV label="EPS增速" value={stock.epsGrowth} />
                <KV label="ROE" value={stock.roe} />
                <KV label="护城河" value={stock.moat} />
                <KV label="分析师目标价" value={stock.priceTarget} />
                {stock.investmentSignal && <div className="mt-1"><SignalBadge signal={stock.investmentSignal} /></div>}
                <KV label="分析笔记" value={stock.analystNotes} />
              </div>
            ))}
          </>)}
          {m.investmentSignal && (
            <div className="mt-2">
              <SignalBadge signal={m.investmentSignal} />
            </div>
          )}
        </Section>
      );
    })}
    {(d.overallOutlook || d.analystNotes) && (
      <Section title="综合研判">
        <KV label="整体展望" value={d.overallOutlook} />
        <KV label="分析师笔记" value={d.analystNotes} />
      </Section>
    )}
  </>);
}

function DepositCard({ data }: { data: AssetData }) {
  const d = data.deposit;
  if (!d) return null;

  const countries = [
    { key: 'us' as const, label: '🇺🇸 美国' },
    { key: 'china' as const, label: '🇨🇳 中国' },
    { key: 'eurozone' as const, label: '🇪🇺 欧元区' },
    { key: 'japan' as const, label: '🇯🇵 日本' },
    { key: 'uk' as const, label: '🇬🇧 英国' },
    { key: 'singapore' as const, label: '🇸🇬 新加坡' },
    { key: 'hongkong' as const, label: '🇭🇰 香港' },
    { key: 'australia' as const, label: '🇦🇺 澳大利亚' },
  ];

  return (<>
    {countries.map(({ key, label }) => {
      const r = d[key];
      if (!r) return null;
      return (
        <Section key={key} title={label} defaultOpen={false}>
          <KV label="活期利率" value={r.demand} />
          <KV label="3M定期" value={r.fixed3m} />
          <KV label="6M定期" value={r.fixed6m} />
          <KV label="1Y定期" value={r.fixed1y} />
          <KV label="3Y定期" value={r.fixed3y} />
          <KV label="5Y定期" value={r.fixed5y} />
          <KV label="货币基金收益率" value={r.mmf} />
          <KV label="备注" value={r.notes} />
        </Section>
      );
    })}
    <Section title="📊 宏观对比" defaultOpen={false}>
      <KV label="联邦基金利率" value={d.fedFundsRate} />
      <KV label="3M国债收益率" value={d.usTBill3m} />
      <KV label="SOFR" value={d.sofrRate} />
      <KV label="中国LPR 1Y" value={d.chinaLpr1y} />
      <KV label="中国LPR 5Y" value={d.chinaLpr5y} />
      <KV label="中国MLF" value={d.chinaMLF} />
      <KV label="中国RRR" value={d.chinaRRR} />
      <KV label="存款 vs 通胀" value={d.yieldVsInflation} />
      <KV label="存款 vs 10Y国债" value={d.yieldVsBond10y} />
      <KV label="存款 vs 股票股息" value={d.yieldVsEquity} />
      <KV label="机会成本分析" value={d.opportunityCost} />
      <KV label="加息/降息周期" value={d.rateHikeCycle} />
      <KV label="通胀展望" value={d.inflationOutlook} />
      <KV label="整体展望" value={d.overallOutlook} />
      <KV label="分析师笔记" value={d.analystNotes} />
    </Section>
  </>);
}

function PECard({ data }: { data: AssetData }) {
  const d = data.pe;
  if (!d) return null;
  return (<>
    <Section title="🌐 私募市场宏观">
      <KV label="全球PE市场规模" value={d.globalPEAum} />
      <KV label="Dry Powder" value={d.dryPowder} />
      <KV label="估值倍数" value={d.valuationMultiple} />
      <KV label="募资环境" value={d.fundraisingEnv} />
      <KV label="退出环境" value={d.exitEnv} />
      <KV label="利率影响" value={d.rateImpact} />
      <KV label="LP情绪" value={d.lpSentiment} />
      <KV label="整体展望" value={d.overallOutlook} />
      <KV label="分析师笔记" value={d.analystNotes} />
    </Section>
    {d.firms && d.firms.length > 0 && d.firms.map((firm, idx) => (
      <Section key={idx} title={`🏦 ${firm.firmName || `机构 #${idx + 1}`}`} defaultOpen={false}>
        <KV label="类型" value={firm.firmType} />
        <KV label="总部" value={firm.headquarters} />
        <KV label="AUM" value={firm.aum} />
        <KV label="核心策略" value={firm.strategy} />
        <KV label="重点行业" value={firm.focusSectors} />
        <KV label="历史 IRR" value={firm.irr} />
        <KV label="MOIC" value={firm.moic} />
        <KV label="TVPI" value={firm.tvpi} />
        <KV label="当前基金规模" value={firm.currentFundSize} />
        <KV label="已部署比例" value={firm.deployed} />
        <KV label="代表性被投企业" value={firm.portfolioHighlights} />
        <KV label="培育的独角兽" value={firm.unicorns} />
        <KV label="退出案例" value={firm.exitHistory} />
        {firm.investmentSignal && <div className="mt-1"><SignalBadge signal={firm.investmentSignal} /></div>}
        <KV label="分析笔记" value={firm.analystNotes} />
      </Section>
    ))}
  </>);
}

// ── 主组件 ────────────────────────────────────────────

export default function AssetCard({ data, onEdit, onDelete }: AssetCardProps) {
  const displayTitle = data.title || SUBTYPE_LABEL[data.assetSubType] || data.assetSubType;

  const signal = (
    data.crypto?.investmentSignal ||
    data.index?.investmentSignal ||
    data.bond?.investmentSignal ||
    data.commodity?.investmentSignal ||
    data.fx?.investmentSignal ||
    data.realestate?.investmentSignal ||
    data.stock?.investmentSignal ||
    data.pe?.investmentSignal ||
    data.fund?.investmentSignal
  );

  return (
    <div className="space-y-4">
      {/* 头部 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-slate-900">{displayTitle}</h3>
            <SignalBadge signal={signal} />
          </div>
          <div className="flex gap-2 mt-1.5 flex-wrap">
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {SUBTYPE_LABEL[data.assetSubType]}
            </span>
            {data.snapshotDate && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                数据截止 {data.snapshotDate}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(data)}
            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
            <Pencil size={15} />
          </button>
          <button onClick={onDelete}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* 按类型渲染 */}
      {data.assetSubType === 'crypto'     && <CryptoCard data={data} />}
      {data.assetSubType === 'index'      && <IndexCard data={data} />}
      {data.assetSubType === 'bond'       && <BondCard data={data} />}
      {data.assetSubType === 'commodity'  && <CommodityCard data={data} />}
      {data.assetSubType === 'fx'         && <FxCard data={data} />}
      {data.assetSubType === 'realestate' && <RECard data={data} />}
      {data.assetSubType === 'stock'      && <StockCard data={data} />}
      {data.assetSubType === 'deposit'    && <DepositCard data={data} />}
      {data.assetSubType === 'pe'         && <PECard data={data} />}

      {data.assetSubType === 'fund' && data.fund && (
        <Section title="公募基金">
          <KV label="基金名称" value={data.fund.fundName} />
          <KV label="基金经理" value={data.fund.manager} />
          <KV label="策略" value={data.fund.strategy} />
          <KV label="AUM" value={data.fund.aum} />
          <KV label="YTD回报" value={data.fund.returnYTD} />
          <KV label="1年回报" value={data.fund.return1y} />
          <KV label="夏普比率" value={data.fund.sharpeRatio} />
          <KV label="最大回撤" value={data.fund.maxDrawdown} />
          <KV label="管理费" value={data.fund.managementFee} />
          <KV label="分析笔记" value={data.fund.analystNotes} />
        </Section>
      )}

      {data.assetSubType === 'futures' && data.futures && (
        <Section title="期货">
          <KV label="合约名称" value={data.futures.contractName} />
          <KV label="价格" value={data.futures.price} />
          <KV label="未平仓量 OI" value={data.futures.openInterest} />
          <KV label="展期成本" value={data.futures.rollCost} />
          <KV label="投机净持仓" value={data.futures.specPosition} />
          <KV label="分析笔记" value={data.futures.analystNotes} />
        </Section>
      )}

      {data.assetSubType === 'options' && data.options && (
        <Section title="期权">
          <KV label="标的" value={data.options.underlying} />
          <KV label="到期日" value={data.options.expiry} />
          <KV label="隐含波动率" value={data.options.impliedVolatility} />
          <KV label="IV Rank" value={data.options.ivRank} />
          <KV label="Put/Call" value={data.options.putCallRatio} />
          <KV label="Max Pain" value={data.options.maxPain} />
          <KV label="Skew" value={data.options.skew} />
          <KV label="分析笔记" value={data.options.analystNotes} />
        </Section>
      )}

      {data.assetSubType === 'insurance' && data.insurance && (
        <Section title="保险产品">
          <KV label="产品名称" value={data.insurance.productName} />
          <KV label="承保机构" value={data.insurance.insurer} />
          <KV label="类型" value={data.insurance.type} />
          <KV label="保费" value={data.insurance.premium} />
          <KV label="保额" value={data.insurance.coverage} />
          <KV label="保证收益" value={data.insurance.guaranteedReturn} />
          <KV label="IRR" value={data.insurance.irr} />
          <KV label="偿付能力" value={data.insurance.solvencyRatio} />
          <KV label="分析笔记" value={data.insurance.analystNotes} />
        </Section>
      )}
    </div>
  );
}

// 展示逻辑层，types/asset.ts是数据模型层