import { groq } from "next-sanity";

// minimal shape matching your current page
export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    note,
    client,
    role,
    format,
    location,
    year,
    problem,
    description,
    result,
    videoUrl,
    images,
    featured,
    order
  }
`;

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
    images
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    note,
    client,
    role,
    format,
    location,
    year,
    problem,
    description,
    result,
    videoUrl,
    images,
    featured,
    order
  }
`;
