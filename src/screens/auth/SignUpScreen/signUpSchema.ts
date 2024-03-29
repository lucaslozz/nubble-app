import {stringUtils} from '@utils';
import {z} from 'zod';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,29}$/gim;

export const signUpSchema = z.object({
  username: z
    .string()
    .min(5, 'Nome de usuário muito curto')
    .regex(userNameRegex, 'Nome de usuário inválido.')
    .toLowerCase(),
  firstName: z
    .string()
    .trim()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(stringUtils.captalizeFirstLetter),
  lastName: z
    .string()
    .trim()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(stringUtils.captalizeFirstLetter),
  email: z.string().trim().email('email inválido').trim(),
  password: z
    .string()
    .trim()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .trim(),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
