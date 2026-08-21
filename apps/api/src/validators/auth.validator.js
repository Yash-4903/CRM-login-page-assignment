const { z } = require('zod');

const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be at most 255 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  phone: z
    .string({ required_error: 'Phone is required' })
    .regex(/^[+\-\s\d]{10,20}$/, 'Phone must be at least 10 digits and may contain +, -, spaces'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters'),
  password_confirmation: z
    .string({ required_error: 'Password confirmation is required' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords do not match',
  path: ['password_confirmation'],
});

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

module.exports = { registerSchema, loginSchema };