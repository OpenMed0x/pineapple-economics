"use client";

import React, { useState } from 'react';
import { RegionData, RegionId, SignalStrength, USData, ChinaData, EuropeData, JapanData, KoreaData, TaiwanData, HongKongData, SEAsiaData, MiddleEastData, SouthAmericaData } from '../../types/region';

interface RegionFormProps {
  onSubmit: (data: RegionData) => void;
  onCancel: () => void;
  initialData?: Partial<RegionData>;
  regionId: RegionId;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const Field = ({ label, value, onChange, placeholder, multiline = false, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; hint?: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      {hint && <span className="text-[10px] text-slate-300 font-mono">{hint}</span>}
    </div>
    {multiline ? (
      <textarea value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`} rows={3}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300" />
    )}
  </div>
);

function SignalSelect({ value, onChange }: { value?: SignalStrength; onChange: (v: SignalStrength) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500">综合投资信号</label>
      <div className="flex gap-2 flex-wrap">
        {SIGNAL_OPTIONS.map(opt => (
          <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              value === opt.value ? opt.color : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
            }`}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const SL = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">{text}</p>
);

const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

// ── 各地区表单内容 ──────────────────────────────────────

function USForm({ data, onChange }: { data: USData; onChange: (d: USData) => void }) {
  const f = (key: keyof USData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="经济增长" />
    <G2>
      <Field label="GDP" value={data.gdp ?? ''} onChange={f('gdp')} placeholder="e.g. $27.4T" />
      <Field label="GDP Growth (YoY)" value={data.gdpGrowth ?? ''} onChange={f('gdpGrowth')} placeholder="e.g. 2.8%" />
      <Field label="GDPNow（亚特兰大Fed）" value={data.gdpNow ?? ''} onChange={f('gdpNow')} placeholder="e.g. 3.1% (实时)" />
      <Field label="ISM 制造业 PMI" value={data.ismManufacturing ?? ''} onChange={f('ismManufacturing')} placeholder="荣枯线50" />
      <Field label="ISM 服务业 PMI" value={data.ismServices ?? ''} onChange={f('ismServices')} />
      <Field label="零售销售 Retail Sales" value={data.retailSales ?? ''} onChange={f('retailSales')} placeholder="MoM%" />
      <Field label="消费者信心指数" value={data.consumerConfidence ?? ''} onChange={f('consumerConfidence')} />
      <Field label="领先指标 LEI" value={data.leadingIndex ?? ''} onChange={f('leadingIndex')} hint="Conference Board" />
    </G2>
    <SL text="就业市场" />
    <G2>
      <Field label="非农就业 NFP" value={data.nfp ?? ''} onChange={f('nfp')} placeholder="e.g. +200K" />
      <Field label="失业率" value={data.unemploymentRate ?? ''} onChange={f('unemploymentRate')} placeholder="e.g. 3.7%" />
      <Field label="广义失业率 U6" value={data.u6 ?? ''} onChange={f('u6')} placeholder="e.g. 7.2%" />
      <Field label="薪资增长 Wage Growth" value={data.wageGrowth ?? ''} onChange={f('wageGrowth')} placeholder="e.g. 4.1% YoY" />
      <Field label="职位空缺 JOLTS" value={data.jobOpenings ?? ''} onChange={f('jobOpenings')} />
      <Field label="初请失业金" value={data.initialJoblessClaims ?? ''} onChange={f('initialJoblessClaims')} placeholder="e.g. 220K" />
    </G2>
    <SL text="通胀" />
    <G2>
      <Field label="CPI YoY" value={data.cpi ?? ''} onChange={f('cpi')} placeholder="e.g. 3.2%" />
      <Field label="核心 CPI" value={data.coreCpi ?? ''} onChange={f('coreCpi')} />
      <Field label="PCE" value={data.pce ?? ''} onChange={f('pce')} hint="Fed首选指标" />
      <Field label="核心 PCE" value={data.corePce ?? ''} onChange={f('corePce')} />
      <Field label="盈亏平衡通胀率" value={data.breakEvenInflation ?? ''} onChange={f('breakEvenInflation')} hint="5Y5Y" />
      <Field label="PPI" value={data.ppi ?? ''} onChange={f('ppi')} hint="生产者价格" />
    </G2>
    <SL text="货币政策" />
    <G2>
      <Field label="联邦基金利率" value={data.fedFundsRate ?? ''} onChange={f('fedFundsRate')} placeholder="e.g. 5.25-5.50%" />
      <Field label="Dot Plot 预期" value={data.dotPlot ?? ''} onChange={f('dotPlot')} placeholder="年底预期利率" />
      <Field label="Fed 资产负债表" value={data.fedBalanceSheet ?? ''} onChange={f('fedBalanceSheet')} placeholder="e.g. $7.5T" />
      <Field label="2Y 国债收益率" value={data.treasury2y ?? ''} onChange={f('treasury2y')} />
      <Field label="10Y 国债收益率" value={data.treasury10y ?? ''} onChange={f('treasury10y')} />
      <Field label="30Y 国债收益率" value={data.treasury30y ?? ''} onChange={f('treasury30y')} />
      <Field label="收益率曲线 2Y-10Y" value={data.yieldCurve ?? ''} onChange={f('yieldCurve')} placeholder="倒挂/正常 e.g. -30bp" />
      <Field label="实际利率 TIPS" value={data.realYield ?? ''} onChange={f('realYield')} placeholder="e.g. 2.1%" />
    </G2>
    <SL text="资本市场" />
    <G2>
      <Field label="S&P 500" value={data.sp500 ?? ''} onChange={f('sp500')} placeholder="点位 + YTD%" />
      <Field label="Nasdaq 100" value={data.nasdaq100 ?? ''} onChange={f('nasdaq100')} />
      <Field label="道琼斯" value={data.dowJones ?? ''} onChange={f('dowJones')} />
      <Field label="Russell 2000" value={data.russell2000 ?? ''} onChange={f('russell2000')} hint="小盘股" />
      <Field label="VIX 恐慌指数" value={data.vix ?? ''} onChange={f('vix')} placeholder="e.g. 15.2" />
      <Field label="DXY 美元指数" value={data.dxy ?? ''} onChange={f('dxy')} placeholder="e.g. 104.5" />
      <Field label="黄金" value={data.goldPrice ?? ''} onChange={f('goldPrice')} placeholder="e.g. $2,050/oz" />
      <Field label="WTI 原油" value={data.crudeoil ?? ''} onChange={f('crudeoil')} placeholder="e.g. $78/bbl" />
    </G2>
    <SL text="房地产" />
    <G2>
      <Field label="房价指数 HPI" value={data.housePriceIndex ?? ''} onChange={f('housePriceIndex')} />
      <Field label="30Y 抵押贷款利率" value={data.mortgageRate ?? ''} onChange={f('mortgageRate')} placeholder="e.g. 7.2%" />
      <Field label="新屋开工" value={data.housingStarts ?? ''} onChange={f('housingStarts')} />
      <Field label="成屋销售" value={data.existingHomeSales ?? ''} onChange={f('existingHomeSales')} />
    </G2>
    <SL text="财政" />
    <G2>
      <Field label="联邦债务/GDP" value={data.federalDebtGdp ?? ''} onChange={f('federalDebtGdp')} placeholder="e.g. 122%" />
      <Field label="预算赤字" value={data.budgetDeficit ?? ''} onChange={f('budgetDeficit')} placeholder="e.g. -$1.7T" />
    </G2>
    <SL text="企业基本面" />
    <G2>
      <Field label="S&P500 EPS 增速" value={data.sp500Earnings ?? ''} onChange={f('sp500Earnings')} />
      <Field label="S&P500 P/E" value={data.sp500Pe ?? ''} onChange={f('sp500Pe')} />
      <Field label="信用利差" value={data.creditSpread ?? ''} onChange={f('creditSpread')} hint="IG/HY" />
      <Field label="IPO 市场活跃度" value={data.ipoActivity ?? ''} onChange={f('ipoActivity')} />
    </G2>
    <SL text="综合研判" />
    <Field label="衰退概率" value={data.recessionProbability ?? ''} onChange={f('recessionProbability')} placeholder="e.g. 30% (12个月)" />
    <Field label="美元周期位置" value={data.dollarCyclePhase ?? ''} onChange={f('dollarCyclePhase')} placeholder="强美元末期/弱化初期..." />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function ChinaForm({ data, onChange }: { data: ChinaData; onChange: (d: ChinaData) => void }) {
  const f = (key: keyof ChinaData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="经济增长" />
    <G2>
      <Field label="GDP" value={data.gdp ?? ''} onChange={f('gdp')} placeholder="e.g. ¥126T" />
      <Field label="GDP 增速" value={data.gdpGrowth ?? ''} onChange={f('gdpGrowth')} placeholder="e.g. 5.0%" />
      <Field label="政府增长目标" value={data.gdpTarget ?? ''} onChange={f('gdpTarget')} placeholder="e.g. 约5%" />
      <Field label="官方制造业 PMI" value={data.manufacturingPmi ?? ''} onChange={f('manufacturingPmi')} />
      <Field label="官方服务业 PMI" value={data.servicesPmi ?? ''} onChange={f('servicesPmi')} />
      <Field label="财新制造业 PMI" value={data.caixinManufacturing ?? ''} onChange={f('caixinManufacturing')} hint="民营企业" />
      <Field label="工业增加值" value={data.industrialOutput ?? ''} onChange={f('industrialOutput')} placeholder="YoY%" />
      <Field label="社会消费品零售总额" value={data.retailSales ?? ''} onChange={f('retailSales')} placeholder="YoY%" />
      <Field label="固定资产投资" value={data.fixedAssetInvestment ?? ''} onChange={f('fixedAssetInvestment')} placeholder="YTD YoY%" />
      <Field label="出口" value={data.exports ?? ''} onChange={f('exports')} placeholder="YoY% / USD" />
      <Field label="进口" value={data.imports ?? ''} onChange={f('imports')} />
      <Field label="贸易顺差" value={data.tradeBalance ?? ''} onChange={f('tradeBalance')} />
    </G2>
    <SL text="通胀" />
    <G2>
      <Field label="CPI YoY" value={data.cpi ?? ''} onChange={f('cpi')} />
      <Field label="PPI YoY" value={data.ppi ?? ''} onChange={f('ppi')} hint="生产者价格" />
      <Field label="通缩风险评估" value={data.deflationRisk ?? ''} onChange={f('deflationRisk')} multiline />
    </G2>
    <SL text="货币政策" />
    <G2>
      <Field label="LPR 1年期" value={data.lpr1y ?? ''} onChange={f('lpr1y')} placeholder="e.g. 3.45%" />
      <Field label="LPR 5年期" value={data.lpr5y ?? ''} onChange={f('lpr5y')} placeholder="e.g. 3.95%" />
      <Field label="M2 增速" value={data.m2Growth ?? ''} onChange={f('m2Growth')} placeholder="e.g. 8.5% YoY" />
      <Field label="社融 TSF" value={data.tsf ?? ''} onChange={f('tsf')} placeholder="月度新增" />
      <Field label="新增人民币贷款" value={data.newLoans ?? ''} onChange={f('newLoans')} />
      <Field label="存款准备金率 RRR" value={data.rrr ?? ''} onChange={f('rrr')} />
      <Field label="MLF 利率" value={data.mlf ?? ''} onChange={f('mlf')} />
      <Field label="人民币汇率 CNY/USD" value={data.cnyUsd ?? ''} onChange={f('cnyUsd')} placeholder="e.g. 7.24" />
    </G2>
    <SL text="财政" />
    <G2>
      <Field label="财政赤字/GDP" value={data.fiscalDeficitGdp ?? ''} onChange={f('fiscalDeficitGdp')} />
      <Field label="地方政府债务" value={data.localGovtDebt ?? ''} onChange={f('localGovtDebt')} />
      <Field label="专项债规模" value={data.specialBonds ?? ''} onChange={f('specialBonds')} />
    </G2>
    <SL text="房地产" />
    <G2>
      <Field label="70城房价指数" value={data.housePriceIndex ?? ''} onChange={f('housePriceIndex')} />
      <Field label="商品房销售面积" value={data.residentialSales ?? ''} onChange={f('residentialSales')} placeholder="YoY%" />
      <Field label="房地产开发投资" value={data.realEstateInvestment ?? ''} onChange={f('realEstateInvestment')} />
      <Field label="房企债务风险" value={data.developerDebt ?? ''} onChange={f('developerDebt')} multiline />
      <Field label="土地出让收入" value={data.landSales ?? ''} onChange={f('landSales')} />
    </G2>
    <SL text="股票市场" />
    <G2>
      <Field label="上证综指" value={data.shanghaiComposite ?? ''} onChange={f('shanghaiComposite')} />
      <Field label="沪深 300" value={data.csi300 ?? ''} onChange={f('csi300')} />
      <Field label="创业板指" value={data.chinextIndex ?? ''} onChange={f('chinextIndex')} />
      <Field label="北向资金" value={data.northboundFlow ?? ''} onChange={f('northboundFlow')} placeholder="月度净流入/流出" />
      <Field label="南向资金" value={data.southboundFlow ?? ''} onChange={f('southboundFlow')} />
      <Field label="A股市盈率" value={data.aSharePe ?? ''} onChange={f('aSharePe')} />
      <Field label="AH 溢价" value={data.hShareDiscount ?? ''} onChange={f('hShareDiscount')} />
    </G2>
    <SL text="科技与产业" />
    <Field label="AI 投资动态" value={data.aiInvestment ?? ''} onChange={f('aiInvestment')} multiline />
    <G2>
      <Field label="半导体产量" value={data.semiconductorOutput ?? ''} onChange={f('semiconductorOutput')} />
      <Field label="新能源汽车销量" value={data.evSales ?? ''} onChange={f('evSales')} />
    </G2>
    <Field label="科技监管动态" value={data.techRegulation ?? ''} onChange={f('techRegulation')} multiline />
    <SL text="地缘政治" />
    <Field label="中美关系" value={data.usChinaRelations ?? ''} onChange={f('usChinaRelations')} multiline />
    <G2>
      <Field label="台海风险" value={data.taiwanRisk ?? ''} onChange={f('taiwanRisk')} />
      <Field label="制裁风险" value={data.sanctionsRisk ?? ''} onChange={f('sanctionsRisk')} />
    </G2>
    <SL text="综合研判" />
    <Field label="政策总基调" value={data.policyStance ?? ''} onChange={f('policyStance')} placeholder="积极财政+宽松货币..." />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function EuropeForm({ data, onChange }: { data: EuropeData; onChange: (d: EuropeData) => void }) {
  const f = (key: keyof EuropeData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="经济增长" />
    <G2>
      <Field label="GDP" value={data.gdp ?? ''} onChange={f('gdp')} />
      <Field label="GDP Growth" value={data.gdpGrowth ?? ''} onChange={f('gdpGrowth')} />
      <Field label="制造业 PMI" value={data.manufacturingPmi ?? ''} onChange={f('manufacturingPmi')} />
      <Field label="服务业 PMI" value={data.servicesPmi ?? ''} onChange={f('servicesPmi')} />
      <Field label="工业产出" value={data.industrialProduction ?? ''} onChange={f('industrialProduction')} />
      <Field label="零售销售" value={data.retailSales ?? ''} onChange={f('retailSales')} />
      <Field label="ZEW 景气指数" value={data.germanZew ?? ''} onChange={f('germanZew')} hint="德国" />
      <Field label="Sentix 投资信心" value={data.sentix ?? ''} onChange={f('sentix')} />
    </G2>
    <SL text="通胀" />
    <G2>
      <Field label="HICP YoY" value={data.hicp ?? ''} onChange={f('hicp')} hint="欧元区通胀" />
      <Field label="核心 HICP" value={data.coreHicp ?? ''} onChange={f('coreHicp')} />
      <Field label="德国 CPI" value={data.germanCpi ?? ''} onChange={f('germanCpi')} />
      <Field label="PPI" value={data.ppi ?? ''} onChange={f('ppi')} />
    </G2>
    <SL text="货币政策" />
    <G2>
      <Field label="ECB 主要再融资利率" value={data.ecbRate ?? ''} onChange={f('ecbRate')} />
      <Field label="ECB 存款便利利率" value={data.depositFacilityRate ?? ''} onChange={f('depositFacilityRate')} />
      <Field label="ECB 资产负债表" value={data.ecbBalanceSheet ?? ''} onChange={f('ecbBalanceSheet')} />
      <Field label="德国 10Y 国债" value={data.germany10y ?? ''} onChange={f('germany10y')} hint="Bund" />
      <Field label="意大利 10Y 国债" value={data.italy10y ?? ''} onChange={f('italy10y')} hint="BTP" />
      <Field label="外围国家利差" value={data.peripheralSpread ?? ''} onChange={f('peripheralSpread')} hint="意大利-德国" placeholder="危机信号" />
      <Field label="EUR/USD" value={data.eurusd ?? ''} onChange={f('eurusd')} />
    </G2>
    <SL text="能源" />
    <G2>
      <Field label="TTF 天然气" value={data.ttfGas ?? ''} onChange={f('ttfGas')} placeholder="€/MWh" />
      <Field label="电价" value={data.electricityPrice ?? ''} onChange={f('electricityPrice')} />
      <Field label="能源进口依赖度" value={data.energyImportDependence ?? ''} onChange={f('energyImportDependence')} />
      <Field label="可再生能源占比" value={data.renewableShare ?? ''} onChange={f('renewableShare')} />
    </G2>
    <SL text="财政" />
    <G2>
      <Field label="债务/GDP" value={data.debtGdp ?? ''} onChange={f('debtGdp')} />
      <Field label="财政赤字" value={data.budgetDeficit ?? ''} onChange={f('budgetDeficit')} />
    </G2>
    <SL text="股票市场" />
    <G2>
      <Field label="STOXX 600" value={data.stoxx600 ?? ''} onChange={f('stoxx600')} />
      <Field label="DAX（德国）" value={data.dax ?? ''} onChange={f('dax')} />
      <Field label="CAC 40（法国）" value={data.cac40 ?? ''} onChange={f('cac40')} />
      <Field label="FTSE 100（英国）" value={data.ftse100 ?? ''} onChange={f('ftse100')} />
    </G2>
    <SL text="地缘政治" />
    <Field label="乌克兰战争影响" value={data.ukraineWar ?? ''} onChange={f('ukraineWar')} multiline />
    <Field label="能源安全" value={data.energySecurity ?? ''} onChange={f('energySecurity')} multiline />
    <Field label="美欧贸易关系" value={data.usEuTrade ?? ''} onChange={f('usEuTrade')} multiline />
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function JapanForm({ data, onChange }: { data: JapanData; onChange: (d: JapanData) => void }) {
  const f = (key: keyof JapanData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="经济增长" />
    <G2>
      <Field label="GDP" value={data.gdp ?? ''} onChange={f('gdp')} />
      <Field label="GDP Growth" value={data.gdpGrowth ?? ''} onChange={f('gdpGrowth')} />
      <Field label="制造业 PMI" value={data.manufacturingPmi ?? ''} onChange={f('manufacturingPmi')} />
      <Field label="服务业 PMI" value={data.servicesPmi ?? ''} onChange={f('servicesPmi')} />
      <Field label="日银短观 Tankan" value={data.tankan ?? ''} onChange={f('tankan')} hint="大型制造业" />
      <Field label="工业生产" value={data.industrialProduction ?? ''} onChange={f('industrialProduction')} />
      <Field label="出口" value={data.exports ?? ''} onChange={f('exports')} />
      <Field label="贸易差额" value={data.tradeBalance ?? ''} onChange={f('tradeBalance')} />
    </G2>
    <SL text="通胀" />
    <G2>
      <Field label="CPI YoY" value={data.cpi ?? ''} onChange={f('cpi')} />
      <Field label="核心 CPI" value={data.coreCpi ?? ''} onChange={f('coreCpi')} hint="除生鲜食品" />
      <Field label="东京 CPI" value={data.tokyoCpi ?? ''} onChange={f('tokyoCpi')} hint="领先指标" />
      <Field label="PPI" value={data.ppi ?? ''} onChange={f('ppi')} />
    </G2>
    <SL text="货币政策" />
    <G2>
      <Field label="BOJ 政策利率" value={data.bojPolicyRate ?? ''} onChange={f('bojPolicyRate')} />
      <Field label="YCC 目标" value={data.yccTarget ?? ''} onChange={f('yccTarget')} placeholder="已退出/上限调整" />
      <Field label="10Y JGB 收益率" value={data.jgb10y ?? ''} onChange={f('jgb10y')} />
      <Field label="BOJ 资产负债表" value={data.bojBalanceSheet ?? ''} onChange={f('bojBalanceSheet')} />
      <Field label="实际利率" value={data.realRate ?? ''} onChange={f('realRate')} />
    </G2>
    <SL text="汇率" />
    <G2>
      <Field label="USD/JPY" value={data.usdjpy ?? ''} onChange={f('usdjpy')} placeholder="e.g. 150.2" />
      <Field label="干预风险" value={data.interventionRisk ?? ''} onChange={f('interventionRisk')} placeholder="高/中/低" />
      <Field label="经常账户余额" value={data.currencyAccountBalance ?? ''} onChange={f('currencyAccountBalance')} />
    </G2>
    <SL text="股票" />
    <G2>
      <Field label="Nikkei 225" value={data.nikkei225 ?? ''} onChange={f('nikkei225')} />
      <Field label="TOPIX" value={data.topix ?? ''} onChange={f('topix')} />
      <Field label="外资买入日股" value={data.foreignBuying ?? ''} onChange={f('foreignBuying')} />
    </G2>
    <SL text="工资与消费" />
    <G2>
      <Field label="薪资增长" value={data.wageGrowth ?? ''} onChange={f('wageGrowth')} />
      <Field label="春斗基本工资" value={data.baseWage ?? ''} onChange={f('baseWage')} hint="Shunto" />
      <Field label="家庭支出" value={data.householdSpending ?? ''} onChange={f('householdSpending')} />
    </G2>
    <SL text="结构性因素" />
    <Field label="人口老龄化风险" value={data.demographicsRisk ?? ''} onChange={f('demographicsRisk')} multiline />
    <Field label="东京交易所改革" value={data.corporateReform ?? ''} onChange={f('corporateReform')} multiline placeholder="PBR<1改善、股东回报..." />
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function KoreaForm({ data, onChange }: { data: KoreaData; onChange: (d: KoreaData) => void }) {
  const f = (key: keyof KoreaData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="经济" />
    <G2>
      <Field label="GDP" value={data.gdp ?? ''} onChange={f('gdp')} />
      <Field label="GDP Growth" value={data.gdpGrowth ?? ''} onChange={f('gdpGrowth')} />
      <Field label="制造业 PMI" value={data.manufacturingPmi ?? ''} onChange={f('manufacturingPmi')} />
      <Field label="出口" value={data.exports ?? ''} onChange={f('exports')} placeholder="YoY%" />
      <Field label="半导体出口" value={data.semiconductorExports ?? ''} onChange={f('semiconductorExports')} hint="占出口约20%" />
      <Field label="半导体周期位置" value={data.chipCycleTrend ?? ''} onChange={f('chipCycleTrend')} placeholder="上行/下行/底部" />
      <Field label="CPI" value={data.cpi ?? ''} onChange={f('cpi')} />
      <Field label="经常账户" value={data.currentAccount ?? ''} onChange={f('currentAccount')} />
    </G2>
    <SL text="货币与汇率" />
    <G2>
      <Field label="基准利率" value={data.baseRate ?? ''} onChange={f('baseRate')} />
      <Field label="USD/KRW" value={data.usdkrw ?? ''} onChange={f('usdkrw')} placeholder="e.g. 1,320" />
      <Field label="外资净流入" value={data.foreignFlow ?? ''} onChange={f('foreignFlow')} />
    </G2>
    <SL text="股票" />
    <G2>
      <Field label="KOSPI" value={data.kospi ?? ''} onChange={f('kospi')} />
      <Field label="KOSDAQ" value={data.kq11 ?? ''} onChange={f('kq11')} />
      <Field label="三星权重" value={data.samsungWeight ?? ''} onChange={f('samsungWeight')} placeholder="KOSPI占比约20%" />
    </G2>
    <SL text="房地产与债务" />
    <G2>
      <Field label="首尔房价" value={data.housePriceSeoul ?? ''} onChange={f('housePriceSeoul')} />
      <Field label="家庭债务/GDP" value={data.householdDebt ?? ''} onChange={f('householdDebt')} hint="全球最高之一" />
    </G2>
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function TaiwanForm({ data, onChange }: { data: TaiwanData; onChange: (d: TaiwanData) => void }) {
  const f = (key: keyof TaiwanData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="经济" />
    <G2>
      <Field label="GDP" value={data.gdp ?? ''} onChange={f('gdp')} />
      <Field label="GDP Growth" value={data.gdpGrowth ?? ''} onChange={f('gdpGrowth')} />
      <Field label="出口" value={data.exports ?? ''} onChange={f('exports')} />
      <Field label="外销订单" value={data.exportOrders ?? ''} onChange={f('exportOrders')} hint="领先1-2个月" />
      <Field label="CPI" value={data.cpi ?? ''} onChange={f('cpi')} />
      <Field label="政策利率" value={data.policyRate ?? ''} onChange={f('policyRate')} />
    </G2>
    <SL text="半导体与科技" />
    <G2>
      <Field label="半导体出口" value={data.semiconductorExports ?? ''} onChange={f('semiconductorExports')} hint="占出口约40%" />
      <Field label="台积电产能利用率" value={data.tsmcUtilization ?? ''} onChange={f('tsmcUtilization')} placeholder="e.g. 85%" />
      <Field label="先进制程产能" value={data.advancedNodeCapacity ?? ''} onChange={f('advancedNodeCapacity')} placeholder="3nm/5nm占比" />
      <Field label="AI 服务器出口" value={data.aiServerExports ?? ''} onChange={f('aiServerExports')} />
    </G2>
    <SL text="汇率与股票" />
    <G2>
      <Field label="USD/TWD" value={data.usdtwd ?? ''} onChange={f('usdtwd')} placeholder="e.g. 31.5" />
      <Field label="TAIEX" value={data.taiex ?? ''} onChange={f('taiex')} />
      <Field label="台积电权重" value={data.tsmcWeight ?? ''} onChange={f('tsmcWeight')} placeholder="TAIEX约30%" />
      <Field label="外资净流入" value={data.foreignFlow ?? ''} onChange={f('foreignFlow')} />
    </G2>
    <SL text="地缘政治" />
    <Field label="台海风险溢价" value={data.geopoliticalRisk ?? ''} onChange={f('geopoliticalRisk')} multiline />
    <Field label="两岸关系" value={data.crossStraitRelations ?? ''} onChange={f('crossStraitRelations')} multiline />
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function HKForm({ data, onChange }: { data: HongKongData; onChange: (d: HongKongData) => void }) {
  const f = (key: keyof HongKongData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="股票市场" />
    <G2>
      <Field label="恒生指数 HSI" value={data.hsi ?? ''} onChange={f('hsi')} />
      <Field label="恒生科技 HSTECH" value={data.hsTech ?? ''} onChange={f('hsTech')} />
      <Field label="港股市盈率" value={data.hsiPe ?? ''} onChange={f('hsiPe')} />
      <Field label="南向资金" value={data.southboundFlow ?? ''} onChange={f('southboundFlow')} placeholder="月度净流入" />
      <Field label="IPO 融资额" value={data.ipoRaised ?? ''} onChange={f('ipoRaised')} />
      <Field label="日均成交额 ADTV" value={data.adtv ?? ''} onChange={f('adtv')} />
    </G2>
    <SL text="房地产" />
    <G2>
      <Field label="房价指数" value={data.housePriceIndex ?? ''} onChange={f('housePriceIndex')} />
      <Field label="写字楼空置率" value={data.officeVacancy ?? ''} onChange={f('officeVacancy')} placeholder="e.g. 18%" />
      <Field label="零售租金" value={data.retailRent ?? ''} onChange={f('retailRent')} />
    </G2>
    <SL text="资金与利率" />
    <G2>
      <Field label="USD/HKD" value={data.usdhkd ?? ''} onChange={f('usdhkd')} placeholder="7.75-7.85 区间" />
      <Field label="联系汇率状态" value={data.linkedExchangeRate ?? ''} onChange={f('linkedExchangeRate')} placeholder="稳定/弱方兑换保证触发" />
      <Field label="HIBOR 1M" value={data.hibor ?? ''} onChange={f('hibor')} />
      <Field label="总结余" value={data.aggregateBalance ?? ''} onChange={f('aggregateBalance')} hint="流动性指标" />
    </G2>
    <SL text="宏观" />
    <G2>
      <Field label="GDP Growth" value={data.gdpGrowth ?? ''} onChange={f('gdpGrowth')} />
      <Field label="失业率" value={data.unemployment ?? ''} onChange={f('unemployment')} />
      <Field label="零售销售" value={data.retailSales ?? ''} onChange={f('retailSales')} />
      <Field label="旅客人次" value={data.touristArrivals ?? ''} onChange={f('touristArrivals')} />
    </G2>
    <SL text="政治与监管" />
    <Field label="政治风险" value={data.politicalRisk ?? ''} onChange={f('politicalRisk')} multiline />
    <Field label="国际金融中心地位" value={data.financialHubStatus ?? ''} onChange={f('financialHubStatus')} multiline />
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function SEAsiaForm({ data, onChange }: { data: SEAsiaData; onChange: (d: SEAsiaData) => void }) {
  const f = (key: keyof SEAsiaData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="区域整体" />
    <G2>
      <Field label="ASEAN GDP 总量" value={data.aseanGdp ?? ''} onChange={f('aseanGdp')} />
      <Field label="区域 GDP 增速" value={data.regionGdpGrowth ?? ''} onChange={f('regionGdpGrowth')} />
      <Field label="区域综合 PMI" value={data.regionPmi ?? ''} onChange={f('regionPmi')} />
      <Field label="FDI 外商直接投资" value={data.fdi ?? ''} onChange={f('fdi')} />
      <Field label="制造业转移指数" value={data.supplyChainShift ?? ''} onChange={f('supplyChainShift')} hint="中国+1" />
      <Field label="人口增长率" value={data.populationGrowth ?? ''} onChange={f('populationGrowth')} />
      <Field label="中产阶级扩张" value={data.middleClassExpansion ?? ''} onChange={f('middleClassExpansion')} />
      <Field label="数字经济规模" value={data.digitalEconomy ?? ''} onChange={f('digitalEconomy')} />
    </G2>
    <SL text="越南" />
    <G2>
      <Field label="GDP Growth" value={data.vietnamGdp ?? ''} onChange={f('vietnamGdp')} />
      <Field label="出口" value={data.vietnamExports ?? ''} onChange={f('vietnamExports')} />
      <Field label="FDI" value={data.vietnamFdi ?? ''} onChange={f('vietnamFdi')} />
      <Field label="USD/VND" value={data.vietnamDong ?? ''} onChange={f('vietnamDong')} />
    </G2>
    <SL text="印尼" />
    <G2>
      <Field label="GDP Growth" value={data.indonesiaGdp ?? ''} onChange={f('indonesiaGdp')} />
      <Field label="CPI" value={data.indonesiaCpi ?? ''} onChange={f('indonesiaCpi')} />
      <Field label="基准利率" value={data.indonesiaRate ?? ''} onChange={f('indonesiaRate')} />
      <Field label="USD/IDR" value={data.idrUsd ?? ''} onChange={f('idrUsd')} />
      <Field label="雅加达综合指数" value={data.jakartaComposite ?? ''} onChange={f('jakartaComposite')} />
      <Field label="镍出口" value={data.nickelExports ?? ''} onChange={f('nickelExports')} hint="全球最大镍储量" />
    </G2>
    <SL text="泰国" />
    <G2>
      <Field label="GDP Growth" value={data.thailandGdp ?? ''} onChange={f('thailandGdp')} />
      <Field label="旅游收入" value={data.tourism ?? ''} onChange={f('tourism')} />
      <Field label="USD/THB" value={data.thbUsd ?? ''} onChange={f('thbUsd')} />
      <Field label="SET 指数" value={data.set ?? ''} onChange={f('set')} />
    </G2>
    <SL text="新加坡" />
    <G2>
      <Field label="GDP Growth" value={data.singaporeGdp ?? ''} onChange={f('singaporeGdp')} />
      <Field label="CPI" value={data.singaporeCpi ?? ''} onChange={f('singaporeCpi')} />
      <Field label="USD/SGD" value={data.usdsgd ?? ''} onChange={f('usdsgd')} />
      <Field label="STI 指数" value={data.sti ?? ''} onChange={f('sti')} />
      <Field label="金融中心评分" value={data.financialHubScore ?? ''} onChange={f('financialHubScore')} />
    </G2>
    <SL text="马来西亚" />
    <G2>
      <Field label="GDP Growth" value={data.malaysiaGdp ?? ''} onChange={f('malaysiaGdp')} />
      <Field label="半导体出口" value={data.semiconductorExports ?? ''} onChange={f('semiconductorExports')} />
      <Field label="USD/MYR" value={data.usdmyr ?? ''} onChange={f('usdmyr')} />
      <Field label="KLCI 指数" value={data.klci ?? ''} onChange={f('klci')} />
    </G2>
    <SL text="菲律宾" />
    <G2>
      <Field label="GDP Growth" value={data.philippinesGdp ?? ''} onChange={f('philippinesGdp')} />
      <Field label="海外汇款" value={data.remittances ?? ''} onChange={f('remittances')} hint="GDP约10%" />
      <Field label="USD/PHP" value={data.usdphp ?? ''} onChange={f('usdphp')} />
    </G2>
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function MiddleEastForm({ data, onChange }: { data: MiddleEastData; onChange: (d: MiddleEastData) => void }) {
  const f = (key: keyof MiddleEastData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="能源" />
    <G2>
      <Field label="Brent 原油" value={data.brentOil ?? ''} onChange={f('brentOil')} placeholder="e.g. $80/bbl" />
      <Field label="WTI 原油" value={data.wtioil ?? ''} onChange={f('wtioil')} />
      <Field label="OPEC 产量" value={data.opecProduction ?? ''} onChange={f('opecProduction')} placeholder="mbpd" />
      <Field label="OPEC 剩余产能" value={data.opecSpareCapacity ?? ''} onChange={f('opecSpareCapacity')} />
      <Field label="沙特阿美产量" value={data.saudiAramcoOutput ?? ''} onChange={f('saudiAramcoOutput')} />
      <Field label="财政平衡油价" value={data.oilFiscalBreakeven ?? ''} onChange={f('oilFiscalBreakeven')} hint="各国不同" placeholder="沙特约$80" />
    </G2>
    <SL text="主权财富基金" />
    <G2>
      <Field label="SWF 总规模" value={data.swfAum ?? ''} onChange={f('swfAum')} placeholder="PIF+ADIA+QIA" />
      <Field label="PIF 战略" value={data.pifStrategy ?? ''} onChange={f('pifStrategy')} multiline />
      <Field label="沙特2030愿景进展" value={data.vision2030 ?? ''} onChange={f('vision2030')} multiline />
      <Field label="财政平衡" value={data.fiscalBalance ?? ''} onChange={f('fiscalBalance')} />
    </G2>
    <SL text="股票市场" />
    <G2>
      <Field label="Tadawul（沙特）" value={data.tadawul ?? ''} onChange={f('tadawul')} />
      <Field label="DFM（迪拜）" value={data.dfm ?? ''} onChange={f('dfm')} />
      <Field label="ADX（阿布扎比）" value={data.adx ?? ''} onChange={f('adx')} />
    </G2>
    <SL text="房地产与旅游" />
    <G2>
      <Field label="迪拜房价" value={data.dubaiHousePrice ?? ''} onChange={f('dubaiHousePrice')} />
      <Field label="迪拜租金回报率" value={data.dubaiRentalYield ?? ''} onChange={f('dubaiRentalYield')} placeholder="e.g. 6-8%" />
      <Field label="国际游客人次" value={data.touristArrivals ?? ''} onChange={f('touristArrivals')} />
      <Field label="NEOM 项目进展" value={data.neomProgress ?? ''} onChange={f('neomProgress')} />
    </G2>
    <SL text="地缘政治" />
    <Field label="伊朗核协议" value={data.iranNuclear ?? ''} onChange={f('iranNuclear')} multiline />
    <Field label="以色列冲突" value={data.israelConflict ?? ''} onChange={f('israelConflict')} multiline />
    <Field label="美国-海湾关系" value={data.usGccRelations ?? ''} onChange={f('usGccRelations')} multiline />
    <Field label="中东-中国关系" value={data.chinaMiddleEast ?? ''} onChange={f('chinaMiddleEast')} multiline />
    <SL text="汇率" />
    <G2>
      <Field label="USD/SAR" value={data.usdSar ?? ''} onChange={f('usdSar')} hint="钉住汇率 3.75" />
      <Field label="USD/AED" value={data.usdAed ?? ''} onChange={f('usdAed')} hint="钉住汇率 3.67" />
    </G2>
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

function SouthAmericaForm({ data, onChange }: { data: SouthAmericaData; onChange: (d: SouthAmericaData) => void }) {
  const f = (key: keyof SouthAmericaData) => (v: string) => onChange({ ...data, [key]: v });
  return (<>
    <SL text="巴西" />
    <G2>
      <Field label="GDP Growth" value={data.brazilGdp ?? ''} onChange={f('brazilGdp')} />
      <Field label="CPI（IPCA）" value={data.brazilCpi ?? ''} onChange={f('brazilCpi')} />
      <Field label="Selic 利率" value={data.brazilRate ?? ''} onChange={f('brazilRate')} placeholder="e.g. 10.75%" />
      <Field label="BRL/USD" value={data.brlusd ?? ''} onChange={f('brlusd')} placeholder="e.g. 5.0" />
      <Field label="Bovespa 指数" value={data.bovespa ?? ''} onChange={f('bovespa')} />
      <Field label="财政赤字/GDP" value={data.brazilFiscal ?? ''} onChange={f('brazilFiscal')} />
    </G2>
    <SL text="阿根廷" />
    <G2>
      <Field label="CPI（通胀率）" value={data.argentinaCpi ?? ''} onChange={f('argentinaCpi')} hint="年率超100%" />
      <Field label="ARS/USD" value={data.arsusd ?? ''} onChange={f('arsusd')} placeholder="官方/蓝筹价" />
      <Field label="主权债务状态" value={data.argentinaDebt ?? ''} onChange={f('argentinaDebt')} />
      <Field label="IMF 计划" value={data.imfProgram ?? ''} onChange={f('imfProgram')} />
    </G2>
    <SL text="智利" />
    <G2>
      <Field label="GDP Growth" value={data.chileGdp ?? ''} onChange={f('chileGdp')} />
      <Field label="铜产量" value={data.copperProduction ?? ''} onChange={f('copperProduction')} hint="全球最大" />
      <Field label="USD/CLP" value={data.usdclp ?? ''} onChange={f('usdclp')} />
    </G2>
    <SL text="大宗商品" />
    <G2>
      <Field label="铜价" value={data.copperPrice ?? ''} onChange={f('copperPrice')} placeholder="e.g. $8,500/t" />
      <Field label="铁矿石价格" value={data.ironorePrice ?? ''} onChange={f('ironorePrice')} placeholder="e.g. $110/t" />
      <Field label="大豆价格" value={data.soybeanPrice ?? ''} onChange={f('soybeanPrice')} placeholder="e.g. $480/bu" />
      <Field label="锂价格" value={data.lithiumPrice ?? ''} onChange={f('lithiumPrice')} hint="锂三角" />
      <Field label="原油产量" value={data.oilProduction ?? ''} onChange={f('oilProduction')} hint="委内瑞拉/巴西" />
    </G2>
    <SL text="区域整体" />
    <G2>
      <Field label="区域 GDP 增速" value={data.regionGdpGrowth ?? ''} onChange={f('regionGdpGrowth')} />
      <Field label="FDI 流入" value={data.fdInflows ?? ''} onChange={f('fdInflows')} />
      <Field label="对华贸易依存度" value={data.chinaTradeReliance ?? ''} onChange={f('chinaTradeReliance')} hint="大宗商品出口" />
      <Field label="大宗商品周期位置" value={data.commodityCycle ?? ''} onChange={f('commodityCycle')} placeholder="上行/下行/筑底" />
    </G2>
    <Field label="政治风险" value={data.politicalRisk ?? ''} onChange={f('politicalRisk')} multiline placeholder="左翼浪潮、选举风险..." />
    <SL text="综合研判" />
    <SignalSelect value={data.investmentSignal} onChange={v => onChange({ ...data, investmentSignal: v })} />
    <Field label="整体展望" value={data.overallOutlook ?? ''} onChange={f('overallOutlook')} multiline />
    <Field label="分析师笔记" value={data.analystNotes ?? ''} onChange={f('analystNotes')} multiline />
  </>);
}

// ── 地区 Tab 配置 ──────────────────────────────────────
const REGION_TABS: Record<RegionId, { label: string }> = {
  us:            { label: '🇺🇸 美国' },
  china:         { label: '🇨🇳 中国' },
  europe:        { label: '🇪🇺 欧洲' },
  japan:         { label: '🇯🇵 日本' },
  korea:         { label: '🇰🇷 韩国' },
  taiwan:        { label: '🇹🇼 台湾' },
  hongkong:      { label: '🇭🇰 香港' },
  southeast_asia:{ label: '🌏 东南亚' },
  middle_east:   { label: '🌍 中东' },
  south_america: { label: '🌎 南美' },
};

export default function RegionForm({ onSubmit, onCancel, initialData, regionId }: RegionFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [snapshotDate, setSnapshotDate] = useState(initialData?.snapshotDate ?? '');

  const [us, setUs] = useState<USData>(initialData?.us ?? {});
  const [china, setChina] = useState<ChinaData>(initialData?.china ?? {});
  const [europe, setEurope] = useState<EuropeData>(initialData?.europe ?? {});
  const [japan, setJapan] = useState<JapanData>(initialData?.japan ?? {});
  const [korea, setKorea] = useState<KoreaData>(initialData?.korea ?? {});
  const [taiwan, setTaiwan] = useState<TaiwanData>(initialData?.taiwan ?? {});
  const [hk, setHk] = useState<HongKongData>(initialData?.hongkong ?? {});
  const [sea, setSea] = useState<SEAsiaData>(initialData?.southeast_asia ?? {});
  const [me, setMe] = useState<MiddleEastData>(initialData?.middle_east ?? {});
  const [sa, setSa] = useState<SouthAmericaData>(initialData?.south_america ?? {});

  const handleSubmit = () => {
    const data: RegionData = {
      id: initialData?.id ?? Date.now().toString(),
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      regionId,
      title,
      snapshotDate,
      us: regionId === 'us' ? us : undefined,
      china: regionId === 'china' ? china : undefined,
      europe: regionId === 'europe' ? europe : undefined,
      japan: regionId === 'japan' ? japan : undefined,
      korea: regionId === 'korea' ? korea : undefined,
      taiwan: regionId === 'taiwan' ? taiwan : undefined,
      hongkong: regionId === 'hongkong' ? hk : undefined,
      southeast_asia: regionId === 'southeast_asia' ? sea : undefined,
      middle_east: regionId === 'middle_east' ? me : undefined,
      south_america: regionId === 'south_america' ? sa : undefined,
    };
    onSubmit(data);
  };

  const renderForm = () => {
    switch (regionId) {
      case 'us':            return <USForm data={us} onChange={setUs} />;
      case 'china':         return <ChinaForm data={china} onChange={setChina} />;
      case 'europe':        return <EuropeForm data={europe} onChange={setEurope} />;
      case 'japan':         return <JapanForm data={japan} onChange={setJapan} />;
      case 'korea':         return <KoreaForm data={korea} onChange={setKorea} />;
      case 'taiwan':        return <TaiwanForm data={taiwan} onChange={setTaiwan} />;
      case 'hongkong':      return <HKForm data={hk} onChange={setHk} />;
      case 'southeast_asia':return <SEAsiaForm data={sea} onChange={setSea} />;
      case 'middle_east':   return <MiddleEastForm data={me} onChange={setMe} />;
      case 'south_america': return <SouthAmericaForm data={sa} onChange={setSa} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 头部标题区 */}
      <div className="px-6 pt-4 pb-3 border-b border-slate-100 bg-slate-50/50 shrink-0">
        <div className="text-sm font-semibold text-slate-700 mb-3">
          {REGION_TABS[regionId].label} 经济快照
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="快照标题（可选）" value={title} onChange={setTitle} placeholder="e.g. 2024Q4 美国经济快照" />
          <Field label="数据截止日期" value={snapshotDate} onChange={setSnapshotDate} placeholder="e.g. 2024-12-01" />
        </div>
      </div>

      {/* 表单内容 */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {renderForm()}
      </div>

      {/* 底部按钮 */}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center shrink-0">
        <span className="text-xs text-slate-400">* 仅已填写的字段会显示在研究页面</span>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all">取消</button>
          <button onClick={handleSubmit} className="px-5 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm shadow-amber-200">确认添加</button>
        </div>
      </div>
    </div>
  );
}