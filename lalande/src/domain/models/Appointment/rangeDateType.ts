export interface RangeDateType {
  startDate: Date | null;
  endDate: Date | null;
}

export interface AdminRangeDateType extends RangeDateType {
  businessId:string;
  multiBusiness?:Array<string>
}
