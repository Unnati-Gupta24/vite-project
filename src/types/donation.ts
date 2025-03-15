export interface DonationOpportunity {
  id: string;
  title: string;
  summary: string;
  cause: string;
  location: string;
  proofType: string;
  detailedDescription: string;
  proofUrls: string[];
  recipientAddress: string;
  amountRaised: string;
  goal: string;
  createdAt: number;
}

export interface Recipient {
  address: string;
  title: string;
  summary: string;
  impactDescription: string;
  kycStatus: "pending" | "verified" | "rejected";
  proofOfWork: string[];
  cryptoAddress: string;
}

export interface Donor {
  address: string;
  preferences?: {
    causes: string[];
    locations: string[];
    showActiveOnly: boolean;
  };
  donations: {
    opportunityId: string;
    amount: string;
    timestamp: number;
  }[];
}
