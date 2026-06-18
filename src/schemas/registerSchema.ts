import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Min. 3 znaki').max(20, 'Max. 20 znaków'),
  email: z.string().email('Niepoprawny format email'),
  password: z.string()
    .min(8, 'Min. 8 znaków')
    .regex(/[A-Z]/, 'Musi mieć wielką literę')
    .regex(/[0-9]/, 'Musi mieć cyfrę'),
});

export type RegisterData = z.infer<typeof registerSchema>;