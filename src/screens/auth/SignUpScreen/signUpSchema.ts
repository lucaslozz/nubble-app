import {z} from 'zod';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const signUpSchema = z.object({
  userName: z
    .string()
    .regex(userNameRegex, 'nome de usuário inválido')
    .toLowerCase()
    .trim(),
  fullName: z
    .string()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(value => {
      return value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim();
    }),
  email: z.string().email('email inválido').trim(),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres').trim(),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
