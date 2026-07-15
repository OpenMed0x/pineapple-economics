import { EnterpriseData } from '../types/enterprise';
import { IndustryData } from '../types/industry';
import { EconomistData } from '../types/economist';
import { ResearchData } from '../store/researchStore';
import { RegionData } from '../types/region';
import { AssetData } from '../types/asset';

export function isAssetData(data: ResearchData): data is AssetData {
  return 'assetSubType' in data;
}


export function isRegionData(data: ResearchData): data is RegionData {
  return 'regionId' in data;
}

export function isEnterpriseData(data: ResearchData): data is EnterpriseData {
  return 'basicInfo' in data && 'financialAnalysis' in data;
}

export function isIndustryData(data: ResearchData): data is IndustryData {
  return (
    'basicInfo' in data &&
    'marketScale' in data &&
    'industryCycle' in data
  );
}

export function isEconomistData(data: ResearchData): data is EconomistData {
  return (
    'basicInfo' in data &&
    'theory' in data &&
    'publications' in data &&
    'predictions' in data &&
    'investment' in data &&
    'influence' in data &&
    'applicability' in data
  );
}

//这份文件用于更改右边界面显示的具体字段