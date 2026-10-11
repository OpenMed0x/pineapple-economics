export type FinLabStatus =
  | 'idea'
  | 'testing'
  | 'profitable'
  | 'paused'
  | 'failed';

export interface FinLabExperiment {
  caseName: string;
  status: FinLabStatus;
  experimentDate?: string;
  monetizationMode?: string;
  skillAsset?: string;
  customerSegment?: string;
  pricePerUnit?: number;
  unit?: string;
  monthlyRevenue?: number;
  variableCost?: number;
  fixedCost?: number;
  timeInvestmentHours?: number;
  acquisitionChannel?: string;
  economicPrinciple?: string;
  financeModel?: string;
  hypothesis?: string;
  evidence?: string;
  keyMetrics?: string;
  risks?: string;
  nextExperiment?: string;
  notes?: string;
}

