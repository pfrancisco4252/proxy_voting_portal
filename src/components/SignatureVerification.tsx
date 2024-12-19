import React, { useState } from 'react';
import SignatureCanvas from './SignatureCanvas';
import { verificationService } from '../services/verificationService';

interface SignatureVerificationProps {
  controlNumber: string;
  documentId: string;
  onSignatureComplete: (signatureId: string) => void;
}

const SignatureVerification: React.FC<SignatureVerificationProps> = ({
  controlNumber,
  documentId,
  onSignatureComplete
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSignature = async (signature: string) => {
    setError(null);
    setIsVerifying(true);

    try {
      const verification = await verificationService.verifySignature(
        controlNumber,
        signature,
        documentId
      );
      onSignatureComplete(verification.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signature verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm text-gray-600">
          Please sign below to confirm your vote. This signature will be recorded
          with your voting decision.
        </p>
      </div>

      <SignatureCanvas
        onSignatureComplete={handleSignature}
        userId={controlNumber}
        documentId={documentId}
      />

      {error && (
        <div className="text-red-600 text-sm p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {isVerifying && (
        <div className="text-indigo-600 text-sm p-2 bg-indigo-50 rounded-md">
          Verifying signature...
        </div>
      )}
    </div>
  );
};

export default SignatureVerification;
