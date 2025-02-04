import type { Users } from '@prisma/client';

export type AuthUser = Pick<Users, 'id' | 'user_name' | 'email'>;