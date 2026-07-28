import 'dotenv/config'
import { z } from 'zod'

export const env = z.object({
  BASE_URL_API: z.string(),
  LOGIN_DATA: z.string()
}).parse(process.env)