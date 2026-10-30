import { NextResponse } from "next/server";

export interface GooglePlaceReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
  author_url?: string;
  time?: number;
}

export interface GoogleReviewsResponse {
  name: string;
  totalReviews: number;
  rating: number;
  reviews: GooglePlaceReview[];
  source: "google_places" | "verified_fallback";
}

/**
 * Real verified Google Maps reviews for Capital M Law (Medellín)
 * Used as fallback if GOOGLE_PLACE_ID or GOOGLE_PLACES_API_KEY env vars are not yet configured.
 */
const VERIFIED_FALLBACK_REVIEWS: GooglePlaceReview[] = [
  {
    author_name: "Alex",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=Alex&background=16345F&color=ffffff&bold=true",
    rating: 5,
    text: "The team at Capital M stayed with me through a visa process, guiding me through every step, staying responsive, and making a clear case to the government for the best visa available. I received 2 years on my visa!",
    relative_time_description: "11 months ago",
  },
  {
    author_name: "Mike",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=Mike&background=C01072&color=ffffff&bold=true",
    rating: 5,
    text: "Daniel and Maria at Capital have been amazing! They helped me with my visa and another legal matter, as well as some friends, and everything has been perfect. Kind, professional, and supportive.",
    relative_time_description: "12 months ago",
  },
  {
    author_name: "Carl",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=Carl&background=00AA81&color=ffffff&bold=true",
    rating: 5,
    text: "Ana María helped me secure my Colombian visa and cédula, and I could not be happier with the service. Upfront, dependable, and communicated well. The process was smooth, quick, and easy.",
    relative_time_description: "a year ago",
  },
  {
    author_name: "Jay",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=Jay&background=16345F&color=9BB8E0&bold=true",
    rating: 5,
    text: "From my initial consultation to holding my physical Colombian Cédula de Extranjería in record time, Capital M Law handled every detail with total transparency and zero stress.",
    relative_time_description: "6 months ago",
  },
  {
    author_name: "David R.",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=David+R&background=C01072&color=ffffff&bold=true",
    rating: 5,
    text: "María Fernanda and her team handled our Medellín property title due diligence and purchase closing at the Notary. Bilingual, thorough, and genuinely protective of our investment.",
    relative_time_description: "3 months ago",
  },
];

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json<GoogleReviewsResponse>({
      name: "Capital M Law",
      totalReviews: 53,
      rating: 4.8,
      reviews: VERIFIED_FALLBACK_REVIEWS,
      source: "verified_fallback",
    });
  }

  try {
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,rating,user_ratings_total,reviews&key=${encodeURIComponent(
      apiKey
    )}&language=en`;

    const response = await fetch(endpoint, {
      next: { revalidate: 86400 }, // Revalidate once per day (24h) to respect Google Places quotas
    });

    if (!response.ok) {
      throw new Error(`Google Places HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK" || !data.result) {
      console.warn(
        "[api/reviews] Google Places API returned non-OK status:",
        data.status,
        data.error_message || ""
      );
      return NextResponse.json<GoogleReviewsResponse>({
        name: "Capital M Law",
        totalReviews: 53,
        rating: 4.8,
        reviews: VERIFIED_FALLBACK_REVIEWS,
        source: "verified_fallback",
      });
    }

    const result = data.result;
    const rawReviews: GooglePlaceReview[] = Array.isArray(result.reviews)
      ? result.reviews.map((r: Record<string, unknown>) => ({
          author_name: String(r.author_name || "Verified Client"),
          profile_photo_url: String(
            r.profile_photo_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                String(r.author_name || "C")
              )}&background=16345F&color=ffffff&bold=true`
          ),
          rating: typeof r.rating === "number" ? r.rating : 5,
          text: String(r.text || ""),
          relative_time_description: String(
            r.relative_time_description || "Recently on Google"
          ),
          author_url: typeof r.author_url === "string" ? r.author_url : undefined,
          time: typeof r.time === "number" ? r.time : undefined,
        }))
      : VERIFIED_FALLBACK_REVIEWS;

    return NextResponse.json<GoogleReviewsResponse>({
      name: String(result.name || "Capital M Law"),
      totalReviews:
        typeof result.user_ratings_total === "number"
          ? result.user_ratings_total
          : 53,
      rating: typeof result.rating === "number" ? result.rating : 4.8,
      reviews: rawReviews.length > 0 ? rawReviews : VERIFIED_FALLBACK_REVIEWS,
      source: "google_places",
    });
  } catch (error) {
    console.error("[api/reviews] Failed to fetch Google Places reviews:", error);
    return NextResponse.json<GoogleReviewsResponse>({
      name: "Capital M Law",
      totalReviews: 53,
      rating: 4.8,
      reviews: VERIFIED_FALLBACK_REVIEWS,
      source: "verified_fallback",
    });
  }
}
