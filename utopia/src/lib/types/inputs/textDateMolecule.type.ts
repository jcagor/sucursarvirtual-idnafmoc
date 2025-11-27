
export interface TextDateMolecule{
    textDescription:string,
    isoDateString:string;
    timestamp:number;
}

export interface TextDateMoleculeList extends Array<TextDateMolecule>{};