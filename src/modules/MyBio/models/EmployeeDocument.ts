export interface EmployeeDocument {
  id: string;
  name: string;
  dateUploaded: Date;
  comments: string;
  details: string;
  documentType: string;
  expiryDate: Date;
  dateApproved: Date;
  status?: string;
}

export const sampleDocumentList: EmployeeDocument[] = [
  {
    id: "SDTR02ES",
    name: "International Passport",
    dateUploaded: new Date(Date.now() - 1086400000),
    comments: "",
    details: "",
    documentType: "Passport",
    expiryDate: new Date(Date.now() - 86400000),
    dateApproved: new Date(Date.now() - 186400000),
  },
  {
    id: "2",
    name: "Maya-license.pdf",
    dateUploaded: new Date(Date.now() - 1086400000),
    comments: "",
    details: "",
    documentType: "Birth Certificate",
    expiryDate: new Date(Date.now() - 46400000),
    dateApproved: new Date(Date.now() - 186400000),
  },
  {
    id: "3",
    name: "Maya-Resume.pdf",
    dateUploaded: new Date(Date.now() - 86400000),
    comments: "",
    details: "",
    documentType: "Resume",
    expiryDate: new Date(Date.now() + 96400000),
    dateApproved: new Date(Date.now() - 6400000),
  },
  {
    id: "4",
    name: "Employment Contract",
    dateUploaded: new Date(Date.now() - 1986400000),
    comments: "",
    details: "",
    documentType: "Identification",
    expiryDate: new Date(Date.now() + 86400000),
    dateApproved: new Date(Date.now() - 986400000),
  },
];

export const sampleUpdateRequest: EmployeeDocument[] = [
  {
    id: "SDTR02ES",
    name: "Date of Birth",
    dateUploaded: new Date(Date.now() - 1086400000),
    comments: "",
    details: "",
    documentType: "Date Change",
    expiryDate: new Date(Date.now() - 86400000),
    dateApproved: new Date(Date.now() - 186400000),
    status: "Pending - HR",
  },
  {
    id: "SDTR02ESO",
    name: "Tertiary Institution",
    dateUploaded: new Date(Date.now() - 1086400000),
    comments: "",
    details: "",
    documentType: "Education Change",
    expiryDate: new Date(Date.now() - 46400000),
    dateApproved: new Date(Date.now() - 186400000),
    status: "Pending - Line Manager",
  },
  {
    id: "SDTR02ESB",
    name: "Last Name",
    dateUploaded: new Date(Date.now() - 86400000),
    comments: "",
    details: "",
    documentType: "Update Bio Information",
    expiryDate: new Date(Date.now() + 96400000),
    dateApproved: new Date(Date.now() - 6400000),
    status: "Pending - Requestor",
  },
  {
    id: "SDTR02ESF",
    name: "Pre-tertiary Change",
    dateUploaded: new Date(Date.now() - 1986400000),
    comments: "",
    details: "",
    documentType: "Education Change",
    expiryDate: new Date(Date.now() + 86400000),
    dateApproved: new Date(Date.now() - 986400000),
    status: "Pending - HR",
  },
];
