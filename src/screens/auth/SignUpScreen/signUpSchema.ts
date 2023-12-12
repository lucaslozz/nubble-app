import {z} from 'zod';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const signUpSchema = z.object({
  userName: z
    .string()
    .trim()
    .regex(userNameRegex, 'nome de usuário inválido')
    .toLowerCase()
    .trim(),
  fullName: z
    .string()
    .trim()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(value => {
      return value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim();
    }),
  email: z.string().trim().email('email inválido').trim(),
  password: z
    .string()
    .trim()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .trim(),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
