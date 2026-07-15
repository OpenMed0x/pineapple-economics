"use client";

import React, { useState } from 'react';
import { RegionData, RegionId, SignalStrength } from '../../types/region';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface RegionCardProps {
  data: RegionData;
  onEdit: (data: RegionData) => void;
  onDelete: () => void;
}

const SIGNAL_LABEL: Record<SignalStrength, string> = {
  strong_buy: '强烈看多', buy: '偏多', neutral: '中性', sell: '偏空', strong_sell: '强烈看空',
};
const SIGNAL_COLOR: Record<SignalStrength, string> = {
  strong_buy:  'bg-emerald-500 text-white',
  buy:         'bg-emerald-100 text-emerald-700',
  neutral:     'bg-slate-100 text-slate-600',
  sell:        'bg-rose-100 text-rose-700',
  strong_sell: 'bg-rose-500 text-white',
};

const REGION_LABEL: Record<RegionId, string> = {
  us: '🇺🇸 美国', china: '🇨🇳 中国', europe: '🇪🇺 欧洲',
  japan: '🇯🇵 日本', korea: '🇰🇷 韩国', taiwan: '🇹🇼 台湾',
  hongkong: '🇭🇰 香港', southeast_asia: '🌏 东南亚',
  middle_east: '🌍 中东', south_america: '🌎 南美',
};

const KV = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-44 shrink-0">{label}</span>
      <span className="text-xs text-slate-700 flex-1">{value}</span>
    </div>
  );
};

