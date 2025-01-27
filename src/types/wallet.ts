import { IInstructor } from "./instructor";
import { IPayment } from "./payment";

export interface IBalance {
    currentBalance: number;
    pendingBalance: number;
    totalWithdraw: number;
    totalEarnings: number;
}

// bank account interface
export interface IBankAccount {
    payId: string;
}

export interface IWallet {
    _id: string;
    balance: IBalance;
    bankAccount: IBankAccount;
    instructor: string | IInstructor;
    transactions: string[] | IPayment[];
}