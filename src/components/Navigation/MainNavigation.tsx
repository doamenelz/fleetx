import { FlexLogoFull } from "../../assets/FlexLogo";
import { AVATAR_SIZES, Avatar } from "../Avatar";
import { Tab } from "../Tabs";
import { classNames } from "@/lib/utilities/helperFunctions";
import { sampleEmployee } from "../../models";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const MainNavigation = () => {
  const location = usePathname();
  const tabs: Tab[] = [
    { id: "", name: "Home", href: "/dashboard" },
    // { name: "Inbox", href: "/inbox" },
    { id: "", name: "Documents", href: "/documents" },
    { id: "", name: "Profile", href: "/my-profile" },
  ];
  return (
    <nav className="fixed inset-x-0 top-0 z-40 items-center border-b bg-gray-25 shadow-gray-200">
      <div className="max-w-full px-4 mx-auto sm:px-6 lg:px-4 ">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              className="hidden md:block"
              href="/dashboard"
              id="company-logo"
            >
              <FlexLogoFull />
            </Link>
            <div className="tracking-tight md:flex md:gap-x-2 md:text-sm md:font-medium md:leading-6 md:text-gray-600">
              {tabs.map((tab, i) => (
                <Link
                  key={i}
                  className={classNames(
                    location.includes(tab.href) ? "text-primary-900" : "",
                    "hover:text-primary-800 p-2 inline-flex items-center gap-1 hover:bg-gray-50 rounded-sm"
                  )}
                  href={tab.href}
                >
                  {location.includes(tab.href) && (
                    <span className="block w-1 h-4 rounded-sm bg-warning-500"></span>
                  )}

                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <NotificationPanel /> */}
            {/* <p className="text-xs text-gray-900">
              {sampleEmployee.bioData.fullName}
            </p> */}

            <div className="hidden lg:block group">
              <div className="flex items-center">
                {/* <!-- Profile dropdown --> */}
                <div className="relative ">
                  <div>
                    <Avatar
                      firstName={sampleEmployee.bioData.firstName}
                      lastName={sampleEmployee.bioData.lastName}
                      size={AVATAR_SIZES.sm}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Mobile menu button --> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
