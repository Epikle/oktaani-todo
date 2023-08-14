import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().min(1),
  API_URL: z.string().min(1),
  LS_NAME_SETTINGS: z.string().min(1),
  LS_NAME_COLLECTIONS: z.string().min(1),
  LS_NAME_ITEMS: z.string().min(1),
  LS_NAME_NOTES: z.string().min(1),
});

export default envSchema.parse({
  BASE_URL: import.meta.env.VITE_BASE_URL,
  API_URL: import.meta.env.VITE_API_URL,
  LS_NAME_SETTINGS: import.meta.env.VITE_LS_NAME_SETTINGS,
  LS_NAME_COLLECTIONS: import.meta.env.VITE_LS_NAME_COLLECTIONS,
  LS_NAME_ITEMS: import.meta.env.VITE_LS_NAME_ITEMS,
  LS_NAME_NOTES: import.meta.env.VITE_LS_NAME_NOTES,
});
