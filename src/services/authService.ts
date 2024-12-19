import { User } from '../types/User';

const ADMIN_EMAIL = 'dackerly@lionessconsultingllc.com';
const ADMIN_PASSWORD = 'Li0nr0@r2025!';

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      id: 'admin',
      email: ADMIN_EMAIL,
      password: '',
      isAdmin: true,
      isVerified: true,
      companyId: 'admin'
    };
  }

  // TODO: Implement regular user authentication
  return null;
};

export const sendVerificationEmail = async (email: string): Promise<void> => {
  // TODO: Implement email verification
  console.log(`Verification email sent to ${email}`);
};

export const verifyEmail = async (token: string): Promise<boolean> => {
  // TODO: Implement email verification
  return true;
};
