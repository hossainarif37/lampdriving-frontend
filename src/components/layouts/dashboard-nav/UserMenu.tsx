import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { FC } from 'react';

const UserMenu: FC = () => {
    return (
        <div>
            <Button
                size={"icon"}
                className={`rounded-[4px] text-3xl gap-2 bg-indigo/90 hover:bg-indigo`}>
                <User size={24} />
            </Button>
        </div>
    );
};

export default UserMenu;