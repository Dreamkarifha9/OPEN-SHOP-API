import type { users } from '@prisma/client';

export type AuthUser = Pick<users, 'id' | 'user_name' | 'email'>;