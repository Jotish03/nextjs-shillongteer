// pages/api/location-block/[...path].js
import { NextResponse } from "next/server";

const BLOCKED_LOCATIONS = [
  { city: "San Francisco", region: "California", country: "US" },
  { city: "Frankfurt", region: "Hesse", country: "DE" },
  { city: "Portland", region: "Oregon", country: "US" },
  { city: "Singapore", region: "Singapore", country: "SG" },
];

const ALLOWED_COUNTRIES = ["IN"]; // Country code for India

export default function middleware(req) {
  const { geo } = req;
  const requestLocation = {
    city: (geo.city || "").toLowerCase(),
    region: (geo.region || "").toLowerCase(),
    country: (geo.country || "").toUpperCase(), // Country codes are typically uppercase
  };

  // First, check if the request is from an allowed country (India)
  if (ALLOWED_COUNTRIES.includes(requestLocation.country)) {
    // Allow the request to proceed
    return NextResponse.next();
  }

  // If not from an allowed country, check if it's from a blocked location
  const isBlocked = BLOCKED_LOCATIONS.some(
    (location) =>
      location.city.toLowerCase() === requestLocation.city &&
      location.region.toLowerCase() === requestLocation.region &&
      location.country.toUpperCase() === requestLocation.country
  );

  if (isBlocked) {
    return new NextResponse("Access denied", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // If not blocked and not from India, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
