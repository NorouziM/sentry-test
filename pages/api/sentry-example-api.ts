import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Simulate an error to test Sentry error monitoring
    throw new Error("Sentry Example API Route Error");
    // The following line is unreachable but illustrates a JSON response:
    // res.status(200).json({ data: "Testing Sentry Error..." });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
