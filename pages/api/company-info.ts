import type { NextRequest } from "next/server"
import type { CompanyInfo } from "types/company-info"
// import type { NextApiRequest, NextApiResponse } from "next"
// import Cors from "cors"

import { json } from "lib/json"

export const config = {
  runtime: "experimental-edge",
}

export default async function handler(req: NextRequest) {
  try {
    const resp = await fetch("https://api.spacexdata.com/v4/company")
    const data: CompanyInfo = await resp.json()

    if (!resp.ok) {
      return json({ error: "failed to fetch company info data" }, { status: 400 })
    }

    return json(
      {
        headquarters: data.headquarters,
        links: data.links,
        name: data.name,
        founder: data.founder,
        founded: data.founded,
        employees: data.employees,
        vehicles: data.vehicles,
        launch_sites: data.launch_sites,
        test_sites: data.test_sites,
        ceo: data.ceo,
        cto: data.cto,
        coo: data.coo,
        cto_propulsion: data.cto_propulsion,
        valuation: data.valuation,
        summary: data.summary,
        id: data.id,
      },
      {
        headers: {
          "cache-control": "public, s-maxage=604800, stale-while-revalidate=86400",
        },
      }
    )

    // return new Response(
    //   JSON.stringify({
    //     headquarters: data.headquarters,
    //     links: data.links,
    //     name: data.name,
    //     founder: data.founder,
    //     founded: data.founded,
    //     employees: data.employees,
    //     vehicles: data.vehicles,
    //     launch_sites: data.launch_sites,
    //     test_sites: data.test_sites,
    //     ceo: data.ceo,
    //     cto: data.cto,
    //     coo: data.coo,
    //     cto_propulsion: data.cto_propulsion,
    //     valuation: data.valuation,
    //     summary: data.summary,
    //     id: data.id,
    //   }),
    //   {
    //     status: 200,
    //     headers: {
    //       "content-type": "application/json",
    //       "cache-control": "public, s-maxage=604800, stale-while-revalidate=86400",
    //     },
    //   }
    // )
  } catch (err) {
    return json({ error: "failed to fetch company info data" }, { status: 400 })
    // return new Response(
    //   JSON.stringify({ error: "failed to fetch company info data" }),
    //   { status: 400 }
    // )
  }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await runMiddleware(req, res, cors)

//     const resp = await fetch("https://api.spacexdata.com/v4/company")
//     const data: CompanyInfo = await resp.json()

//     res
//       .status(200)
//       .setHeader(
//         "cache-control",
//         "public, s-maxage=604800, stale-while-revalidate=86400"
//       )
//       .json({
//         headquarters: data.headquarters,
//         links: data.links,
//         name: data.name,
//         founder: data.founder,
//         founded: data.founded,
//         employees: data.employees,
//         vehicles: data.vehicles,
//         launch_sites: data.launch_sites,
//         test_sites: data.test_sites,
//         ceo: data.ceo,
//         cto: data.cto,
//         coo: data.coo,
//         cto_propulsion: data.cto_propulsion,
//         valuation: data.valuation,
//         summary: data.summary,
//         id: data.id,
//       })
//   } catch (err) {
//     res.status(500).send({ error: "failed to fetch company info data" })
//   }
// }

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
// const cors = Cors({
//   methods: ["GET"],
// })

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }
//       return resolve(result)
//     })
//   })
// }
