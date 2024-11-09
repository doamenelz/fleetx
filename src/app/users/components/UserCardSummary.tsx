import {
  Button,
  BUTTON_SKIN,
  CardWithSectionHeader,
  ListTable,
  ListTableData,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";
import { FC } from "react";
import { Person } from "@/models/Person";
import { classNames } from "@/lib/utilities/helperFunctions";

export const UserSummaryCard: FC<{ person: Person }> = ({ person }) => {
  // Fetch person data and populate the data array here

  const data: ListTableData[] = [
    {
      id: "status",
      key: "Status",
      value: (
        <StatusBadge
          style="text"
          label={person?.status ?? ""}
          statusType={
            person?.status === "Active"
              ? STATUS_COLORS.success
              : person?.status === "Deactivated"
              ? STATUS_COLORS.declined
              : STATUS_COLORS.pending
          }
        />
      ),
    },
    {
      id: "id",
      key: "ID",
      value: person.id,
    },
    {
      id: "first-name",
      key: "First Name",
      value: person.firstName,
    },

    {
      id: "last-name",
      key: "Last Name",
      value: person.lastName,
    },
    {
      id: "role",
      key: "Role",
      value: person.role,
    },

    {
      id: "email",
      key: "Email",
      value: person.email,
    },
    {
      id: "phone",
      key: "Phone",
      value: person.phone,
    },
    {
      id: "last-login",
      key: "Last Login",
      value: person.lastLogin,
    },
    {
      id: "license-number",
      key: "License #",
      value: person.licenseInformation?.number,
    },
    {
      id: "license-class",
      key: "License Class",
      value: person.licenseInformation?.class,
    },

    {
      id: "license-expiration",
      key: "License Expiration",
      value: (
        <p
          className={classNames(
            Date.parse(person.licenseInformation!.expirationDate) > Date.now()
              ? ""
              : "text-error-600"
          )}
        >
          {person.licenseInformation!.expirationDate}
        </p>
      ),
    },
  ];

  return (
    // <CardWithSectionHeader
    //   title="Profile Information"
    //   copy="User Summary and Contact Information"
    //   button={
    //     <Button
    //       label="Edit"
    //       skin={BUTTON_SKIN.secondary}
    //     />
    //   }
    // >
    //   <ListTable data={data} />
    // </CardWithSectionHeader>
    <ListTable data={data} />
  );
};
