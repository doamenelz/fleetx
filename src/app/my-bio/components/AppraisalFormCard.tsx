import {
  CardWithTitle,
  GridLayout,
  TextLabel,
  GRID_TYPE,
  Timeline,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
} from "@/components";
import { ArrowRightCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/utilities/helperFunctions";
import { appraisalActivities } from "../../../modules/MyBio/models/AppraisalTimeline";
export const AppraisalFormCard = () => {
  return (
    <div className="max-w-5xl">
      <CardWithTitle
        title="My Appraisal"
        button={
          <Button
            label="View Form"
            skin={BUTTON_SKIN.link}
            icon={{
              position: ICON_POSITION.trailing,
              asset: <ArrowRightCircleIcon className="w-3 h-3" />,
            }}
          />
        }
      >
        <GridLayout type={GRID_TYPE.twoCol}>
          <div className="space-y-4 ">
            <TextLabel
              label="Status"
              copy={
                <div>
                  <span
                    className={classNames(
                      "bg-warning-50 text-warning-600 ring-warning-600/20",
                      "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset "
                    )}
                  >
                    Ongoing
                  </span>
                </div>
              }
            />
            <TextLabel label="Initiated Date" copy={"23 Aug, 2024"} />
            <TextLabel label="Due Date" copy={"27 Aug, 2024"} />
          </div>
          <Timeline data={appraisalActivities} />
        </GridLayout>
      </CardWithTitle>
    </div>
  );
};
