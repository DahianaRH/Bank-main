export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
}

export interface NewCustomer {
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
}

export interface Transaction {
  id: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  timestamp: string;
}

export interface TransferRequest {
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
}
