import { z } from 'zod';

const envSchema = z.object({
  LS_NAME_TODOS: z.string().min(1),
  API_URL: z.string().min(1),
});

export default envSchema.parse({
  LS_NAME_TODOS: import.meta.env.VITE_LS_NAME_TODOS,
  API_URL: import.meta.env.VITE_API_URL,
});
