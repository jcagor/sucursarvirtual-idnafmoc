export interface CreateCertificateDto {
    filedId: string;

    requestStatus: string;

    requestType: string;

    requestDate: string;

    requestId: string;

    contentInfo: Record<string, string>;
}