import { ResearchData } from '../store/researchStore';

// 对应数据库表结构（snake_case）
export interface ResearchRecordRow {
  id: string;
  category: string;
  sub_item: string | null;
  title: string;
  data: ResearchData;
  created_at: string;
  updated_at: string;
}

// 转换成前端习惯的结构（camelCase）
export interface ResearchRecordDTO {
  id: string;
  category: string;
  subItem?: string;
  title: string;
  data: ResearchData;
  createdAt: string;
  updatedAt: string;
}

export function rowToDTO(row: ResearchRecordRow): ResearchRecordDTO {
  return {
    id: row.id,
    category: row.category,
    subItem: row.sub_item ?? undefined,
    title: row.title,
    data: row.data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}