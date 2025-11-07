import { BankTransaction } from '../dojo/state';

export const BANK_DATA: BankTransaction[] = [
  {
    id: "TRN001",
    date: "2025-10-23",
    description: "Payment from Acme Corp",
    amount: 1200.00,
    matched: false,
    matchedWith: undefined
  },
  {
    id: "TRN002",
    date: "2025-10-22",
    description: "Staples",
    amount: 75.50,
    matched: false,
    matchedWith: undefined
  },
  {
    id: "TRN003",
    date: "2025-10-19",
    description: "Adobe Inc.",
    amount: 50.00,
    matched: false,
    matchedWith: undefined
  },
  {
    id: "TRN004",
    date: "2025-10-20",
    description: "Deposit - Beta LLC",
    amount: 500.00,
    matched: false,
    matchedWith: undefined
  }
];
