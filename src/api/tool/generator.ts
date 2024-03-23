import axios from 'axios';
import qs from 'query-string';

const BASE_URL = '/generator';

export interface TableRecord {
  tableName: string;
  comment?: string;
  engine: string;
  charset: string;
  createTime?: string;
  isConfiged: boolean;
  disabled: boolean;
}

export interface TableParam {
  tableName?: string;
}

export interface TableListRes {
  list: TableRecord[];
  total: number;
}

export function listTable(params: TableParam) {
  return axios.get<TableListRes>(`${BASE_URL}/table`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface FieldConfigRecord {
  tableName: string;
  columnName: string;
  columnType: string;
  fieldName: string;
  fieldType: string;
  fieldSort: number;
  comment: string;
  isRequired: boolean;
  showInList: boolean;
  showInForm: boolean;
  showInQuery: boolean;
  formType: string;
  queryType: string;
  createTime?: string;
}

export function listFieldConfig(tableName: string, requireSync: boolean) {
  return axios.get<FieldConfigRecord[]>(
    `${BASE_URL}/field/${tableName}?requireSync=${requireSync}`,
  );
}

export interface GenConfigRecord {
  tableName: string;
  moduleName: string;
  packageName: string;
  businessName: string;
  author: string;
  tablePrefix: string;
  isOverride: boolean;
  createTime?: string;
  updateTime?: string;
}

export function getGenConfig(tableName: string) {
  return axios.get<GenConfigRecord>(`${BASE_URL}/config/${tableName}`);
}

export interface GeneratorConfigRecord {
  genConfig: GenConfigRecord;
  fieldConfigs: FieldConfigRecord[];
}

export function saveConfig(tableName: string, req: GeneratorConfigRecord) {
  return axios.post(`${BASE_URL}/config/${tableName}`, req);
}

export interface GeneratePreviewRecord {
  fileName: string;
  content: string;
}

export function preview(tableName: string) {
  return axios.get<GeneratePreviewRecord[]>(`${BASE_URL}/preview/${tableName}`);
}

export function generate(tableNames: Array<string>) {
  return axios.request({
    url: `${BASE_URL}/${tableNames}`,
    method: 'post',
    responseType: 'blob',
  });
}
