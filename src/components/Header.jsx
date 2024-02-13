import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import logo from "../images/logo.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { loading, mobileMenu, setMobileMenu, toggleTheme, theme } = useContext(Context);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    
    const logoSpring = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    
    const textSpring = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 300, 
    });

    return (
        <animated.div
            className={`sticky z-10 flex flex-row items-center py-10 border-b-2 border-black justify-between h-14 px-4 md:px-5 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            }`}
            style={logoSpring}
        >
            {loading && <Loader />}
            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className={`text-${theme === 'dark' ? 'white' : 'black'} text-xl`} />
                        ) : (
                            <SlMenu className={`text-${theme === 'dark' ? 'white' : 'black'} text-xl`} />
                        )}

                    </div>
                )}
                <Link to="/" className="md:flex ml-2 md:h-5 items-center">
                    <animated.img
                        className="md:h-14 md:w-16 h-14 w-16 ml-2"
                        src={logo}
                        alt=""
                        style={logoSpring}
                    />
                    <animated.h1
                        className={`md:flex hidden font-medium md:text-lg text-xs md:border-l-2 md:my-6 md:pl-4 md:border-red-700 ${
                            theme === "dark" ? "text-white" : "text-black"
                        }`}
                        style={textSpring}
                    >
                        Video Diaries
                    </animated.h1>
                </Link>
            </div>
            <div className="group flex items-center">
                <div className={`flex h-8 md:w-[550px] w-20 md:h-10 md:ml-10 ml-6 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className={`text-xl ${theme === 'dark' ? 'text-red-500' : 'text-black'}`} />
                    </div>
                    <input
                        type="text"
                        className={`bg-transparent outline-none pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px] ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className={`w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl ${theme === 'dark' ? 'bg-white/[0.1] text-white' : 'bg-black/[0.1] text-black'}`}
                    onClick={() => searchQueryHandler("searchButton")}
                    aria-label="Search"
                >
                    <IoIosSearch className={`text-xl ${theme === 'dark' ? 'text-red-500' : 'text-black'}`} />
                </button>
            </div>
            <div className="flex items-center md:pr-10 pr-2">
                <div className="flex ">
                    <button
                        className={`mx-3 mt-1 md:mr-4 mr-8 h-8 w-8 rounded-full ${theme === 'dark' ? ' dark:bg-gray-700' : ' dark:bg-gray-300'} `}
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? "🌞" : "🌙"}
                    </button>
                    <div className={`md:flex hidden items-center justify-center h-10 w-10 rounded-full ${theme === 'dark' ? '' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                        <RiVideoAddLine className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`} />
                    </div>
                    <div className={`md:flex hidden items-center justify-center ml-2 h-10 w-10 rounded-full ${theme === 'dark' ? '' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                        <FiBell className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`} />
                    </div>
                </div>
                
                <FaCircleUser className="h-5 w-5 md:ml-4" />
                
            </div>
        </animated.div>
    );
};

export default Header;
