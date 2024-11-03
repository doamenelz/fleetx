import { faker } from "@faker-js/faker";
import { Person } from "./Person";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";

export interface FileDocument {
  id: string;
  name: string;
  dateUploaded: string;
  uploadedBy?: Person;
  metaInformation?: {};
}

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
