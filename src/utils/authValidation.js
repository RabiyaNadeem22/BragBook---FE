import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long')
  .regex(/[A-Za-z]/, 'Password must include at least one letter')
  .regex(/[0-9]/, 'Password must include at least one number');

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().trim().email('Enter a valid email address'),
    jobTitle: z.string().trim().max(100).optional(),
    company: z.string().trim().max(100).optional(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  jobTitle: z.string().trim().max(100).optional(),
  company: z.string().trim().max(100).optional(),
  bio: z.string().trim().max(500, 'Bio cannot exceed 500 characters').optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export function applyApiFieldErrors(error, setError) {
  if (!error?.errors || !Array.isArray(error.errors)) return;
  error.errors.forEach((item) => {
    if (item.field) {
      setError(item.field, { type: 'server', message: item.message });
    }
  });
}

export const DEMO_ACCOUNT = {
  email: 'alex.rivera@example.com',
  password: 'Password123!',
};
