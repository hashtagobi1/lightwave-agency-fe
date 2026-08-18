// src/lib/sanity.queries.ts
import { groq } from "next-sanity";

// Single project by slug – used on /projects/[slug]
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    client,
    note,
    role,
    format,
    location,
    year,
    description,
    problem,
    result,
    videoUrl,
    featured,
    "videoFileUrls": videoFiles[].asset->url,
    "audioFileUrls": audioFiles[].asset->url,
    "audioFileLabels": audioFiles[].title,
    images[]{
      _key,
      "url": asset->url,
      asset
    },
  }
`;
// All projects – used on /projects and homepage

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    client,
    note,
    role,
    format,
    location,
    year,
    problem,
    result,
    videoUrl,
    featured,
    "slug": slug.current,
    "videoFileUrls": videoFiles[].asset->url,
    "audioFileUrls": audioFiles[].file.asset->url,
    "audioFileLabels": audioFiles[].label,
    images[]{
      _key,
      "url": asset->url,
      asset
    },
  }
`;

// Featured projects – e.g. for homepage selected work
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true]
  | order(order asc, year desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    note,
    client,
    result,
    videoUrl,
    images[],
  }
`;

// Single event by slug – used on /events/[slug]
export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    note,
    format,
    venue,
    date,
    ticketUrl,
    about,
    recap,
    impact,
    stats,
    featured,
    heroVideo,
    "heroImageUrl": heroImage.asset->url,
    "videoFileUrls": videoFiles[].asset->url,
    "partners": partners[]->{ _id, name, url, "logoUrl": logo.asset->url },
    images[]{
      _key,
      "url": asset->url,
      asset
    },
  }
`;

// All events – used on /events and homepage
export const allEventsQuery = groq`
  *[_type == "event"] | order(order asc, date desc) {
    _id,
    title,
    note,
    format,
    venue,
    date,
    ticketUrl,
    about,
    recap,
    impact,
    stats,
    featured,
    "slug": slug.current,
    heroVideo,
    "heroImageUrl": heroImage.asset->url,
    "videoFileUrls": videoFiles[].asset->url,
    "partners": partners[]->{ _id, name, url, "logoUrl": logo.asset->url },
    images[]{
      _key,
      "url": asset->url,
      asset
    },
  }
`;

// Featured events – e.g. for homepage "Recent events"
export const featuredEventsQuery = groq`
  *[_type == "event" && featured == true]
  | order(order asc, date desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    note,
    venue,
    date,
    impact,
    heroVideo,
    "heroImageUrl": heroImage.asset->url,
    images[]{
      _key,
      "url": asset->url,
      asset
    },
  }
`;

// Brands / partners – for the Partners wall
export const allBrandsQuery = groq`
  *[_type == "brand"] | order(order asc, _createdAt desc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    url
  }
`;

// Team – for the "Team" section
export const allTeamQuery = groq`
  *[_type == "team"] | order(order asc, _createdAt asc) {
    _id,
    name,
    title,
    description,
    "photoUrl": profilePic.asset->url,
  }
`;
