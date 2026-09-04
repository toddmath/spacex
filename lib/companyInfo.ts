import type { CompanyInfo } from "types/company-info";
import { useQuery, type QueryFunction } from "@tanstack/react-query";
import { SPACEX_API_URL } from "./constants";

const defaultCompanyInfo: CompanyInfo = {
  headquarters: {
    address: "Rocket Road",
    city: "Hawthorne",
    state: "California",
  },
  links: {
    website: "https://www.spacex.com/",
    flickr: "https://www.flickr.com/photos/spacex/",
    twitter: "https://twitter.com/SpaceX",
    elon_twitter: "https://twitter.com/elonmusk",
  },
  name: "SpaceX",
  founder: "Elon Musk",
  founded: 2002,
  employees: 9500,
  vehicles: 4,
  launch_sites: 3,
  test_sites: 3,
  ceo: "Elon Musk",
  cto: "Elon Musk",
  coo: "Gwynne Shotwell",
  cto_propulsion: "Tom Mueller",
  valuation: 180000000000,
  summary:
    "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.",
  id: "5eb75edc42e88e603b18d21f",
};

export const getCompanyInfo: QueryFunction<CompanyInfo> = async () => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/company`);
    if (!res.ok) {
      return defaultCompanyInfo;
    }
    const data: CompanyInfo = await res.json();
    return { ...defaultCompanyInfo, ...data };
  } catch {
    return defaultCompanyInfo;
  }
};

export const companyInfoKey = ["company"] as const

export const useCompanyInfoQuery = <T extends CompanyInfo>(
  select?: (data: CompanyInfo) => T
) =>
  useQuery({
    queryKey: companyInfoKey,
    queryFn: getCompanyInfo,
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
    select,
  })
