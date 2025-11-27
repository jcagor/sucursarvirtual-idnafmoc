export interface Attachment {
  id: string;
  requestId: string;
  fileName: string;
  fileType: string;
  fileURL: string;
  attachmentTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  request?: Request;
  attachmentTypes?: AttachmentType;
}
export interface AttachmentType {
  id: number;
  name: string;
  description: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MassiveAttachmentAudit {
  id: string;
  attachmentId: string;
  proccesed: number;
  withError: number;
  withoutError: number;
  createdAt: Date;
  updatedAt: Date;
  attachment?: Attachment[];
}

export interface IFindMassiveAttachment {
  data: MassiveAttachmentAudit | Attachment[];
  status: number;
  isAudit: boolean;
}
