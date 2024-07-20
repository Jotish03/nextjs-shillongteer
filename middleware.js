import { NextResponse } from "next/server";

const ALLOWED_COUNTRY = "IN"; // Country code for India
const DEVELOPMENT_ALLOWED_COUNTRIES = ["IN", "US", "GB"]; // For testing purposes

async function getCountryFromIP(ip) {
  // Don't attempt geolocation for localhost/private IPs
  if (
    ip === "::1" ||
    ip === "127.0.0.1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.")
  ) {
    console.log("Local IP detected, skipping geolocation");
    return null;
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return null;
  }
}

export async function middleware(request) {
  const shouldRunMiddleware = /^\/api\/|^\/protected\//i.test(
    request.nextUrl.pathname
  );

  if (!shouldRunMiddleware) {
    return NextResponse.next();
  }

  const isDevelopment =
    process.env.NODE_ENV === "development" ||
    request.headers.get("host")?.includes("localhost");
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] || request.ip || "";
  const userAgent = request.headers.get("user-agent") || "";
  let country = request.headers.get("x-vercel-ip-country") || "";

  console.log(`Middleware triggered for path: ${request.nextUrl.pathname}`);
  console.log(`Environment: ${isDevelopment ? "Development" : "Production"}`);
  console.log(`IP: ${ip}`);
  console.log(`User Agent: ${userAgent}`);
  console.log(`Initial Country: ${country}`);
  console.log("Headers:", Object.fromEntries(request.headers.entries()));

  // Check for test country header
  const testCountry = request.headers.get("x-test-country");
  if (testCountry) {
    console.log(`Test country header detected: ${testCountry}`);
    country = testCountry;
  }

  // If country is still not determined, try fallback geolocation
  if (!country) {
    console.log("Attempting fallback geolocation");
    country = await getCountryFromIP(ip);
    console.log(`Fallback geolocation result: ${country}`);
  }

  // Development mode or localhost check
  if (isDevelopment || ip === "::1" || ip === "127.0.0.1") {
    console.log(
      "Development mode or localhost detected. Bypassing geo-blocking."
    );
    return NextResponse.next();
  }
  // Production check
  else if (country === ALLOWED_COUNTRY) {
    console.log(
      `Access granted: Request is from allowed country ${ALLOWED_COUNTRY}`
    );
    return NextResponse.next();
  }

  // Handle missing country information
  if (!country) {
    console.log("Warning: Country information is missing.");
    return NextResponse.redirect(new URL("/geolocation-required", request.url));
  }

  // Access denied
  console.log(
    `Access denied: Request is from ${country}, not ${ALLOWED_COUNTRY}`
  );
  return new NextResponse(
    `Access denied. This service is only available in ${ALLOWED_COUNTRY}.`,
    {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}

export const config = {
  matcher: [
    "/api/:path*",
    "/protected/:path*",
    // Add other paths that need geo-blocking
  ],
};
