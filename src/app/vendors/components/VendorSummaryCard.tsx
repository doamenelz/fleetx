import {
  Accordion,
  CardWithSectionHeader,
  GRID_TYPE,
  GridLayout,
  ListTable,
  ListTableCell,
  ListTableData,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";
import { Vendor } from "@/models/Vendors";
import { FC } from "react";
import { VendorRating } from "./VendorRating";

export const VendorSummaryCard: FC<{ vendor: Vendor }> = ({ vendor }) => {
  // Fetch vendor data and populate the data array here

  const data: ListTableData[] = [
    {
      id: "1",
      key: "ID",
      value: vendor.id,
    },
    {
      id: "2",
      key: "Status",
      value: (
        <StatusBadge
          label={vendor.status}
          statusType={STATUS_COLORS.success}
        />
      ),
    },

    {
      id: "website",
      key: "Website",
      value: <p className="text-brand-persianBlue">{vendor.website}</p>,
    },
    {
      id: "phone",
      key: "Phone",
      value: <p className="text-brand-persianBlue">{vendor.phone}</p>,
    },
    {
      id: "email",
      key: "Email",
      value: <p className="text-brand-persianBlue">{vendor.email}</p>,
    },
    {
      id: "address",
      key: "Address",
      value: (
        <div>
          <ListTableCell
            title={`${vendor.address.lineOne}, ${vendor.address.lineTwo}`}
            copy={
              <p className="text-slate-500">{`${vendor.address.city}, ${vendor.address.postalCode}`}</p>
            }
            rowThree={
              <p className="text-slate-500">{`${vendor.address.state}, ${vendor.address.country}`}</p>
            }
          />
        </div>
      ),
    },
    {
      id: "primary-contact",
      key: "Primary Contact",
      value: (
        <div>
          <ListTableCell
            title={vendor.contacts[0].name}
            copy={
              <p className="text-brand-persianBlue">
                {vendor.contacts[0].email}
              </p>
            }
            rowThree={
              <p className=" text-brand-persianBlue">
                {vendor.contacts[0].phoneNumber}
              </p>
            }
          />
        </div>
      ),
    },
    {
      id: "service-class",
      key: "Service Classes",
      value: (
        <div className="">
          {vendor.serviceClasses.map((serviceClass, index) => (
            <p
              className="capitalize"
              key={index}
            >
              • {serviceClass}
            </p>
          ))}
        </div>
      ),
    },
    {
      id: "recommendation",
      key: "Recommendation",
      value: (
        <div>
          <ListTableCell
            title={vendor.recommendation?.rating ?? ""}
            copy={<VendorRating rating={vendor.recommendation?.rating ?? ""} />}
            rowThree={
              <p className="text-slate-500">{vendor.recommendation?.notes}</p>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <Accordion
      id="01"
      style="section"
      title="Profile Summary"
      body={<ListTable data={data} />}
    ></Accordion>
  );
};
