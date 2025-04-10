'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(50),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(500),
  target: z.enum(['STARTUP', 'JOB', 'LEARNING', 'OTHERS']),
  language: z.enum(['SPANISH', 'ENGLISH', 'FRENCH', 'DEUTSCHE', 'CHINESE']),
  schedule: z.enum(['MORNINGS', 'AFTERNOON', 'WEEKENDS', 'NIGHTS', 'ANY']),
  creatorRole: z.string().min(1, { message: 'You must select your role' }),
  roles: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }),
});

export type FormState = {
  errors?: {
    name?: string[];
    description?: string[];
    target?: string[];
    language?: string[];
    schedule?: string[];
    creatorRole?: string[];
    roles?: string[];
    _form?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function createGroup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Extract and validate form data
  const validatedFields = {
    name: formData.get('name'),
    description: formData.get('description'),
    target: formData.get('target'),
    language: formData.get('language'),
    schedule: formData.get('schedule'),
    creatorRole: formData.get('creatorRole'),
    roles: formData.get('roles'),
  };

  // Validate with zod
  const result = formSchema.safeParse(validatedFields);

  // If validation fails, return errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: 'Please fix the errors in the form.',
    };
  }

  // Get the validated data
  const data = result.data;

  // Validate roles count
  const roles = data.roles;
  const totalRoles = roles.reduce(
    (acc: number, role: any) => acc + role.count,
    0
  );

  if (totalRoles < 2 || totalRoles > 8) {
    return {
      errors: {
        roles: ['You must select between 2 and 8 roles in total'],
      },
      message: 'Please fix the errors in the form.',
    };
  }

  // Check if creator role is valid
  const availableRoles = roles
    .filter((role: any) => role.count > 0)
    .map((role: any) => role.id);
  if (!availableRoles.includes(data.creatorRole)) {
    return {
      errors: {
        creatorRole: ['You must select a valid role'],
      },
      message: 'Please fix the errors in the form.',
    };
  }

  // Here you would save the data to your database
  console.log('Form data:', data);

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return success
  return {
    message: 'Group created successfully!',
    success: true,
  };
}
