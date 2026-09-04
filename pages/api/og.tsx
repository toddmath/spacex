import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// TODO: Refactor this example endpoint with themed styles and relevant content
// INFO: https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples
export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title")?.slice(0, 100) ?? "SpaceX";

    return new ImageResponse(
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div tw="size-full flex text-center flex-col items-center justify-center flex-nowrap bg-black bg-cover">
        <div tw="flex items-center justify-center justify-items-center">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-700 text-left">
              {title}
              <span tw="text-indigo-600">Start your free trial today.</span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                >
                  Get started
                </a>
              </div>
              <div tw="ml-3 flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    console.log(`${(e as Error)?.message}`);

    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
