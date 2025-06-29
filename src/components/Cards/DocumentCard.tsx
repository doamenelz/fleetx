import { FileDocument } from "@/models/Document";
import { FC } from "react";
import { Lbl } from "../Typography";
import { Ellipsis, Trash, FileQuestion, File } from "lucide-react";
import { MenuDropdown } from "../Inputs";

export const DocCard: FC<{ doc: FileDocument }> = ({ doc }) => {
  var sourceType: string;

  switch (doc.metaInformation?.format) {
    case "pdf":
      sourceType = "/pdfIcon.svg";
      break;
    case "xls":
      sourceType = "/xlsIcon.svg";
      break;
    case "xlsx":
      sourceType = "/xlsxIcon.svg";
      break;
    case "doc":
      sourceType = "/docIcon.svg";
      break;
    case "docx":
      sourceType = "/docxIcon.svg";
      break;
    case "csv":
      sourceType = "/csvIcon.svg";
      break;

    default:
      sourceType = "/csvIcon.svg";
      break;
  }

  return (
    <div className="text-sm border border-slate-200 rounded-sm">
      <div className="h-24 bg-brand-arcticPowder items-center justify-center flex rounded-sm">
        <img src={sourceType} />
      </div>

      <div className="flex justify-between p-2">
        <div className="space-y-1 ">
          <p className="text-xs font-semibold">{doc.name}</p>
          <Lbl label={`Uploaded: ${doc.dateUploaded}`} />
        </div>
        <MenuDropdown
          items={[
            {
              id: "1",
              label: "View File",
              function: () => {},
              icon: <File className="w-3 h-3" />,
            },
            {
              id: "2",
              label: "Delete File",
              function: () => {},
              icon: <Trash className="w-3 h-3" />,
            },
            {
              id: "3",
              label: "File Information",
              function: () => {},
              icon: <FileQuestion className="w-3 h-3" />,
            },
          ]}
          button={
            <div className="p-2 rounded-sm border hover:border-slate-300 hover:bg-slate-50 hover:text-brand-persianBlue">
              <Ellipsis className="w-4 h-4" />
            </div>
          }
        />
      </div>
    </div>
  );
};
