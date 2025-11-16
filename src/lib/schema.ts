import { z } from "zod";

export const mediaTypeEnum = z.enum(["video", "gallery"]);

export const projectSchema = z.object({
  id: z.string(), // Notion page ID
  slug: z.string().min(1),
  title: z.string().min(1),
  client: z.string().optional(),
  role: z.string().optional(),
  format: z.string().optional(),
  location: z.string().optional(),
  year: z.number().int().optional(),
  // main copy blocks
  description: z.string().min(1),
  contribution: z.string().optional(),
  impact: z.string().optional(),
  // problem / result (for your case-study sidebar)
  problem: z.string().optional(),
  result: z.string().optional(),
  // media
  mediaType: mediaTypeEnum,
  videoUrl: z.string().url().optional(),
  mediaUrls: z.array(z.string().url()).optional(),
  // meta
  featured: z.boolean().default(false),
  order: z.number().int().optional(),
});

export type Project = z.infer<typeof projectSchema>;
