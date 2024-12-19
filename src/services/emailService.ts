import { Ballot, VoteItem } from '../types/Vote';
import { receiptGenerator } from './receiptGenerator';

export class EmailService {
  private async generateEmailContent(vote: VoteItem, ballot: Ballot): Promise<string> {
    const receiptHtml = await receiptGenerator.generateHTML(vote, ballot);
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Your Vote Has Been Recorded</h1>
        <p>Thank you for participating in the vote for: <strong>${vote.title}</strong></p>
        <div style="margin: 20px 0;">
          <p><strong>Your Decision:</strong> ${ballot.decision}</p>
          <p><strong>Voting Power:</strong> ${ballot.votingPower.toLocaleString()} shares</p>
          <p><strong>Time:</strong> ${ballot.timestamp.toLocaleString()}</p>
        </div>
        <p>A receipt of your vote is attached to this email.</p>
        <div style="margin-top: 20px; padding: 20px; background-color: #f5f5f5;">
          <p style="margin: 0; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `;
  }

  async sendVoteConfirmation(
    email: string,
    vote: VoteItem,
    ballot: Ballot
  ): Promise<void> {
    try {
      const emailContent = await this.generateEmailContent(vote, ballot);
      const receipt = await receiptGenerator.generatePDF(vote, ballot);

      // In a real implementation, this would use an email service provider
      console.log('Sending email to:', email);
      console.log('Email content:', emailContent);
      console.log('Receipt attached:', receipt);

    } catch (error) {
      console.error('Error sending vote confirmation email:', error);
      throw new Error('Failed to send vote confirmation email');
    }
  }

  async sendVoteResults(
    email: string,
    vote: VoteItem
  ): Promise<void> {
    if (!vote.results) return;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Voting Results: ${vote.title}</h1>
        <div style="margin: 20px 0;">
          <p><strong>Total Votes:</strong> ${vote.results.totalVotes.toLocaleString()}</p>
          <p><strong>Results:</strong></p>
          <ul>
            <li>For: ${vote.results.percentages.FOR.toFixed(2)}%</li>
            <li>Against: ${vote.results.percentages.AGAINST.toFixed(2)}%</li>
            <li>Abstain: ${vote.results.percentages.ABSTAIN.toFixed(2)}%</li>
          </ul>
        </div>
        <p>Thank you for participating in this vote.</p>
      </div>
    `;

    // In a real implementation, this would use an email service provider
    console.log('Sending results email to:', email);
    console.log('Email content:', emailContent);
  }
}

export const emailService = new EmailService();
