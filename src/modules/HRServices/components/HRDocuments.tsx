import {
  TableCell,
  TableHeadCell,
  TableContainer,
  Table,
  TableRow,
  SearchField,
  Dropdown,
  Button,
  TEXT_INPUT_SIZE,
} from "@/components";
import { FC } from "react";
import { HRDocument } from "../model/HRDocument";
export const HRDocuments: FC<{ data: HRDocument[] }> = ({ data }) => {
  return (
    <div className="py-8 space-y-4">
      <div className="flex items-center gap-4">
        <SearchField placeholder="Search" setQuery={() => {}} />

        {/* <Dropdown
          items={["Policies", "Forms", "All Documents"]}
          setValue={() => {}}
          span={TEXT_INPUT_SIZE.span1}
          id="ad"
          defaultValue="Policies"
        /> */}

        <Button label="Filter" />
      </div>
      <TableContainer
        mainContent={
          <Table
            head={
              <>
                <TableHeadCell
                  label={"Name"}
                  mainCell={false}
                  hideOnMobile={false}
                />
                <TableHeadCell
                  label={"Description"}
                  mainCell={false}
                  hideOnMobile={false}
                />
                <TableHeadCell
                  label={"Last Updated"}
                  mainCell={false}
                  hideOnMobile={false}
                />
                <TableHeadCell
                  label={"Type"}
                  mainCell={false}
                  hideOnMobile={false}
                />
              </>
            }
            body={
              <>
                {data.map((doc, index) => (
                  <TableRow key={doc.id}>
                    <TableCell
                      key={doc.id}
                      label={doc.id}
                      mainCell={true}
                      hideOnMobile={false}
                      button={{
                        url: "doc.downloadUrl",
                        label: doc.name,
                      }}
                    />
                    <TableCell
                      key={doc.id}
                      label={doc.description}
                      mainCell={false}
                      hideOnMobile={false}
                      // button={{ url: doc.downloadUrl, label: hrDoc.name }}
                    />
                    <TableCell
                      key={doc.id}
                      label={doc.lastUpdated}
                      mainCell={false}
                      hideOnMobile={false}
                      // button={{ url: doc.downloadUrl, label: hrDoc.name }}
                    />
                    <TableCell
                      key={doc.id}
                      label={doc.type}
                      mainCell={false}
                      hideOnMobile={false}
                      // button={{ url: doc.downloadUrl, label: hrDoc.name }}
                    />
                  </TableRow>
                ))}
              </>
            }
          />
        }
      />
    </div>
  );
};
