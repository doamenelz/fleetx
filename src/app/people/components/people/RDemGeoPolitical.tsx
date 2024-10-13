"use client";

import {
  CustomCardWithTitle,
  BodyCopy,
  CARD_SPAN,
  MenuDropdown,
} from "@/components";

/** Analytics card showing the Demographics Age Distribution */
export const RDemGeoPolitical = () => {
  return (
    <CustomCardWithTitle
      title="Distribution by Geo Locations"
      copy="Demographics"
      span={CARD_SPAN.one}
      button={
        <MenuDropdown
          button={<></>}
          items={[
            { id: "", label: "Add to Favorites", function: () => {} },
            { id: "", label: "View More Details", function: () => {} },
          ]}
        />
      }
    >
      <BodyCopy text="" />
    </CustomCardWithTitle>
  );
};
