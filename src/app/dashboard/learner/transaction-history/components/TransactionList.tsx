import React from 'react';
import TransactionCard from './TransactionCard';

interface Transaction {
    _id: string;
    transactionId: string;
    amount: number;
    method: string;
    status: string;
    createdAt: string;
    type: string;
}

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    return (
        <div className="space-y-4">
            {transactions.map((transaction) => (
                <TransactionCard
                    key={transaction._id}
                    transactionId={transaction.transactionId}
                    amount={transaction.amount}
                    method={transaction.method}
                    status={transaction.status}
                    createdAt={transaction.createdAt}
                    type={transaction.type}
                />
            ))}
        </div>
    );
}

export default TransactionList;