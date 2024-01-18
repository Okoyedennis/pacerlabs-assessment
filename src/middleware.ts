import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("loggedin");
  let url = req.url;

  if (!verify && url.includes("/landingPage")) {
    return NextResponse.redirect(`${process.env.FRONTEND_BASE_URL}/`);
  }

  if (verify && url === `${process.env.FRONTEND_BASE_URL}/`) {
    return NextResponse.redirect(
      `${process.env.FRONTEND_BASE_URL}/landingPage`
    );
  }
}
