"use client";

import React, { useState } from 'react';
import { AssetData, AssetSubType, CryptoData, IndexData, DetailedBondData, DetailedCommodityData, FxData } from '../../types/asset';
import CryptoForm from './CryptoForm';
import IndexForm from './IndexForm';
import BondForm from './BondForm';
import CommodityForm from './CommodityForm';
import FxForm from './FxForm';
import RealEstateForm from './RealEstateForm';
import { RealEstateData } from '../../types/asset';
import DepositForm from './DepositForm';
import StockForm from './StockForm';
import PEForm from './PEForm';
import { DepositData, StockData, PEData } from '../../types/asset';


interface AssetFormProps {
  onSubmit: (data: AssetData) => void;
  onCancel: () => void;
  initialData?: Partial<AssetData>;
  subItem?: string;
}

const SUBITEM_TO_TYPE: Record<string, AssetSubType> = {
  '加密货币': 'crypto',
  '指数':     'index',
  '债券':     'bond',
  '黄金':     'commodity',
  '大宗商品': 'commodity',
  '外汇':     'fx',
  '股票':     'stock',
  '房地产':   'realestate',
  '私募':     'pe',
  '公募':     'fund',
  '期货':     'futures',
  '期权':     'options',
  '保险':     'insurance',
};

export default function AssetForm({ onSubmit, onCancel, initialData, subItem }: AssetFormProps) {
  const assetSubType: AssetSubType = subItem ? (SUBITEM_TO_TYPE[subItem] ?? 'crypto') : 'crypto';

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [snapshotDate, setSnapshotDate] = useState(initialData?.snapshotDate ?? '');
  const [crypto, setCrypto] = useState<CryptoData>(initialData?.crypto ?? {});
  const [index, setIndex] = useState<IndexData>(initialData?.index ?? {});
  const [bond, setBond] = useState<DetailedBondData>(initialData?.bond ?? {});
  const [commodity, setCommodity] = useState<DetailedCommodityData>(initialData?.commodity ?? {});
  const [fx, setFx] = useState<FxData>(initialData?.fx ?? {});
  const [realestate, setRealestate] = useState<RealEstateData>(initialData?.realestate ?? {});
  const [deposit, setDeposit] = useState<DepositData>(initialData?.deposit  ?? {});
  const [stock, setStock] = useState<StockData>(initialData?.stock ?? {});
  const [pe, setPe] = useState<PEData>(initialData?.pe ?? {});


  const handleSubmit = () => {
    const defaultTitle = `${new Date().toLocaleDateString('zh-CN')} ${subItem ?? '资产'}记录`;
    const finalTitle = title.trim() !== '' ? title : defaultTitle;

    const data: AssetData = {
      id: initialData?.id ?? Date.now().toString(),
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assetSubType,
      title: title.trim() !== '' ? title : `${new Date().toLocaleDateString('zh-CN')} ${subItem ?? '资产'}记录`,
      snapshotDate,
      crypto:    assetSubType === 'crypto'     ? crypto     : undefined,
      index:     assetSubType === 'index'      ? index      : undefined,
      bond:      assetSubType === 'bond'       ? bond       : undefined,
      commodity: assetSubType === 'commodity'  ? commodity  : undefined,
      fx:        assetSubType === 'fx'         ? fx         : undefined,
      realestate: assetSubType === 'realestate' ? realestate : undefined,
      deposit:  assetSubType === 'deposit' ? deposit : undefined,
      stock:    assetSubType === 'stock'   ? stock   : undefined,
      pe:       assetSubType === 'pe'      ? pe      : undefined,

    };
    onSubmit(data);
  };



  const renderForm = () => {
    switch (assetSubType) {
      case 'crypto':    return <CryptoForm data={crypto} onChange={setCrypto} />;
      case 'index':     return <IndexForm data={index} onChange={setIndex} />;
      case 'bond':      return <BondForm data={bond} onChange={setBond} />;
      case 'commodity': return <CommodityForm data={commodity} onChange={setCommodity} />;
      case 'fx':        return <FxForm data={fx} onChange={setFx} />;
      case 'realestate':
  return <RealEstateForm data={realestate} onChange={setRealestate} />;
     case 'deposit':
  return <DepositForm data={deposit} onChange={setDeposit} />;
     case 'stock':
  return <StockForm data={stock} onChange={setStock} />;
     case 'pe':
  return <PEForm data={pe} onChange={setPe} />;
  default:
        return (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            「{subItem}」模块即将上线
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="px-6 pt-4 pb-3 border-b border-slate-100 bg-slate-50/50 shrink-0">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">快照标题（可选）</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder={`e.g. 2024Q4 ${subItem ?? ''}分析`}
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">数据截止日期</label>
            <input type="text" value={snapshotDate} onChange={e => setSnapshotDate(e.target.value)}
              placeholder="e.g. 2024-12-01"
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 transition-all" />
          </div>
        </div>
      </div>

      {/* 表单主体 */}
      <div className="flex-1 overflow-y-auto px-6 py-2 min-h-0">
        {renderForm()}
      </div>

      {/* 底部按钮 */}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center shrink-0">
        <span className="text-xs text-slate-400">* 仅已填写的字段会在研究页面显示</span>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all">
            取消
          </button>
          <button onClick={handleSubmit}
            className="px-5 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm shadow-amber-200">
            确认添加
          </button>
        </div>
      </div>
    </div>
  );
}