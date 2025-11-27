export interface AdoResponseInterface {
  Uid: string;
  StartingDate: string;
  CreationDate: string;
  CreationIP: string;
  DocumentType: number;
  IdNumber: string;
  FirstName: string;
  SecondName: string;
  FirstSurname: string;
  SecondSurname: string;
  Gender: string;
  BirthDate: string;
  Street?: string;
  CedulateCondition?: string;
  Spouse?: string;
  Home?: string;
  MaritalStatus?: string;
  DateOfIdentification?: string;
  DateOfDeath?: string;
  MarriageDate?: string;
  Instruction?: string;
  PlaceBirth: string;
  Nationality?: string;
  MotherName?: string;
  FatherName?: string;
  HouseNumber?: string;
  Profession?: string;
  ExpeditionCity?: string;
  ExpeditionDepartment?: string;
  BirthCity?: string;
  BirthDepartment?: string;
  TransactionType: number;
  TransactionTypeName: string;
  IssueDate: string;
  BarcodeText?: string;
  OcrTextSideOne?: string;
  OcrTextSideTwo?: string;
  SideOneWrongAttempts: number;
  SideTwoWrongAttempts: number;
  FoundOnAdoAlert: boolean;
  AdoProjectId: string | number;
  TransactionId: string | number;
  ProductId: string | number;
  ComparationFacesSuccesful: boolean;
  FaceFound: boolean;
  FaceDocumentFrontFound: boolean;
  BarcodeFound: boolean;
  ResultComparationFaces: string | number;
  ComparationFacesAproved: boolean;
  Extras: AdoResponseExtras;
  NumberPhone?: string | number;
  CodFingerprint?: string | number;
  ResultQRCode?: string | number;
  DactilarCode?: string | number;
  ReponseControlList?: string;
  Images: any[];
  SignedDocuments: any[];
  Scores: Array<AdoResponseScore>;
  Response_ANI?: string;
  Parameters?: string;
}

export interface AdoResponseExtras {
  IdState: string;
  StateName: string;
}

export interface AdoResponseScore {
  Id: number;
  UserName?: string;
  StateName: string;
  StartingDate: string;
  Observation: string;
}
