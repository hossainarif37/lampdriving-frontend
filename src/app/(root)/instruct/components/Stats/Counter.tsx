import { FC } from 'react';
import CounterCard from './CounterCard';
import { BookOpen, Clock, Trophy, Users } from 'lucide-react';

const Counter: FC = () => {
    return (
        <div className="px-4 py-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mx-auto">
                <CounterCard
                    icon={<Users className="h-8 w-8 text-secondary" />}
                    count={100000}
                    label="Active Learners"
                    suffix="+"
                />
                <CounterCard
                    icon={<Clock className="h-8 w-8 text-secondary" />}
                    count={48}
                    label="Verification Time"
                    suffix="h"
                />
                <CounterCard
                    icon={<BookOpen className="h-8 w-8 text-secondary" />}
                    count={1000}
                    label="Training Materials"
                    suffix="+"
                />
                <CounterCard
                    icon={<Trophy className="h-8 w-8 text-secondary" />}
                    count={95}
                    label="Success Rate"
                    suffix="%"
                />
            </div>
        </div>
    );
};

export default Counter;