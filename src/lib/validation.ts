import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name must be under 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be under 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be under 255 characters'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s\-()]{0,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(5000, 'Message must be under 5000 characters'),
  category: z.enum(['residential', 'commercial', 'other']).default('other'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validate contact form data and return errors
export function validateContactForm(data: unknown): { success: true; data: ContactFormData } | { success: false; errors: Record<string, string> } {
  const result = contactFormSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    if (err.path[0]) {
      errors[err.path[0] as string] = err.message;
    }
  });
  
  return { success: false, errors };
}
