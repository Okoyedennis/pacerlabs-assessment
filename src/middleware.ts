import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("loggedin");
  let url = req.url;

  if (!verify && url.includes("/landingPage")) {
    return NextResponse.redirect("https://pacerlabs-assessment.vercel.app/");
  }

  if (verify && url === "https://pacerlabs-assessment.vercel.app/") {
    return NextResponse.redirect(
      "https://pacerlabs-assessment.vercel.app/landingPage"
    );
  }
}
