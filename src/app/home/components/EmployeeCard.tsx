"use client";
import {
  AVATAR_SIZES,
  Avatar,
  BUTTON_SKIN,
  BodyCopy,
  Button,
  Lbl,
  StatusBadge,
  VehicleImageCard,
} from "@/components";
import { HomeContext } from "@/context/HomeContext";
import { RootContext } from "@/context/RootContext";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";
import { generateVehicleDetails, Vehicle } from "@/models";
import { User } from "@/models/Shared/User";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";

export const EmployeeCard: FC<{ user: User }> = ({ user }) => {
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>();
  const rootContext = useContext(RootContext);
  const homeContext = useContext(HomeContext);

  const getVehicles = async () => {
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/inventory?assignedOwner=${rootContext.store?.user?.id}`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      setMyVehicles(api.data.results as Vehicle[]);
      homeContext.setUserVehicles(api.data as Vehicle[]);
    } else {
      console.error("Error fetching vehicles:", api.errorMessage);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <div className="rounded-md border pb-12">
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 h-20 rounded-tl-md rounded-tr-md"></div>
      <div className="text-center block mx-auto px-4 align-baseline w-full -m-10 space-y-6">
        <div className="flex justify-between items-end">
          <Avatar
            firstName={rootContext.store?.user?.firstName ?? ""}
            lastName={rootContext.store?.user?.lastName ?? ""}
            imageUrl={rootContext.store?.user?.avatar}
            size={AVATAR_SIZES.xxl}
          />
          <Button
            label="View Profile"
            skin={BUTTON_SKIN.secondaryColor}
          />
        </div>

        <div className="text-left space-y-1">
          <p className="text-slate-900 font-semibold">
            {`${rootContext.store?.user?.firstName} ${rootContext.store?.user?.middleName}
             ${rootContext.store?.user?.lastName}`}
          </p>
          <p className="text-slate-700 text-sm">
            {rootContext.store?.user?.title}
          </p>
          <p className="text-slate-700 text-xs">
            #: {rootContext.store?.user?.id}
          </p>
          <StatusBadge
            label="Active"
            bgColor="bg-green-100"
            labelColor="text-green-700"
            ringColor="ring-green-600/20"
          />
        </div>

        {myVehicles && (
          <>
            <div className="border-t py-4 space-y-4">
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <Lbl label="My Vehicles" />
                  {myVehicles.length > 2 && (
                    <Link
                      href={"/my-vehicles/VEH1000005"}
                      className="hover:text-primary-800"
                    >
                      <Lbl
                        label={`View All (${myVehicles.length})`}
                        labelStyle="text-xs text-primary-600 hover:text-primary-800 "
                      />
                    </Link>
                  )}
                </div>

                {myVehicles.length === 0 && (
                  <p className="p-4 border rounded-md border-c-mid text-xs w-full text-center text-gray-500">
                    There are no vehicles assigned to you
                  </p>
                )}

                {myVehicles.length >= 1 && (
                  <>
                    {myVehicles?.map((vehicle, index) => (
                      <Link
                        key={index}
                        href={`home/my-vehicles/${vehicle.id}/summary`}
                      >
                        <div
                          className="flex items-center space-x-4 py-2"
                          key={index}
                        >
                          <VehicleImageCard
                            imageUrl={vehicle.mainImage}
                            iconSize="size-10"
                            style="rounded-md size-16 object-cover"
                          />
                          <div className="text-left space-y-1">
                            <BodyCopy
                              copy={vehicle.name}
                              copyStyle="text-sm font-semibold group hover:text-primary-900"
                            />
                            {vehicle.licenseNumber && (
                              <BodyCopy
                                copy={`#${vehicle.licenseNumber}`}
                                copyStyle="text-xs font-light text-gray-800"
                              />
                            )}

                            <Lbl
                              label={`${vehicle.model} • ${vehicle.trim}`}
                              isLight
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
