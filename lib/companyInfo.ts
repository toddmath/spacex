import type { CompanyInfo } from "types/company-info"
import type { QueryFunction } from "@tanstack/react-query"

export const getCompanyInfo: QueryFunction<CompanyInfo> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/company")
  const data: CompanyInfo = await res.json()
  return data
}

export const companyInfoKey = ["company"] as const
