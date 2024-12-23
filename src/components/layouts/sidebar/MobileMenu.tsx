import MenuLinks from './MenuLinks';
import MenuSearch from '../dashboard-nav/MenuSearch';

type mobileMenuProps = {
    isMenuOpen: boolean;
}

const MobileMenu = ({ isMenuOpen }: mobileMenuProps) => {


    return (
        <div className={`w-80 absolute px-3 backdrop-blur-md min-h-screen py-2 duration-300 origin-left ${isMenuOpen ? "scale-x-100" : "scale-x-0"}`}>
            <MenuSearch />
            <MenuLinks />
        </div>
    );
};

export default MobileMenu;