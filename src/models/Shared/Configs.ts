import { apiHandler } from "@/lib/utilities/apiHelper";
import { Constants } from "./Constants";
import { CompanyConfiguration } from "./CompanyConfig";

export const getCompanyProfile = (url?: string) => {
  const config = sessionStorage.getItem(Constants.COMPANY);

  if (config !== null) {
    const parsedConfig: CompanyConfiguration = JSON.parse(config);
    return parsedConfig;
  } else {
    return getCompanyInfo();
  }
};

const getCompanyInfo = async () => {
  const api = await apiHandler({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/company`,
    method: "GET",
  });

  console.log("Calling Company", api);

  if (api.success) {
    let response = api.data as CompanyConfiguration;
    sessionStorage.setItem(Constants.COMPANY, JSON.stringify(response));
    return response;
  } else {
    return null;
  }
};
