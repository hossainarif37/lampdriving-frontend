import MenuLinks from './MenuLinks';

type mobileMenuProps = {
    isMenuOpen: boolean;
}

const MobileMenu = ({ isMenuOpen }: mobileMenuProps) => {


    return (
        <div className={`w-80 absolute px-3 bg-seconderyCol min-h-screen duration-300 origin-left ${isMenuOpen ? "scale-x-100" : "scale-x-0"}`}>
            <MenuLinks />
        </div>
    );
};

export default MobileMenu;