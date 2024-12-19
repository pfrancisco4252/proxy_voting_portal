import { v4 as uuidv4 } from 'uuid';

interface StoredSignature {
  id: string;
  controlNumber: string;
  imageData: string;
  timestamp: Date;
  documentId: string;
  hash: string;
  metadata: {
    ipAddress: string;
    userAgent: string;
    geoLocation?: string;
    deviceId?: string;
  };
}

class SignatureStorageService {
  private signatures: Map<string, StoredSignature[]> = new Map();
  
  public async storeSignature(
    controlNumber: string,
    imageData: string,
    documentId: string,
    metadata: StoredSignature['metadata']
  ): Promise<string> {
    const signatureId = uuidv4();
    const hash = await this.generateSignatureHash(imageData);
    
    const signature: StoredSignature = {
      id: signatureId,
      controlNumber,
      imageData,
      timestamp: new Date(),
      documentId,
      hash,
      metadata
    };

    const existingSignatures = this.signatures.get(controlNumber) || [];
    this.signatures.set(controlNumber, [...existingSignatures, signature]);

    return signatureId;
  }

  public async getSignature(signatureId: string): Promise<StoredSignature | null> {
    for (const signatures of this.signatures.values()) {
      const signature = signatures.find(s => s.id === signatureId);
      if (signature) {
        return signature;
      }
    }
    return null;
  }

  public async getSignaturesByControlNumber(controlNumber: string): Promise<StoredSignature[]> {
    return this.signatures.get(controlNumber) || [];
  }

  private async generateSignatureHash(imageData: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(imageData);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

export const signatureStorageService = new SignatureStorageService();
