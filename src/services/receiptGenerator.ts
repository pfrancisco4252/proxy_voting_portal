import { Ballot, VoteItem } from '../types/Vote';
import { formatDate } from '../utils/dateUtils';

export class ReceiptGenerator {
  async generatePDF(vote: VoteItem, ballot: Ballot): Promise<Blob> {
    // In a real implementation, you would use a PDF library like pdfmake or jsPDF
    // This is a simplified example that creates a text-based receipt
    const receiptContent = `
VOTE RECEIPT
-----------

Vote ID: ${ballot.id}
Proposal: ${vote.title}
Decision: ${ballot.decision}
Voting Power: ${ballot.votingPower.toLocaleString()} shares
Timestamp: ${formatDate(ballot.timestamp)}

Digital Signature:
${ballot.signature}

This is an official record of your vote.
    `.trim();

    // Convert the text content to a Blob
    return new Blob([receiptContent], { type: 'text/plain' });
  }

  async generateHTML(vote: VoteItem, ballot: Ballot): Promise<string> {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vote Receipt - ${vote.title}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .receipt-box { border: 1px solid #ccc; padding: 20px; border-radius: 5px; }
            .signature { font-family: monospace; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Vote Receipt</h1>
            <p>This document serves as official confirmation of your vote.</p>
          </div>
          <div class="receipt-box">
            <h2>${vote.title}</h2>
            <p><strong>Vote ID:</strong> ${ballot.id}</p>
            <p><strong>Decision:</strong> ${ballot.decision}</p>
            <p><strong>Voting Power:</strong> ${ballot.votingPower.toLocaleString()} shares</p>
            <p><strong>Timestamp:</strong> ${formatDate(ballot.timestamp)}</p>
            <div class="signature">
              <h3>Digital Signature</h3>
              <p>${ballot.signature}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  downloadReceipt(vote: VoteItem, ballot: Ballot): void {
    this.generatePDF(vote, ballot)
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vote-receipt-${ballot.id}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error generating receipt:', error);
        throw new Error('Failed to generate receipt');
      });
  }
}

export const receiptGenerator = new ReceiptGenerator();
