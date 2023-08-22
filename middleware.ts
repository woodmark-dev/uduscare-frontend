import { NextRequest, NextResponse } from "next/server";

const userPages = ["/home", "/pending-appointment", "/appointment-history"];

const doctorPages = ["/doctor-appointments"];

const testPages = ["/test-appointments"];

const pharmacyPages = ["/pharmacy-appointments"];

export default function middleware(req: NextRequest) {
  const token = req.cookies
    .get("auth-cookie")
    ?.value.split(":")[2]
    .split(",")[0];

  const url = req.nextUrl.clone()
  const activePath = req.nextUrl.pathname;

  if (userPages.find((p) => p === activePath)) {
    if (token !== `"${"User"}"`) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if (doctorPages.find((p) => p === activePath)) {
    if (token !== `"${"Doctor"}"`) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if (testPages.find((p) => p === activePath)) {
    if (token !== `"${"Test"}"`) {
      console.log(token);
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if (pharmacyPages.find((p) => p === activePath)) {
    if (token !== `"${"Pharmacy"}"`) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if ("/" === req.nextUrl.pathname) {
    if (token === `"${"User"}"`) {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
    if (token === `"${"Doctor"}"`) {
      url.pathname = "/doctor-appointments";
      return NextResponse.redirect(url);
    }
    if (token === `"${"Pharmacy"}"`) {
      url.pathname = "/pharmacy-appointments";
      return NextResponse.redirect(url);
    }
    if (token === `"${"Test"}"`) {
      url.pathname = "/test-appointments";
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname === "/completed-appointments") {
    if (token === `"${"Doctor"}"` || `"${"Pharmacy"}"` || `"${"Test"}"`) {
      url.pathname = "/completed-appointments";
      NextResponse.redirect(url);
    } else if (token === `"${"User"}"`) {
      url.pathname = "/signin";
      NextResponse.redirect(url);
    } else {
      url.pathname = "/signin";
      NextResponse.redirect(url);
    }
  }
}
