import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('email inválido'),
  password: z.string().trim().min(1, 'senha obrigatória'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
