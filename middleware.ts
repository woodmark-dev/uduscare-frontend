import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server'

async function verifyJWT(token: any) {
  const secret = new TextEncoder().encode('secret')
  try {
    const { payload } = await jose.jwtVerify(token?.value || "", secret)
    return payload.role
  } catch (error) {
    return false
  }
}

const userPages = ["/home", "/pending-appointment", "/appointment-history"];

const doctorPages = ["/doctor-appointments"];

const testPages = ["/test-appointments"];

const pharmacyPages = ["/pharmacy-appointments"];

export default async function middleware(req: NextRequest) {
  const token = req?.cookies?.get('token')
  const isVerified = await verifyJWT(token);

  const url = req.nextUrl.clone()
  const activePath = req.nextUrl.pathname;

  if (userPages.find((p) => p === activePath)) {
    if (isVerified !== "User") {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if (doctorPages.find((p) => p === activePath)) {
    if (isVerified !== "Doctor") {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if (testPages.find((p) => p === activePath)) {
    if (isVerified !== "Test") {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if (pharmacyPages.find((p) => p === activePath)) {
    if (isVerified !== "Pharmacy") {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  if ("/" === req.nextUrl.pathname) {
    if (isVerified === "User") {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
    if (isVerified === "Doctor") {
      url.pathname = "/doctor-appointments";
      return NextResponse.redirect(url);
    }
    if (isVerified === "Pharmacy") {
      url.pathname = "/pharmacy-appointments";
      return NextResponse.redirect(url);
    }
    if (isVerified === "Test") {
      url.pathname = "/test-appointments";
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname === "/completed-appointments") {
    if (isVerified === "Doctor" || "Pharmacy" || "Test") {
      url.pathname = "/completed-appointments";
      NextResponse.redirect(url);
    } else if (isVerified === "User") {
      url.pathname = "/signin";
      NextResponse.redirect(url);
    } else {
      url.pathname = "/signin";
      NextResponse.redirect(url);
    }
  }
}
