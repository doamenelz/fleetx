"use client";
import {
  Accordion,
  BUTTON_SKIN,
  Button,
  CardWithSectionHeader,
  GRID_TYPE,
  GridLayout,
  ModalBackdrop,
  PageContainer,
  SCREEN_WIDTH,
  SlideOutWrapper,
  setScreenWidth,
} from "@/components";
import { EmployeeHero } from "../my-bio/components";
import { sampleEmployee } from "@/models";
import { classNames } from "@/lib/utilities/helperFunctions";
import { sampleBalances } from "./models/Balances";
import { BalancesCard } from "./components/BalancesCard";
import { FC, useState, useEffect } from "react";
import { sampleTimeOffDetailsArray } from "./models/TimeOff";
import { ExternalQL } from "@/components";
import {
  LeavePlanCell,
  ActiveUpcomingLeave,
  TimeOffDetailsView,
} from "./components";
import {
  EventSection,
  sampleCompanyEvents,
  sampleStatHolidays,
} from "./components/EventCell";

enum CONTROLLER {
  activeUpcoming,
  leavePlan,
  balances,
}

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedController, setSelectedController] = useState(
    CONTROLLER.activeUpcoming
  );
  const showModalHandler = () => {
    setShowModal(false);
  };

  const showLeaveDetails = () => {
    setShowModal(true);
    setSelectedController(CONTROLLER.activeUpcoming);
  };
  useEffect(() => {
    setIsMobile(window.innerWidth > 1023 ? false : true);
  }, []);
  return (
    <PageContainer
      documentTitle="Time Off"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showFooter={true}
      // bgColor="bg-slate-50"
    >
      <EmployeeHero
        employee={sampleEmployee}
        screenWidth={SCREEN_WIDTH.regular}
        // bottomBorder={true}
      />

      <div
        className={classNames(
          "px-4 py-8",
          setScreenWidth(SCREEN_WIDTH.regular)
        )}
      >
        {isMobile ? (
          <>
            <div className="py-4">
              <ActiveUpcomingLeave timeOff={sampleTimeOffDetailsArray[0]} />
            </div>

            <BalanceCard isMobile={isMobile} />
            <CalendarSection isMobile={isMobile} />
            <LeavePlan isMobile={false} onClick={showLeaveDetails} />
            <HelpfulLinksSection isMobile={isMobile} />
          </>
        ) : (
          <>
            <GridLayout
              type={GRID_TYPE.twoOne}
              lhs={
                <div className="space-y-6">
                  <BalanceCard isMobile={false} />
                  <LeavePlan isMobile={false} onClick={showLeaveDetails} />
                </div>
              }
              rhs={
                <div className="space-y-4">
                  <ActiveUpcomingLeave timeOff={sampleTimeOffDetailsArray[0]} />
                  <div>
                    <CalendarSection isMobile={false} />
                    <HelpfulLinksSection isMobile={isMobile} />
                  </div>
                </div>
              }
            ></GridLayout>
          </>
        )}
        <div className="space-y-2"></div>
      </div>
      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size={selectedController == CONTROLLER.activeUpcoming ? "lg" : "3xl"}
          showDismissButton={
            selectedController == CONTROLLER.activeUpcoming ? false : true
          }
        >
          <>
            <TimeOffDetailsView id="1" />
          </>
        </SlideOutWrapper>
      </ModalBackdrop>
    </PageContainer>
  );
}

const CalendarSection: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <Accordion
      id="calendar"
      defaultOpen={!isMobile ? true : false}
      style="section"
      title="Calendar"
      copy="Upcoming Stat holidays, and Team Schedule"
      body={
        <div className="px-4 pt-2 pb-6 space-y-4">
          {/* md:p-4 md:rounded-md md:bg-indigo-50/20 md:border md:border-indigo-50 */}
          <EventSection
            events={sampleStatHolidays}
            sectionTitle="Statutory Holidays"
          />
          <EventSection
            events={sampleCompanyEvents}
            sectionTitle="Company Events"
          />

          <Button
            componentType="link"
            link="time-off/calendar"
            label="View Calendar"
            skin={BUTTON_SKIN.link}
          />
        </div>
      }
    />
  );
};

const HelpfulLinksSection: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <Accordion
      id="helpful-links"
      defaultOpen={!isMobile ? true : false}
      style="section"
      title="Helpful Links"
      body={
        <div className="p-2 space-y-2">
          <ExternalQL id="" label="Absence Policy" url="" />
          <ExternalQL id="" label="Travel for Work Policy" url="" />
          <ExternalQL id="" label="Work From Home" url="" />
        </div>
      }
    />
  );
};

const BalanceCard: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <>
      {!isMobile && (
        <CardWithSectionHeader
          title="My Balances"
          copy="Accrued, and Leave balances"
        >
          <ul className="divide-y">
            {sampleBalances.map((balance) => (
              <li key={balance.id}>
                <BalancesCard leaveType={balance} />
              </li>
            ))}
          </ul>
        </CardWithSectionHeader>
      )}
      {isMobile && (
        <Accordion
          id="balances"
          defaultOpen={!isMobile ? true : false}
          style="section"
          title="My Balances"
          copy="Accrued, and Leave balances"
          body={
            <ul className="divide-y pb-8">
              {sampleBalances.map((balance) => (
                <li key={balance.id}>
                  <BalancesCard leaveType={balance} />
                </li>
              ))}
            </ul>
          }
        />
      )}
    </>
  );
};

const LeavePlan: FC<{ isMobile: boolean; onClick: Function }> = ({
  isMobile,
  onClick,
}) => {
  return (
    <>
      {!isMobile && (
        <CardWithSectionHeader
          title="Leave Plan"
          copy="Active and Scheduled Time Off"
          button={
            <Button
              componentType="link"
              link="time-off/calendar"
              label="View Calendar"
              skin={BUTTON_SKIN.link}
            />
          }
        >
          <ul className=" divide-y">
            {sampleTimeOffDetailsArray.map((timeOff) => (
              <li key={timeOff.id}>
                <LeavePlanCell timeOff={timeOff} onClick={() => onClick()} />
              </li>
            ))}
          </ul>
        </CardWithSectionHeader>
      )}
      {isMobile && (
        <Accordion
          id="leave-plan"
          defaultOpen={false}
          style="section"
          title="Leave Plan"
          copy="Active and Scheduled Time Off"
          body={
            <ul className=" divide-y pb-6 px-2">
              {sampleTimeOffDetailsArray.map((timeOff) => (
                <li key={timeOff.id}>
                  <LeavePlanCell
                    timeOff={timeOff}
                    onClick={() => {
                      onClick();
                    }}
                  />
                </li>
              ))}
            </ul>
          }
        />
      )}
    </>
  );
};
