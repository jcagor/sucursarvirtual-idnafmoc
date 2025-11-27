export interface IGetTermAndConditionData {
  data: IGetData;
  message: string;
  statusCode: number;
}

export interface IGetData {
  id: number;
  name: string;
  description: string;
  link: string;
  version: string;
}
