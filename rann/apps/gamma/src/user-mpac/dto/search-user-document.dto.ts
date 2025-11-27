export interface SearchDocumentUnemployedDto {
  postulations: FilterPostulationDocuments[];
}

interface FilterPostulationDocuments{
  postulation_state: string;
  document: string;
  document_type_id: string;
}

interface FilterRegisterDocuments{
  document_abbreviation: string;
  document: string;
}

export interface SearchRegisterUserDto extends Array<FilterRegisterDocuments>{}
