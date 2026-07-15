"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useResearchStore } from '../../../store/researchStore';
import { isEnterpriseData, isIndustryData } from '../../../lib/dataGuards';
import EnterpriseCard from '../../../components/enterprise/EnterpriseCard';
import IndustryCard from '../../../components/industry/IndustryCard';
import AddPanel from '../../../components/AddPanel';
import { ResearchData } from '../../../store/researchStore';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import EconomistCard from '../../../components/economist/EconomistCard';
import { isEconomistData } from '../../../lib/dataGuards';
import RegionCard from '../../../components/region/RegionCard';
import { isRegionData } from '../../../lib/dataGuards';
import AssetCard from '../../../components/asset/AssetCard';
import { isAssetData } from '../../../lib/dataGuards';



export default function RecordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, updateRecord, deleteRecord } = useResearchStore();
  const record = getById(id);
  const [panelOpen, setPanelOpen] = useState(false);

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-slate-400 text-sm">找不到该记录</p>
        <button onClick={() => router.back()} className="text-xs text-amber-600 hover:underline">← 返回</button>
      </div>
    );
  }

  const handleUpdate = (data: ResearchData) => {
    let title = record.title;
    if (isEnterpriseData(data)) title = data.basicInfo.companyName || record.title;
    if (isIndustryData(data))   title = data.basicInfo.industryName || record.title;
    updateRecord(record.id, { title, data });
    setPanelOpen(false);
  };

  const handleDelete = () => {
    deleteRecord(record.id);
    router.back();
  };

  const categoryLabelMap: Record<string, string> = {
    enterprise: '企业', industry: '产业', asset: '金融标的',
    region: '地区', strategy: '经济学家策略', behavioral: '行为经济', monetary: '货币政策与通胀',
  };

  return (
    <div className="space-y-6">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>{categoryLabelMap[record.category]}</span>
              {record.subItem && <><span>/</span><span className="text-amber-600 font-medium">{record.subItem}</span></>}
            </div>
            <h2 className="text-xl font-bold text-slate-900">
               {isAssetData(record.data) && record.data.title && record.data.title.trim()
               ? record.data.title
               : record.title}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPanelOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
          >
            <Pencil size={14} /> 编辑
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-sm text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-all"
          >
            <Trash2 size={14} /> 删除
          </button>
        </div>
      </div>

      {/* 根据数据类型渲染对应 Card */}
      {isEnterpriseData(record.data) && (
        <EnterpriseCard
          data={record.data}
          onEdit={() => setPanelOpen(true)}
          onDelete={handleDelete}
        />
      )}
      {isIndustryData(record.data) && (
        <IndustryCard
          data={record.data}
          onEdit={() => setPanelOpen(true)}
          onDelete={handleDelete}
        />
      )}
      {isEconomistData(record.data) && (
      <EconomistCard
        data={record.data}
        onEdit={() => setPanelOpen(true)}
        onDelete={handleDelete}
       />
     )}
     {isRegionData(record.data) && (
      <RegionCard
       data={record.data}
       onEdit={() => setPanelOpen(true)}
       onDelete={handleDelete}
     />
    )}
    {isAssetData(record.data) && (
     <AssetCard
      data={record.data}
      onEdit={() => setPanelOpen(true)}
      onDelete={handleDelete}
    />
    )}

      {/* 编辑面板 */}
      <AddPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        category={record.category}
        subItem={record.subItem}
        categoryLabel={categoryLabelMap[record.category] ?? record.category}
        editingData={record.data}
        onSubmit={handleUpdate}
      />
    </div>
  );
}