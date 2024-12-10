import Navbar from "./navbar/Navbar";
import Topbar from "./topbar/Topbar";

const Header = () => {
    return (
        <header className="bg-slate-100 text-center py-4">
            <div className="wrapper">
                <Topbar />
                <Navbar />
            </div>
        </header>
    );
};

export default Header;