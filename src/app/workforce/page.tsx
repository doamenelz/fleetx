"use client";
import {
  CustomCardWithTitle,
  BodyCopy,
  CARD_SPAN,
  GRID_TYPE,
  GridLayout,
  MenuDropdown,
  PageContainer,
  SCREEN_WIDTH,
  setScreenWidth,
} from "@/components";
import { EmployeeHero } from "../my-bio/components";
import { sampleEmployee } from "@/models";
import { AnnualRemunerationCard } from "../compensation/components/LastPayslipCard";
import { classNames } from "@/lib/utilities/helperFunctions";

export default function Page() {
  return (
    <PageContainer
      documentTitle="Workforce - Home"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      bgColor="bg-slate-50 h-screen"
      showFooter
    >
      <EmployeeHero
        employee={sampleEmployee}
        screenWidth={SCREEN_WIDTH.regular}
      />
      <div
        className={classNames(
          setScreenWidth(SCREEN_WIDTH.regular),
          "py-8 px-4"
        )}
      >
        <GridLayout type={GRID_TYPE.threeCol}>
          <CustomCardWithTitle
            title="Age Distribution"
            span={CARD_SPAN.two}
            button={
              <MenuDropdown
                button={<></>}
                items={[
                  { id: "", label: "Add to Favorites", function: () => {} },
                  { id: "", label: "Download Report", function: () => {} },
                ]}
              />
            }
          >
            <BodyCopy text="Pie Chart showing Distribution for staff" />
          </CustomCardWithTitle>
          <CustomCardWithTitle
            title="Sample Analytics Card Title"
            copy="Sample Analytics Card Copy"
            span={CARD_SPAN.one}
            button={
              <MenuDropdown
                button={<></>}
                items={[
                  { id: "", label: "Add to Favorites", function: () => {} },
                  { id: "", label: "Download Report", function: () => {} },
                ]}
              />
            }
          >
            <BodyCopy text="Pie Chart showing Distribution for staff" />
          </CustomCardWithTitle>
          <CustomCardWithTitle
            title="Sample Analytics Card Title"
            copy="Sample Analytics Card Copy"
            span={CARD_SPAN.one}
            button={
              <MenuDropdown
                button={<></>}
                items={[
                  { id: "", label: "Add to Favorites", function: () => {} },
                  { id: "", label: "Download Report", function: () => {} },
                ]}
              />
            }
          >
            <BodyCopy text="Pie Chart showing Distribution for staff" />
          </CustomCardWithTitle>
          <CustomCardWithTitle
            title="Sample Analytics Card Title"
            copy="Sample Analytics Card Copy"
            span={CARD_SPAN.one}
            button={
              <MenuDropdown
                button={<></>}
                items={[
                  { id: "", label: "Add to Favorites", function: () => {} },
                  { id: "", label: "Download Report", function: () => {} },
                ]}
              />
            }
          >
            <BodyCopy text="Pie Chart showing Distribution for staff" />
          </CustomCardWithTitle>
          <AnnualRemunerationCard />
        </GridLayout>
      </div>
    </PageContainer>
  );
}
