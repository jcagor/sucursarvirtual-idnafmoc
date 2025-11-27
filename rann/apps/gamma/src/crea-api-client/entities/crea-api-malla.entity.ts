export interface MallaItemData {
  id: string;
  descripcion: string;
  nombre: string;
}

export interface MallaItemDataList extends Array<MallaItemData> {}

export interface LinkItemData {
  rel: string;
  href: string;
}

export interface LinkItemDataList extends Array<LinkItemData> {}

export interface SearchObjectData {
  regional: string;
}

export interface SearchObjectDataList extends Array<SearchObjectData> {}

export interface ResponseMallaCrea {
  data: MallaItemDataList;
  page: number;
  per_page: number;
  records_total: number;
  total_pages: number;
  has_more: boolean;
  pagination_enabled: boolean;
  links: LinkItemDataList;
  status: string;
  search: SearchObjectData | SearchObjectDataList;
  type: string;
}

export interface QueryMallaInformation{
    page?: number;
    items_per_page?: number;
}
