import { createClient } from "next-sanity";
import { getTodayDateString } from "../utils/getCurrentDate";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: getTodayDateString(),
  useCdn: false,
  withCredentials: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
