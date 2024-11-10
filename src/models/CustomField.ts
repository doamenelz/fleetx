export interface CustomField {
  id: string;
  key: string;
  value: any;
}

export interface CustomFormSection {
  type: string;
  sections: {
    id: string;
    label: string;
    description: string;
    type: string;
    fields: {
      id: string;
      label: string;
      inputType: string;
      description: string;
      isRequired: boolean;
    }[];
    value: any;
  }[];
}
