"use client";

import React, { useState } from 'react';
import { CryptoData, SignalStrength } from '../../types/asset';

interface CryptoFormProps {
  data: CryptoData;
  onChange: (d: CryptoData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const TABS = [
  { id: 'market',    label: '整体市场' },
  { id: 'layer1',   label: 'Layer 1' },
  { id: 'layer2',   label: 'Layer 2' },
  { id: 'defi',     label: 'DeFi' },
  { id: 'stable',   label: 'Stablecoin' },
  { id: 'rwa',      label: 'RWA' },
  { id: 'exchange', label: 'Exchange' },
  { id: 'wallet',   label: 'Wallet' },
  { id: 'token',    label: 'Token' },
  { id: 'nft',      label: 'NFT' },
  { id: 'onchain',  label: 'On-chain' },
];

const F = ({ label, value, onChange, placeholder, hint, multi = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string; multi?: boolean;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      {hint && <span className="text-[10px] text-slate-300 font-mono">{hint}</span>}
    </div>
    {multi ? (
      <textarea value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`} rows={2}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300" />
    )}
  </div>
);

const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const SL = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">{text}</p>
);

const SignalSelect = ({ value, onChange }: { value?: SignalStrength; onChange: (v: SignalStrength) => void }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">综合投资信号</label>
    <div className="flex gap-2 flex-wrap">
      {SIGNAL_OPTIONS.map(o => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${value === o.value ? o.color : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}>
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

export default function CryptoForm({ data, onChange }: CryptoFormProps) {
  const [tab, setTab] = useState('market');
  const u = <K extends keyof CryptoData>(key: K, val: CryptoData[K]) => onChange({ ...data, [key]: val });

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 flex-wrap px-1 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${tab === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-4">

        {tab === 'market' && (<>
          <SL text="加密市场整体" />
          <G2>
            <F label="总市值" value={data.totalMarketCap ?? ''} onChange={v => u('totalMarketCap', v)} placeholder="e.g. $2.5T" />
            <F label="BTC 主导率" value={data.btcDominance ?? ''} onChange={v => u('btcDominance', v)} placeholder="e.g. 52%" />
            <F label="ETH 主导率" value={data.ethDominance ?? ''} onChange={v => u('ethDominance', v)} />
            <F label="全链 TVL" value={data.totalTvl ?? ''} onChange={v => u('totalTvl', v)} placeholder="e.g. $85B" />
            <F label="恐惧贪婪指数" value={data.fearGreedIndex ?? ''} onChange={v => u('fearGreedIndex', v)} placeholder="0-100" />
            <F label="稳定币总供应" value={data.stablecoinSupply ?? ''} onChange={v => u('stablecoinSupply', v)} />
            <F label="ETF AUM" value={data.etfAum ?? ''} onChange={v => u('etfAum', v)} hint="BTC+ETH" />
            <F label="机构采用程度" value={data.institutionAdoption ?? ''} onChange={v => u('institutionAdoption', v)} />
          </G2>
          <SignalSelect value={data.investmentSignal} onChange={v => u('investmentSignal', v)} />
          <F label="整体展望" value={data.overallOutlook ?? ''} onChange={v => u('overallOutlook', v)} multi />
          <F label="分析师笔记" value={data.analystNotes ?? ''} onChange={v => u('analystNotes', v)} multi />
        </>)}

        {tab === 'layer1' && (<>
          <SL text="Layer 1 公链" />
          <F label="公链名称" value={data.layer1?.name ?? ''} onChange={v => u('layer1', { ...data.layer1, name: v })} placeholder="e.g. Ethereum, Solana, BNB..." />
          <G2>
            <F label="TVL" value={data.layer1?.tvl ?? ''} onChange={v => u('layer1', { ...data.layer1, tvl: v })} />
            <F label="Market Cap" value={data.layer1?.marketCap ?? ''} onChange={v => u('layer1', { ...data.layer1, marketCap: v })} />
            <F label="FDV" value={data.layer1?.fdv ?? ''} onChange={v => u('layer1', { ...data.layer1, fdv: v })} hint="完全稀释估值" />
            <F label="TPS" value={data.layer1?.tps ?? ''} onChange={v => u('layer1', { ...data.layer1, tps: v })} hint="每秒交易数" />
            <F label="Gas Fee" value={data.layer1?.gasFee ?? ''} onChange={v => u('layer1', { ...data.layer1, gasFee: v })} />
            <F label="Validators" value={data.layer1?.validators ?? ''} onChange={v => u('layer1', { ...data.layer1, validators: v })} hint="验证节点数" />
            <F label="Staking Ratio" value={data.layer1?.stakingRatio ?? ''} onChange={v => u('layer1', { ...data.layer1, stakingRatio: v })} hint="质押比例" />
            <F label="Active Address" value={data.layer1?.activeAddress ?? ''} onChange={v => u('layer1', { ...data.layer1, activeAddress: v })} hint="日活地址" />
            <F label="Transaction" value={data.layer1?.transaction ?? ''} onChange={v => u('layer1', { ...data.layer1, transaction: v })} hint="日交易数" />
            <F label="Developer Activity" value={data.layer1?.developer ?? ''} onChange={v => u('layer1', { ...data.layer1, developer: v })} hint="Github commits" />
            <F label="Protocol Revenue" value={data.layer1?.revenue ?? ''} onChange={v => u('layer1', { ...data.layer1, revenue: v })} />
          </G2>
          <F label="备注" value={data.layer1?.notes ?? ''} onChange={v => u('layer1', { ...data.layer1, notes: v })} multi />
        </>)}

        {tab === 'layer2' && (<>
          <SL text="Layer 2" />
          <F label="L2 名称" value={data.layer2?.name ?? ''} onChange={v => u('layer2', { ...data.layer2, name: v })} placeholder="e.g. Arbitrum, OP, Base..." />
          <G2>
            <F label="TVL" value={data.layer2?.tvl ?? ''} onChange={v => u('layer2', { ...data.layer2, tvl: v })} />
            <F label="Market Cap" value={data.layer2?.marketCap ?? ''} onChange={v => u('layer2', { ...data.layer2, marketCap: v })} />
            <F label="FDV" value={data.layer2?.fdv ?? ''} onChange={v => u('layer2', { ...data.layer2, fdv: v })} />
            <F label="TPS" value={data.layer2?.tps ?? ''} onChange={v => u('layer2', { ...data.layer2, tps: v })} />
            <F label="Gas Fee" value={data.layer2?.gasFee ?? ''} onChange={v => u('layer2', { ...data.layer2, gasFee: v })} />
            <F label="Active Address" value={data.layer2?.activeAddress ?? ''} onChange={v => u('layer2', { ...data.layer2, activeAddress: v })} />
            <F label="Transaction" value={data.layer2?.transaction ?? ''} onChange={v => u('layer2', { ...data.layer2, transaction: v })} />
            <F label="Sequencer Revenue" value={data.layer2?.sequencerRevenue ?? ''} onChange={v => u('layer2', { ...data.layer2, sequencerRevenue: v })} />
            <F label="Bridge Volume" value={data.layer2?.bridgeVolume ?? ''} onChange={v => u('layer2', { ...data.layer2, bridgeVolume: v })} />
            <F label="L1 Settlement Cost" value={data.layer2?.l1Settlement ?? ''} onChange={v => u('layer2', { ...data.layer2, l1Settlement: v })} />
          </G2>
          <F label="备注" value={data.layer2?.notes ?? ''} onChange={v => u('layer2', { ...data.layer2, notes: v })} multi />
        </>)}

        {tab === 'defi' && (<>
          <SL text="DeFi 协议" />
          <F label="协议名称" value={data.defi?.protocol ?? ''} onChange={v => u('defi', { ...data.defi, protocol: v })} placeholder="e.g. Uniswap, Aave, Compound..." />
          <G2>
            <F label="TVL" value={data.defi?.tvl ?? ''} onChange={v => u('defi', { ...data.defi, tvl: v })} />
            <F label="Revenue（协议收入）" value={data.defi?.revenue ?? ''} onChange={v => u('defi', { ...data.defi, revenue: v })} />
            <F label="Fee（手续费）" value={data.defi?.fee ?? ''} onChange={v => u('defi', { ...data.defi, fee: v })} />
            <F label="User（用户数）" value={data.defi?.user ?? ''} onChange={v => u('defi', { ...data.defi, user: v })} />
            <F label="Borrow（借贷规模）" value={data.defi?.borrow ?? ''} onChange={v => u('defi', { ...data.defi, borrow: v })} />
            <F label="Lending（放贷规模）" value={data.defi?.lending ?? ''} onChange={v => u('defi', { ...data.defi, lending: v })} />
            <F label="Staking（质押量）" value={data.defi?.staking ?? ''} onChange={v => u('defi', { ...data.defi, staking: v })} />
            <F label="Yield（收益率）" value={data.defi?.yield ?? ''} onChange={v => u('defi', { ...data.defi, yield: v })} />
            <F label="Market Share" value={data.defi?.marketShare ?? ''} onChange={v => u('defi', { ...data.defi, marketShare: v })} />
          </G2>
          <F label="备注" value={data.defi?.notes ?? ''} onChange={v => u('defi', { ...data.defi, notes: v })} multi />
        </>)}

        {tab === 'stable' && (<>
          <SL text="稳定币" />
          <F label="稳定币名称" value={data.stablecoin?.name ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, name: v })} placeholder="e.g. USDT, USDC, DAI..." />
          <G2>
            <F label="Supply（供应量）" value={data.stablecoin?.supply ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, supply: v })} />
            <F label="Market Cap" value={data.stablecoin?.marketCap ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, marketCap: v })} />
            <F label="Mint（铸造量）" value={data.stablecoin?.mint ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, mint: v })} hint="7D/30D" />
            <F label="Burn（销毁量）" value={data.stablecoin?.burn ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, burn: v })} />
            <F label="Dominance（市场份额）" value={data.stablecoin?.dominance ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, dominance: v })} />
            <F label="Exchange Reserve" value={data.stablecoin?.exchangeReserve ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, exchangeReserve: v })} hint="交易所储备" />
            <F label="Holder（持有者数）" value={data.stablecoin?.holder ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, holder: v })} />
          </G2>
          <F label="Chain Distribution（链上分布）" value={data.stablecoin?.chainDistribution ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, chainDistribution: v })} multi />
          <F label="Reserve Asset（储备资产）" value={data.stablecoin?.reserveAsset ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, reserveAsset: v })} multi placeholder="美国国债、现金、BTC..." />
          <F label="备注" value={data.stablecoin?.notes ?? ''} onChange={v => u('stablecoin', { ...data.stablecoin, notes: v })} multi />
        </>)}

        {tab === 'rwa' && (<>
          <SL text="RWA 真实世界资产" />
          <G2>
            <F label="RWA TVL" value={data.rwa?.rwatvl ?? ''} onChange={v => u('rwa', { ...data.rwa, rwatvl: v })} placeholder="e.g. $8B" />
            <F label="Treasury（国债代币化）" value={data.rwa?.treasury ?? ''} onChange={v => u('rwa', { ...data.rwa, treasury: v })} />
            <F label="Private Credit（私人信贷）" value={data.rwa?.privateCredit ?? ''} onChange={v => u('rwa', { ...data.rwa, privateCredit: v })} />
            <F label="Tokenized Bond" value={data.rwa?.tokenizedBond ?? ''} onChange={v => u('rwa', { ...data.rwa, tokenizedBond: v })} />
            <F label="Tokenized Equity" value={data.rwa?.tokenizedEquity ?? ''} onChange={v => u('rwa', { ...data.rwa, tokenizedEquity: v })} />
            <F label="Yield（平均收益率）" value={data.rwa?.yield ?? ''} onChange={v => u('rwa', { ...data.rwa, yield: v })} />
            <F label="AUM（管理规模）" value={data.rwa?.aum ?? ''} onChange={v => u('rwa', { ...data.rwa, aum: v })} />
          </G2>
          <F label="Institution Adoption（机构采用）" value={data.rwa?.institutionAdoption ?? ''} onChange={v => u('rwa', { ...data.rwa, institutionAdoption: v })} multi placeholder="BlackRock、Franklin Templeton..." />
          <F label="备注" value={data.rwa?.notes ?? ''} onChange={v => u('rwa', { ...data.rwa, notes: v })} multi />
        </>)}

        {tab === 'exchange' && (<>
          <SL text="中心化交易所 CEX" />
          <F label="交易所名称" value={data.exchange?.name ?? ''} onChange={v => u('exchange', { ...data.exchange, name: v })} placeholder="e.g. Binance, OKX, Coinbase..." />
          <G2>
            <F label="Spot Volume（现货量）" value={data.exchange?.spotVolume ?? ''} onChange={v => u('exchange', { ...data.exchange, spotVolume: v })} hint="24H" />
            <F label="Futures Volume（合约量）" value={data.exchange?.futuresVolume ?? ''} onChange={v => u('exchange', { ...data.exchange, futuresVolume: v })} hint="24H" />
            <F label="Reserve（储备）" value={data.exchange?.reserve ?? ''} onChange={v => u('exchange', { ...data.exchange, reserve: v })} />
            <F label="Proof of Reserve" value={data.exchange?.proofOfReserve ?? ''} onChange={v => u('exchange', { ...data.exchange, proofOfReserve: v })} hint="储备证明状态" />
            <F label="BTC Reserve" value={data.exchange?.btcReserve ?? ''} onChange={v => u('exchange', { ...data.exchange, btcReserve: v })} />
            <F label="ETH Reserve" value={data.exchange?.ethReserve ?? ''} onChange={v => u('exchange', { ...data.exchange, ethReserve: v })} />
            <F label="Users（用户数）" value={data.exchange?.users ?? ''} onChange={v => u('exchange', { ...data.exchange, users: v })} />
            <F label="Market Share（市场份额）" value={data.exchange?.marketShare ?? ''} onChange={v => u('exchange', { ...data.exchange, marketShare: v })} />
            <F label="Listing Activity（上币活跃度）" value={data.exchange?.listingActivity ?? ''} onChange={v => u('exchange', { ...data.exchange, listingActivity: v })} />
            <F label="Stablecoin Balance" value={data.exchange?.stablecoinBalance ?? ''} onChange={v => u('exchange', { ...data.exchange, stablecoinBalance: v })} />
          </G2>
          <F label="备注" value={data.exchange?.notes ?? ''} onChange={v => u('exchange', { ...data.exchange, notes: v })} multi />
        </>)}

        {tab === 'wallet' && (<>
          <SL text="加密钱包" />
          <F label="钱包名称" value={data.wallet?.name ?? ''} onChange={v => u('wallet', { ...data.wallet, name: v })} placeholder="e.g. MetaMask, Phantom, Trust Wallet..." />
          <G2>
            <F label="MAU（月活用户）" value={data.wallet?.mau ?? ''} onChange={v => u('wallet', { ...data.wallet, mau: v })} />
            <F label="Download（下载量）" value={data.wallet?.download ?? ''} onChange={v => u('wallet', { ...data.wallet, download: v })} />
            <F label="Active Wallet（活跃钱包）" value={data.wallet?.activeWallet ?? ''} onChange={v => u('wallet', { ...data.wallet, activeWallet: v })} />
            <F label="Connected DApps" value={data.wallet?.connectedDapps ?? ''} onChange={v => u('wallet', { ...data.wallet, connectedDapps: v })} />
            <F label="Security（安全评级）" value={data.wallet?.security ?? ''} onChange={v => u('wallet', { ...data.wallet, security: v })} />
            <F label="Institution Adoption" value={data.wallet?.institutionAdoption ?? ''} onChange={v => u('wallet', { ...data.wallet, institutionAdoption: v })} />
          </G2>
          <F label="备注" value={data.wallet?.notes ?? ''} onChange={v => u('wallet', { ...data.wallet, notes: v })} multi />
        </>)}

        {tab === 'token' && (<>
          <SL text="Token 分析" />
          <F label="Token 名称 / Ticker" value={data.token?.price ? '' : ''} onChange={() => {}} placeholder="填写下方各指标..." hint="通用框架" />
          <SL text="行情" />
          <G2>
            <F label="Price" value={data.token?.price ?? ''} onChange={v => u('token', { ...data.token, price: v })} />
            <F label="Market Cap" value={data.token?.marketCap ?? ''} onChange={v => u('token', { ...data.token, marketCap: v })} />
            <F label="FDV" value={data.token?.fdv ?? ''} onChange={v => u('token', { ...data.token, fdv: v })} />
            <F label="Volume（24H）" value={data.token?.volume ?? ''} onChange={v => u('token', { ...data.token, volume: v })} />
          </G2>
          <SL text="持仓分布" />
          <G2>
            <F label="Holder（持有者数）" value={data.token?.holder ?? ''} onChange={v => u('token', { ...data.token, holder: v })} />
            <F label="Whale（鲸鱼动态）" value={data.token?.whale ?? ''} onChange={v => u('token', { ...data.token, whale: v })} />
            <F label="Exchange Flow（流入/出）" value={data.token?.exchangeFlow ?? ''} onChange={v => u('token', { ...data.token, exchangeFlow: v })} />
            <F label="Velocity（流通速度）" value={data.token?.velocity ?? ''} onChange={v => u('token', { ...data.token, velocity: v })} />
            <F label="Dormancy（休眠）" value={data.token?.dormancy ?? ''} onChange={v => u('token', { ...data.token, dormancy: v })} hint="长期持有信号" />
          </G2>
          <SL text="供应结构" />
          <G2>
            <F label="Total Supply" value={data.token?.supply ?? ''} onChange={v => u('token', { ...data.token, supply: v })} />
            <F label="Circulating Supply" value={data.token?.circulatingSupply ?? ''} onChange={v => u('token', { ...data.token, circulatingSupply: v })} />
            <F label="Unlock Schedule（解锁）" value={data.token?.unlock ?? ''} onChange={v => u('token', { ...data.token, unlock: v })} />
            <F label="Burn（销毁）" value={data.token?.burn ?? ''} onChange={v => u('token', { ...data.token, burn: v })} />
            <F label="Inflation Rate" value={data.token?.inflation ?? ''} onChange={v => u('token', { ...data.token, inflation: v })} />
            <F label="Emission Schedule" value={data.token?.emission ?? ''} onChange={v => u('token', { ...data.token, emission: v })} />
          </G2>
          <SL text="衍生品市场" />
          <G2>
            <F label="ETF（现货ETF状态）" value={data.token?.etf ?? ''} onChange={v => u('token', { ...data.token, etf: v })} />
            <F label="Funding Rate" value={data.token?.funding ?? ''} onChange={v => u('token', { ...data.token, funding: v })} hint="资金费率" />
            <F label="Open Interest（未平仓量）" value={data.token?.oi ?? ''} onChange={v => u('token', { ...data.token, oi: v })} />
            <F label="Liquidation（爆仓量）" value={data.token?.liquidation ?? ''} onChange={v => u('token', { ...data.token, liquidation: v })} />
          </G2>
          <F label="备注" value={data.token?.notes ?? ''} onChange={v => u('token', { ...data.token, notes: v })} multi />
        </>)}

        {tab === 'nft' && (<>
          <SL text="NFT（可选）" />
          <G2>
            <F label="Collection（系列名称）" value={data.nft?.collection ?? ''} onChange={v => u('nft', { ...data.nft, collection: v })} />
            <F label="Floor Price" value={data.nft?.floorPrice ?? ''} onChange={v => u('nft', { ...data.nft, floorPrice: v })} />
            <F label="Volume（24H）" value={data.nft?.volume ?? ''} onChange={v => u('nft', { ...data.nft, volume: v })} />
            <F label="Holders" value={data.nft?.holders ?? ''} onChange={v => u('nft', { ...data.nft, holders: v })} />
            <F label="Market Cap" value={data.nft?.marketCap ?? ''} onChange={v => u('nft', { ...data.nft, marketCap: v })} />
          </G2>
          <F label="备注" value={data.nft?.notes ?? ''} onChange={v => u('nft', { ...data.nft, notes: v })} multi />
        </>)}

        {tab === 'onchain' && (<>
          <SL text="On-chain 链上指标" />
          <G2>
            <F label="BTC Active Address" value={data.onChain?.btcActiveAddress ?? ''} onChange={v => u('onChain', { ...data.onChain, btcActiveAddress: v })} hint="日活地址数" />
            <F label="ETH Gas（Gwei）" value={data.onChain?.ethGas ?? ''} onChange={v => u('onChain', { ...data.onChain, ethGas: v })} />
            <F label="Exchange Reserve" value={data.onChain?.exchangeReserve ?? ''} onChange={v => u('onChain', { ...data.onChain, exchangeReserve: v })} hint="BTC交易所存量" />
            <F label="Stablecoin Supply" value={data.onChain?.stablecoinSupply ?? ''} onChange={v => u('onChain', { ...data.onChain, stablecoinSupply: v })} hint="购买力信号" />
            <F label="Whale Moves" value={data.onChain?.whaleMoves ?? ''} onChange={v => u('onChain', { ...data.onChain, whaleMoves: v })} hint="大额转账" />
            <F label="Miner Reserve" value={data.onChain?.minerReserve ?? ''} onChange={v => u('onChain', { ...data.onChain, minerReserve: v })} hint="矿工持仓" />
            <F label="ETF Flow（净流入）" value={data.onChain?.etfFlow ?? ''} onChange={v => u('onChain', { ...data.onChain, etfFlow: v })} hint="BTC现货ETF" />
            <F label="MVRV Ratio" value={data.onChain?.mvrv ?? ''} onChange={v => u('onChain', { ...data.onChain, mvrv: v })} hint=">3.7高估 <1低估" />
            <F label="NUPL" value={data.onChain?.nupl ?? ''} onChange={v => u('onChain', { ...data.onChain, nupl: v })} hint="净未实现盈亏" />
            <F label="Hash Rate" value={data.onChain?.hashRate ?? ''} onChange={v => u('onChain', { ...data.onChain, hashRate: v })} hint="网络算力" />
          </G2>
          <F label="备注" value={data.onChain?.notes ?? ''} onChange={v => u('onChain', { ...data.onChain, notes: v })} multi />
        </>)}

      </div>
    </div>
  );
}