const Section = ({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const valid = React.Children.toArray(children).filter(Boolean);
  if (valid.length === 0) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-5 py-3.5 hover:bg-slate-50 transition-colors">
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
};

function SignalBadge({ signal }: { signal?: SignalStrength }) {
  if (!signal) return null;
  return (
    <span className={`text-xs px-3 py-0.5 rounded-full font-semibold ${SIGNAL_COLOR[signal]}`}>
      {SIGNAL_LABEL[signal]}
    </span>
  );
}

export default function RegionCard({ data, onEdit, onDelete }: RegionCardProps) {
  const regionLabel = REGION_LABEL[data.regionId];
  const d = data;

  const getSignal = (): SignalStrength | undefined => {
    switch (data.regionId) {
      case 'us':            return d.us?.investmentSignal;
      case 'china':         return d.china?.investmentSignal;
      case 'europe':        return d.europe?.investmentSignal;
      case 'japan':         return d.japan?.investmentSignal;
      case 'korea':         return d.korea?.investmentSignal;
      case 'taiwan':        return d.taiwan?.investmentSignal;
      case 'hongkong':      return d.hongkong?.investmentSignal;
      case 'southeast_asia':return d.southeast_asia?.investmentSignal;
      case 'middle_east':   return d.middle_east?.investmentSignal;
      case 'south_america': return d.south_america?.investmentSignal;
    }
  };

  return (
    <div className="space-y-4">
      {/* 头部 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-slate-900">
              {d.title || regionLabel}
            </h3>
            <SignalBadge signal={getSignal()} />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{regionLabel}</span>
            {d.snapshotDate && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                数据截止 {d.snapshotDate}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(data)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><Pencil size={15} /></button>
          <button onClick={onDelete} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={15} /></button>
        </div>
      </div>

      {/* 美国 */}
      {d.us && (<>
        <Section title="📈 经济增长">
          <KV label="GDP" value={d.us.gdp} />
          <KV label="GDP Growth" value={d.us.gdpGrowth} />
          <KV label="GDPNow（实时）" value={d.us.gdpNow} />
          <KV label="ISM 制造业 PMI" value={d.us.ismManufacturing} />
          <KV label="ISM 服务业 PMI" value={d.us.ismServices} />
          <KV label="零售销售" value={d.us.retailSales} />
          <KV label="消费者信心" value={d.us.consumerConfidence} />
          <KV label="领先指标 LEI" value={d.us.leadingIndex} />
        </Section>
        <Section title="👷 就业市场">
          <KV label="非农就业 NFP" value={d.us.nfp} />
          <KV label="失业率" value={d.us.unemploymentRate} />
          <KV label="广义失业率 U6" value={d.us.u6} />
          <KV label="薪资增长" value={d.us.wageGrowth} />
          <KV label="职位空缺 JOLTS" value={d.us.jobOpenings} />
          <KV label="初请失业金" value={d.us.initialJoblessClaims} />
        </Section>
        <Section title="🔥 通胀">
          <KV label="CPI YoY" value={d.us.cpi} />
          <KV label="核心 CPI" value={d.us.coreCpi} />
          <KV label="PCE" value={d.us.pce} />
          <KV label="核心 PCE" value={d.us.corePce} />
          <KV label="盈亏平衡通胀 5Y5Y" value={d.us.breakEvenInflation} />
          <KV label="PPI" value={d.us.ppi} />
        </Section>
        <Section title="🏦 货币政策">
          <KV label="联邦基金利率" value={d.us.fedFundsRate} />
          <KV label="Dot Plot 预期" value={d.us.dotPlot} />
          <KV label="Fed 资产负债表" value={d.us.fedBalanceSheet} />
          <KV label="2Y 国债" value={d.us.treasury2y} />
          <KV label="10Y 国债" value={d.us.treasury10y} />
          <KV label="30Y 国债" value={d.us.treasury30y} />
          <KV label="收益率曲线 2Y-10Y" value={d.us.yieldCurve} />
          <KV label="实际利率 TIPS" value={d.us.realYield} />
        </Section>
        <Section title="📊 资本市场">
          <KV label="S&P 500" value={d.us.sp500} />
          <KV label="Nasdaq 100" value={d.us.nasdaq100} />
          <KV label="道琼斯" value={d.us.dowJones} />
          <KV label="Russell 2000" value={d.us.russell2000} />
          <KV label="VIX" value={d.us.vix} />
          <KV label="DXY 美元指数" value={d.us.dxy} />
          <KV label="黄金" value={d.us.goldPrice} />
          <KV label="WTI 原油" value={d.us.crudeoil} />
          <KV label="S&P500 P/E" value={d.us.sp500Pe} />
          <KV label="信用利差" value={d.us.creditSpread} />
        </Section>
        <Section title="🏠 房地产" defaultOpen={false}>
          <KV label="房价指数 HPI" value={d.us.housePriceIndex} />
          <KV label="30Y 抵押贷款利率" value={d.us.mortgageRate} />
          <KV label="新屋开工" value={d.us.housingStarts} />
          <KV label="成屋销售" value={d.us.existingHomeSales} />
        </Section>
        <Section title="💰 财政" defaultOpen={false}>
          <KV label="联邦债务/GDP" value={d.us.federalDebtGdp} />
          <KV label="预算赤字" value={d.us.budgetDeficit} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="衰退概率" value={d.us.recessionProbability} />
          <KV label="美元周期位置" value={d.us.dollarCyclePhase} />
          <KV label="整体展望" value={d.us.overallOutlook} />
          <KV label="分析师笔记" value={d.us.analystNotes} />
        </Section>
      </>)}

      {/* 中国 */}
      {d.china && (<>
        <Section title="📈 经济增长">
          <KV label="GDP" value={d.china.gdp} />
          <KV label="GDP 增速" value={d.china.gdpGrowth} />
          <KV label="政府增长目标" value={d.china.gdpTarget} />
          <KV label="官方制造业 PMI" value={d.china.manufacturingPmi} />
          <KV label="官方服务业 PMI" value={d.china.servicesPmi} />
          <KV label="财新制造业 PMI" value={d.china.caixinManufacturing} />
          <KV label="工业增加值" value={d.china.industrialOutput} />
          <KV label="社会消费品零售" value={d.china.retailSales} />
          <KV label="固定资产投资" value={d.china.fixedAssetInvestment} />
          <KV label="出口" value={d.china.exports} />
          <KV label="进口" value={d.china.imports} />
          <KV label="贸易差额" value={d.china.tradeBalance} />
        </Section>
        <Section title="🔥 通胀">
          <KV label="CPI YoY" value={d.china.cpi} />
          <KV label="PPI YoY" value={d.china.ppi} />
          <KV label="通缩风险评估" value={d.china.deflationRisk} />
        </Section>
        <Section title="🏦 货币政策">
          <KV label="LPR 1年期" value={d.china.lpr1y} />
          <KV label="LPR 5年期" value={d.china.lpr5y} />
          <KV label="M2 增速" value={d.china.m2Growth} />
          <KV label="社融 TSF" value={d.china.tsf} />
          <KV label="新增人民币贷款" value={d.china.newLoans} />
          <KV label="存款准备金率 RRR" value={d.china.rrr} />
          <KV label="MLF 利率" value={d.china.mlf} />
          <KV label="人民币汇率 CNY/USD" value={d.china.cnyUsd} />
        </Section>
        <Section title="🏠 房地产" defaultOpen={false}>
          <KV label="70城房价指数" value={d.china.housePriceIndex} />
          <KV label="商品房销售面积" value={d.china.residentialSales} />
          <KV label="房地产开发投资" value={d.china.realEstateInvestment} />
          <KV label="房企债务风险" value={d.china.developerDebt} />
          <KV label="土地出让收入" value={d.china.landSales} />
        </Section>
        <Section title="📊 股票市场">
          <KV label="上证综指" value={d.china.shanghaiComposite} />
          <KV label="沪深 300" value={d.china.csi300} />
          <KV label="创业板指" value={d.china.chinextIndex} />
          <KV label="北向资金" value={d.china.northboundFlow} />
          <KV label="南向资金" value={d.china.southboundFlow} />
          <KV label="A股市盈率" value={d.china.aSharePe} />
          <KV label="AH 溢价" value={d.china.hShareDiscount} />
        </Section>
        <Section title="🌐 地缘政治" defaultOpen={false}>
          <KV label="中美关系" value={d.china.usChinaRelations} />
          <KV label="台海风险" value={d.china.taiwanRisk} />
          <KV label="制裁风险" value={d.china.sanctionsRisk} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="政策总基调" value={d.china.policyStance} />
          <KV label="整体展望" value={d.china.overallOutlook} />
          <KV label="分析师笔记" value={d.china.analystNotes} />
        </Section>
      </>)}

      {/* 欧洲 */}
      {d.europe && (<>
        <Section title="📈 经济增长">
          <KV label="GDP Growth" value={d.europe.gdpGrowth} />
          <KV label="制造业 PMI" value={d.europe.manufacturingPmi} />
          <KV label="服务业 PMI" value={d.europe.servicesPmi} />
          <KV label="工业产出" value={d.europe.industrialProduction} />
          <KV label="零售销售" value={d.europe.retailSales} />
          <KV label="ZEW 景气指数" value={d.europe.germanZew} />
        </Section>
        <Section title="🔥 通胀">
          <KV label="HICP" value={d.europe.hicp} />
          <KV label="核心 HICP" value={d.europe.coreHicp} />
          <KV label="德国 CPI" value={d.europe.germanCpi} />
        </Section>
        <Section title="🏦 货币政策">
          <KV label="ECB 主要再融资利率" value={d.europe.ecbRate} />
          <KV label="ECB 存款便利利率" value={d.europe.depositFacilityRate} />
          <KV label="德国 10Y Bund" value={d.europe.germany10y} />
          <KV label="意大利 10Y BTP" value={d.europe.italy10y} />
          <KV label="外围国家利差" value={d.europe.peripheralSpread} />
          <KV label="EUR/USD" value={d.europe.eurusd} />
        </Section>
        <Section title="⚡ 能源" defaultOpen={false}>
          <KV label="TTF 天然气" value={d.europe.ttfGas} />
          <KV label="电价" value={d.europe.electricityPrice} />
          <KV label="可再生能源占比" value={d.europe.renewableShare} />
        </Section>
        <Section title="📊 股票">
          <KV label="STOXX 600" value={d.europe.stoxx600} />
          <KV label="DAX" value={d.europe.dax} />
          <KV label="CAC 40" value={d.europe.cac40} />
          <KV label="FTSE 100" value={d.europe.ftse100} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="整体展望" value={d.europe.overallOutlook} />
          <KV label="分析师笔记" value={d.europe.analystNotes} />
        </Section>
      </>)}

      {/* 日本 */}
      {d.japan && (<>
        <Section title="📈 经济增长">
          <KV label="GDP Growth" value={d.japan.gdpGrowth} />
          <KV label="日银短观 Tankan" value={d.japan.tankan} />
          <KV label="制造业 PMI" value={d.japan.manufacturingPmi} />
          <KV label="工业生产" value={d.japan.industrialProduction} />
          <KV label="出口" value={d.japan.exports} />
          <KV label="贸易差额" value={d.japan.tradeBalance} />
        </Section>
        <Section title="🔥 通胀">
          <KV label="CPI YoY" value={d.japan.cpi} />
          <KV label="核心 CPI" value={d.japan.coreCpi} />
          <KV label="东京 CPI（领先）" value={d.japan.tokyoCpi} />
        </Section>
        <Section title="🏦 货币政策">
          <KV label="BOJ 政策利率" value={d.japan.bojPolicyRate} />
          <KV label="YCC 状态" value={d.japan.yccTarget} />
          <KV label="10Y JGB" value={d.japan.jgb10y} />
          <KV label="实际利率" value={d.japan.realRate} />
        </Section>
        <Section title="💱 汇率">
          <KV label="USD/JPY" value={d.japan.usdjpy} />
          <KV label="干预风险" value={d.japan.interventionRisk} />
          <KV label="经常账户" value={d.japan.currencyAccountBalance} />
        </Section>
        <Section title="📊 股票">
          <KV label="Nikkei 225" value={d.japan.nikkei225} />
          <KV label="TOPIX" value={d.japan.topix} />
          <KV label="外资买入" value={d.japan.foreignBuying} />
        </Section>
        <Section title="💼 工资与消费">
          <KV label="薪资增长" value={d.japan.wageGrowth} />
          <KV label="春斗基本工资" value={d.japan.baseWage} />
          <KV label="家庭支出" value={d.japan.householdSpending} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="人口老龄化风险" value={d.japan.demographicsRisk} />
          <KV label="东交所改革" value={d.japan.corporateReform} />
          <KV label="整体展望" value={d.japan.overallOutlook} />
          <KV label="分析师笔记" value={d.japan.analystNotes} />
        </Section>
      </>)}

      {/* 韩国 */}
      {d.korea && (<>
        <Section title="📈 经济">
          <KV label="GDP Growth" value={d.korea.gdpGrowth} />
          <KV label="制造业 PMI" value={d.korea.manufacturingPmi} />
          <KV label="出口" value={d.korea.exports} />
          <KV label="半导体出口" value={d.korea.semiconductorExports} />
          <KV label="半导体周期位置" value={d.korea.chipCycleTrend} />
          <KV label="CPI" value={d.korea.cpi} />
          <KV label="经常账户" value={d.korea.currentAccount} />
        </Section>
        <Section title="🏦 货币与汇率">
          <KV label="基准利率" value={d.korea.baseRate} />
          <KV label="USD/KRW" value={d.korea.usdkrw} />
          <KV label="外资净流入" value={d.korea.foreignFlow} />
        </Section>
        <Section title="📊 股票">
          <KV label="KOSPI" value={d.korea.kospi} />
          <KV label="KOSDAQ" value={d.korea.kq11} />
          <KV label="三星权重" value={d.korea.samsungWeight} />
        </Section>
        <Section title="🏠 房地产" defaultOpen={false}>
          <KV label="首尔房价" value={d.korea.housePriceSeoul} />
          <KV label="家庭债务/GDP" value={d.korea.householdDebt} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="整体展望" value={d.korea.overallOutlook} />
          <KV label="分析师笔记" value={d.korea.analystNotes} />
        </Section>
      </>)}

      {/* 台湾 */}
      {d.taiwan && (<>
        <Section title="📈 经济">
          <KV label="GDP Growth" value={d.taiwan.gdpGrowth} />
          <KV label="出口" value={d.taiwan.exports} />
          <KV label="外销订单（领先）" value={d.taiwan.exportOrders} />
          <KV label="CPI" value={d.taiwan.cpi} />
          <KV label="政策利率" value={d.taiwan.policyRate} />
        </Section>
        <Section title="💻 半导体与科技">
          <KV label="半导体出口" value={d.taiwan.semiconductorExports} />
          <KV label="台积电产能利用率" value={d.taiwan.tsmcUtilization} />
          <KV label="先进制程产能" value={d.taiwan.advancedNodeCapacity} />
          <KV label="AI 服务器出口" value={d.taiwan.aiServerExports} />
        </Section>
        <Section title="📊 股票与汇率">
          <KV label="USD/TWD" value={d.taiwan.usdtwd} />
          <KV label="TAIEX" value={d.taiwan.taiex} />
          <KV label="台积电权重" value={d.taiwan.tsmcWeight} />
          <KV label="外资净流入" value={d.taiwan.foreignFlow} />
        </Section>
        <Section title="🌐 地缘政治">
          <KV label="台海风险溢价" value={d.taiwan.geopoliticalRisk} />
          <KV label="两岸关系" value={d.taiwan.crossStraitRelations} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="整体展望" value={d.taiwan.overallOutlook} />
          <KV label="分析师笔记" value={d.taiwan.analystNotes} />
        </Section>
      </>)}

      {/* 香港 */}
      {d.hongkong && (<>
        <Section title="📊 股票市场">
          <KV label="恒生指数 HSI" value={d.hongkong.hsi} />
          <KV label="恒生科技 HSTECH" value={d.hongkong.hsTech} />
          <KV label="港股市盈率" value={d.hongkong.hsiPe} />
          <KV label="南向资金" value={d.hongkong.southboundFlow} />
          <KV label="IPO 融资额" value={d.hongkong.ipoRaised} />
          <KV label="日均成交 ADTV" value={d.hongkong.adtv} />
        </Section>
        <Section title="🏠 房地产" defaultOpen={false}>
          <KV label="房价指数" value={d.hongkong.housePriceIndex} />
          <KV label="写字楼空置率" value={d.hongkong.officeVacancy} />
          <KV label="零售租金" value={d.hongkong.retailRent} />
        </Section>
        <Section title="🏦 资金与利率">
          <KV label="USD/HKD" value={d.hongkong.usdhkd} />
          <KV label="联系汇率状态" value={d.hongkong.linkedExchangeRate} />
          <KV label="HIBOR 1M" value={d.hongkong.hibor} />
          <KV label="总结余" value={d.hongkong.aggregateBalance} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="GDP Growth" value={d.hongkong.gdpGrowth} />
          <KV label="国际金融中心地位" value={d.hongkong.financialHubStatus} />
          <KV label="整体展望" value={d.hongkong.overallOutlook} />
          <KV label="分析师笔记" value={d.hongkong.analystNotes} />
        </Section>
      </>)}

      {/* 东南亚 */}
      {d.southeast_asia && (<>
        <Section title="🌏 区域整体">
          <KV label="区域 GDP 增速" value={d.southeast_asia.regionGdpGrowth} />
          <KV label="ASEAN GDP" value={d.southeast_asia.aseanGdp} />
          <KV label="FDI 外商投资" value={d.southeast_asia.fdi} />
          <KV label="制造业转移指数" value={d.southeast_asia.supplyChainShift} />
          <KV label="人口增长" value={d.southeast_asia.populationGrowth} />
          <KV label="数字经济规模" value={d.southeast_asia.digitalEconomy} />
        </Section>
        <Section title="🇻🇳 越南" defaultOpen={false}>
          <KV label="GDP Growth" value={d.southeast_asia.vietnamGdp} />
          <KV label="出口" value={d.southeast_asia.vietnamExports} />
          <KV label="FDI" value={d.southeast_asia.vietnamFdi} />
          <KV label="USD/VND" value={d.southeast_asia.vietnamDong} />
        </Section>
        <Section title="🇮🇩 印尼" defaultOpen={false}>
          <KV label="GDP Growth" value={d.southeast_asia.indonesiaGdp} />
          <KV label="CPI" value={d.southeast_asia.indonesiaCpi} />
          <KV label="基准利率" value={d.southeast_asia.indonesiaRate} />
          <KV label="USD/IDR" value={d.southeast_asia.idrUsd} />
          <KV label="雅加达综合指数" value={d.southeast_asia.jakartaComposite} />
          <KV label="镍出口" value={d.southeast_asia.nickelExports} />
        </Section>
        <Section title="🇸🇬 新加坡" defaultOpen={false}>
          <KV label="GDP Growth" value={d.southeast_asia.singaporeGdp} />
          <KV label="USD/SGD" value={d.southeast_asia.usdsgd} />
          <KV label="STI 指数" value={d.southeast_asia.sti} />
          <KV label="金融中心评分" value={d.southeast_asia.financialHubScore} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="整体展望" value={d.southeast_asia.overallOutlook} />
          <KV label="分析师笔记" value={d.southeast_asia.analystNotes} />
        </Section>
      </>)}

      {/* 中东 */}
      {d.middle_east && (<>
        <Section title="⛽ 能源">
          <KV label="Brent 原油" value={d.middle_east.brentOil} />
          <KV label="OPEC 产量" value={d.middle_east.opecProduction} />
          <KV label="OPEC 剩余产能" value={d.middle_east.opecSpareCapacity} />
          <KV label="财政平衡油价" value={d.middle_east.oilFiscalBreakeven} />
        </Section>
        <Section title="💰 主权财富基金">
          <KV label="SWF 总规模" value={d.middle_east.swfAum} />
          <KV label="PIF 战略" value={d.middle_east.pifStrategy} />
          <KV label="沙特2030愿景" value={d.middle_east.vision2030} />
        </Section>
        <Section title="📊 股票">
          <KV label="Tadawul（沙特）" value={d.middle_east.tadawul} />
          <KV label="DFM（迪拜）" value={d.middle_east.dfm} />
          <KV label="ADX（阿布扎比）" value={d.middle_east.adx} />
        </Section>
        <Section title="🏠 房地产与旅游" defaultOpen={false}>
          <KV label="迪拜房价" value={d.middle_east.dubaiHousePrice} />
          <KV label="迪拜租金回报率" value={d.middle_east.dubaiRentalYield} />
          <KV label="国际游客" value={d.middle_east.touristArrivals} />
        </Section>
        <Section title="🌐 地缘政治" defaultOpen={false}>
          <KV label="伊朗核协议" value={d.middle_east.iranNuclear} />
          <KV label="以色列冲突" value={d.middle_east.israelConflict} />
          <KV label="中东-中国关系" value={d.middle_east.chinaMiddleEast} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="整体展望" value={d.middle_east.overallOutlook} />
          <KV label="分析师笔记" value={d.middle_east.analystNotes} />
        </Section>
      </>)}

      {/* 南美 */}
      {d.south_america && (<>
        <Section title="🇧🇷 巴西">
          <KV label="GDP Growth" value={d.south_america.brazilGdp} />
          <KV label="CPI（IPCA）" value={d.south_america.brazilCpi} />
          <KV label="Selic 利率" value={d.south_america.brazilRate} />
          <KV label="BRL/USD" value={d.south_america.brlusd} />
          <KV label="Bovespa" value={d.south_america.bovespa} />
          <KV label="财政赤字/GDP" value={d.south_america.brazilFiscal} />
        </Section>
        <Section title="🇦🇷 阿根廷" defaultOpen={false}>
          <KV label="CPI 通胀率" value={d.south_america.argentinaCpi} />
          <KV label="ARS/USD" value={d.south_america.arsusd} />
          <KV label="主权债务状态" value={d.south_america.argentinaDebt} />
          <KV label="IMF 计划" value={d.south_america.imfProgram} />
        </Section>
        <Section title="🔴 大宗商品">
          <KV label="铜价" value={d.south_america.copperPrice} />
          <KV label="铁矿石" value={d.south_america.ironorePrice} />
          <KV label="大豆" value={d.south_america.soybeanPrice} />
          <KV label="锂价格" value={d.south_america.lithiumPrice} />
          <KV label="智利铜产量" value={d.south_america.copperProduction} />
        </Section>
        <Section title="🎯 综合研判">
          <KV label="大宗商品周期" value={d.south_america.commodityCycle} />
          <KV label="对华贸易依存度" value={d.south_america.chinaTradeReliance} />
          <KV label="政治风险" value={d.south_america.politicalRisk} />
          <KV label="整体展望" value={d.south_america.overallOutlook} />
          <KV label="分析师笔记" value={d.south_america.analystNotes} />
        </Section>
      </>)}
    </div>
  );
}