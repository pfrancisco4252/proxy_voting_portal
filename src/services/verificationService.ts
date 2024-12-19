import { v4 as uuidv4 } from 'uuid';

interface ShareholderVerification {
  controlNumber: string;
  email: string;
  companyId: string;
  isVerified: boolean;
  verificationAttempts: number;
  lastAttemptTime?: Date;
}

interface SignatureVerification {
  id: string;
  controlNumber: string;
  signature: string;
  timestamp: Date;
  documentId: string;
  ipAddress: string;
  userAgent: string;
}

class VerificationService {
  private verifications: Map<string, ShareholderVerification> = new Map();
  private signatures: Map<string, SignatureVerification[]> = new Map();
  private readonly MAX_ATTEMPTS = 3;
  private readonly LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

  public async verifyControlNumber(
    controlNumber: string,
    email: string,
    companyId: string
  ): Promise<boolean> {
    const verification = this.verifications.get(controlNumber);

    if (!verification) {
      return false;
    }

    if (verification.isVerified) {
      return verification.email === email && verification.companyId === companyId;
    }

    if (this.isLockedOut(verification)) {
      throw new Error('Too many attempts. Please try again later.');
    }

    const isValid = verification.email === email && verification.companyId === companyId;

    if (!isValid) {
      this.recordFailedAttempt(verification);
    } else {
      verification.isVerified = true;
    }

    return isValid;
  }

  public registerControlNumber(
    controlNumber: string,
    email: string,
    companyId: string
  ): void {
    if (this.verifications.has(controlNumber)) {
      throw new Error('Control number already registered');
    }

    this.verifications.set(controlNumber, {
      controlNumber,
      email,
      companyId,
      isVerified: false,
      verificationAttempts: 0
    });
  }

  public async verifySignature(
    controlNumber: string,
    signature: string,
    documentId: string
  ): Promise<SignatureVerification> {
    const verification = this.verifications.get(controlNumber);
    
    if (!verification || !verification.isVerified) {
      throw new Error('Invalid control number or unverified shareholder');
    }

    const signatureVerification: SignatureVerification = {
      id: uuidv4(),
      controlNumber,
      signature,
      timestamp: new Date(),
      documentId,
      ipAddress: this.getClientIP(),
      userAgent: this.getClientUserAgent()
    };

    const shareholderSignatures = this.signatures.get(controlNumber) || [];
    this.signatures.set(controlNumber, [...shareholderSignatures, signatureVerification]);

    return signatureVerification;
  }

  public getSignatureHistory(controlNumber: string): SignatureVerification[] {
    return this.signatures.get(controlNumber) || [];
  }

  private isLockedOut(verification: ShareholderVerification): boolean {
    if (verification.verificationAttempts >= this.MAX_ATTEMPTS && verification.lastAttemptTime) {
      const timeSinceLastAttempt = Date.now() - verification.lastAttemptTime.getTime();
      return timeSinceLastAttempt < this.LOCKOUT_DURATION;
    }
    return false;
  }

  private recordFailedAttempt(verification: ShareholderVerification): void {
    verification.verificationAttempts += 1;
    verification.lastAttemptTime = new Date();
  }

  private getClientIP(): string {
    // In a real implementation, this would get the client's IP
    return '0.0.0.0';
  }

  private getClientUserAgent(): string {
    // In a real implementation, this would get the client's user agent
    return navigator.userAgent;
  }
}

export const verificationService = new VerificationService();
