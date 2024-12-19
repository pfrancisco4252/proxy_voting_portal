import { Ballot } from '../types/Vote';

export class DigitalSignatureService {
  private async generateSignatureData(ballot: Ballot): Promise<string> {
    const data = {
      ballotId: ballot.id,
      voteId: ballot.voteId,
      shareholderId: ballot.shareholderId,
      decision: ballot.decision,
      votingPower: ballot.votingPower,
      timestamp: ballot.timestamp.toISOString()
    };

    // Convert the data to a string
    const dataString = JSON.stringify(data);

    // Create a hash of the data
    const encoder = new TextEncoder();
    const data_buffer = encoder.encode(dataString);
    const hash_buffer = await crypto.subtle.digest('SHA-256', data_buffer);
    const hash_array = Array.from(new Uint8Array(hash_buffer));
    const hash_hex = hash_array.map(b => b.toString(16).padStart(2, '0')).join('');

    return hash_hex;
  }

  async signBallot(ballot: Ballot): Promise<string> {
    try {
      const signature = await this.generateSignatureData(ballot);
      return signature;
    } catch (error) {
      console.error('Error signing ballot:', error);
      throw new Error('Failed to sign ballot');
    }
  }

  async verifySignature(ballot: Ballot, signature: string): Promise<boolean> {
    try {
      const expectedSignature = await this.generateSignatureData(ballot);
      return expectedSignature === signature;
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  }
}

export const digitalSignatureService = new DigitalSignatureService();
