import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(255, 'Name must be at most 255 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phone: z
      .string()
      .min(1, 'Phone is required')
      .regex(/^[+\-\s\d]{10,20}$/, 'Enter at least 10 digits; +, - and spaces allowed'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(1, 'Please confirm your password'),
    terms: z.boolean().refine((v) => v === true, 'You must agree to the terms'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

export const passwordCriteria = (value) => ({
  length: value.length >= 8,
  uppercase: /[A-Z]/.test(value),
  number: /\d/.test(value),
  special: /[^A-Za-z0-9\s]/.test(value),
});