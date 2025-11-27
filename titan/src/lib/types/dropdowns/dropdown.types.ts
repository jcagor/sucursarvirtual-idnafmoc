export interface DropdownInterface {
    label: string;
    content: string[];
    classname?: string;
    onChange: (selection: any) => void;
    disabled?: boolean;
}