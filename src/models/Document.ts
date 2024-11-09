import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "./Person";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";

export interface FileDocument {
  id: string;
  name: string;
  dateUploaded: string;
  uploadedBy?: Person;
  metaInformation?: {
    format: string;
    notes?: string;
    uploadedType?: string;
  };
  docUrl?: string;
}

const fileFormat = ["csv", "doc", "docx", "pdf", "xls", "xlsx"];
const randomizeFileFormat = () => {
  return Math.floor(Math.random() * fileFormat.length);
};

const uploadedType = ["Drivers License", "Insurance", "Employee ID Card"];
const randomizeUploadedType = () => {
  return Math.floor(Math.random() * uploadedType.length);
};

export const createFileDocument = (name: string) => {
  let _file = {
    id: faker.string.alphanumeric({ length: 5, casing: "upper" }),
    name: name,
    dateUploaded: formatDate(
      new Date(
        faker.date.between({
          from: "2020-01-01T00:00:00.000Z",
          to: "2024-01-01T00:00:00.000Z",
        })
      ),
      DATE_OPTIONS.dMY
    ),
    uploadedBy: generatePerson("employee"),
    metaInformation: {
      format: fileFormat[randomizeFileFormat()],
      notes: faker.definitions.metadata.title,
      uploadedType: uploadedType[randomizeUploadedType()],
    },
  };

  return _file;
};

export const sampleDocuments: FileDocument[] = [
  createFileDocument("Vendor KYC"),
  createFileDocument("References"),
  createFileDocument("Service Level Agreement - 2023"),
  createFileDocument("Non Disclosure and Conduct Agreement"),
  createFileDocument("Vendor KYC"),
  createFileDocument("References"),
  createFileDocument("Service Level Agreement - 2023"),
  createFileDocument("Non Disclosure and Conduct Agreement"),
  createFileDocument("Vendor KYC"),
  createFileDocument("References"),
  createFileDocument("Service Level Agreement - 2023"),
  createFileDocument("Non Disclosure and Conduct Agreement"),
  createFileDocument("Vendor KYC"),
  createFileDocument("References"),
  createFileDocument("Service Level Agreement - 2023"),
  createFileDocument("Non Disclosure and Conduct Agreement"),
];

export const sampleUserDoc: FileDocument[] = [
  createFileDocument(uploadedType[randomizeUploadedType()]),
  createFileDocument(uploadedType[randomizeUploadedType()]),
  createFileDocument(uploadedType[randomizeUploadedType()]),
];
