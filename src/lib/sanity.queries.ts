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
    images[],
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
    "audioFileUrls": audioFiles[].asset->url,
    "audioFileLabels": audioFiles[].title,
    images[],
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