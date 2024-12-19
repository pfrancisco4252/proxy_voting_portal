export interface User {
  id: string;
  email: string;
  password: string;
  controlNumber?: string;
  name?: string;
  companyId: string;
  isAdmin: boolean;
  isVerified: boolean;
  digitalSignature?: string;
}
