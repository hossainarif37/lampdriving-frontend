import Navbar from "./navbar/Navbar";
import Topbar from "./topbar/Topbar";

const Header = () => {
    return (
        <header className="bg-light-green text-center">
            <div>
                <Topbar />
                <Navbar />
            </div>
        </header>
    );
};

export default Header;