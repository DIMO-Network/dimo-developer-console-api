export interface TokenPurchaseTransaction {
  amount: number;
  wallet: string;
}

export interface RegisterPayment {
  receipt_link: string;
  owner_wallet: string;
  beneficiary_wallet: string;
  amount: number;
}

export interface StripeLinkCreateResponse {
  id: string;
  url: string;
}
