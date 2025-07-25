import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "@mui/material/Button";
import { yellow, red } from "@mui/material/colors";
import { scroller } from "react-scroll";
import logo from "../../../../src/assets/images/Surasa Logo.png";
import { logoutUser } from "../../../redux/actions";
import UserRequest from "../../../services/Requests/User";
import "./NavBar.css";
import PersonIcon from '@mui/icons-material/Person';


const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.token !== null);

    const handleLogout = async () => {
        try {
            const result = await UserRequest.logoutUser();
            if (!result) {
                console.error("logoutUser() returned nothing.");
                return;
            }

            const { success, message } = result;

            if (success) {
                localStorage.clear();
                setUserInfo(null);
                dispatch(logoutUser());
                window.location.replace("/login");
            } else {
                console.error("Logout failed:", message);
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("first_name");
        setUserInfo(storedUserInfo);
    }, [isLoggedIn]);

    const renderNavLink = (to, label) =>
        location.pathname === "/" ? (
            <ScrollLink
                className="dropdown-link"
                activeClass="active"
                to={to}
                spy
                smooth
                offset={-70}
                duration={500}
            >
                {label}
            </ScrollLink>
        ) : (
            <Link to={`/#${to}`} className="dropdown-link">
                {label}
            </Link>
        );

    const handleProfileClick = () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            navigate(`/user/${userId}/dashboard`);
        } else {
            console.error("User ID not found in localStorage");
            navigate("/login");
        }
    };

    const UserActions = () =>
        userInfo ? (
            <>
                {/* <span>Welcome back, {userInfo}</span> */}
                <PersonIcon
                    onClick={handleProfileClick}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                />
                <Button
                    disableElevation
                    variant="outlined"
                    sx={{
                        borderColor: red[500],
                        color: "black",
                        bgcolor: red[500],
                        "&:hover": {
                            bgcolor: red[700],
                            borderColor: red[700],
                            color: "white",
                        },
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </>
        ) : (
            <>

                <Button
                    disableElevation
                    variant="contained"
                    onClick={() => navigate("/register")}
                    sx={{
                        bgcolor: yellow[700],
                        borderColor: yellow[800],
                        "&:hover": {
                            bgcolor: "transparent",
                            borderColor: yellow[600],
                            color: yellow[800],
                        },
                    }}
                >
                    Register
                </Button>
                <Button
                    disableElevation
                    variant="outlined"
                    sx={{
                        borderColor: yellow[700],
                        color: yellow[700],
                        "&:hover": {
                            bgcolor: yellow[700],
                            color: "white",
                            borderColor: yellow[700]
                        },
                    }}
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
            </>
        );

    const handleScrollOrNavigate = (id) => {
        if (location.pathname === "/") {
            scroller.scrollTo(id, {
                smooth: true,
                duration: 500,
                offset: -70,
            });
        } else {
            navigate("/", { state: { scrollToId: id } });
        }
    };

    return (
        <div
            className={`bg-NavBarBG ${isScrolled
                ? "fixed top-0 left-0 w-full z-50 bg-white opacity-75"
                : "top-0 left-0 w-full"
                }`}
        >
            <nav className="flex justify-between items-center w-full h-[60px] px-[12px] md:px-[20px]">
                <div onClick={() => handleScrollOrNavigate("home")} className="cursor-pointer">
                    <img className="h-[50px] w-[50px]" src={logo} alt="Surasa Logo" />
                </div>


                <ul className="hidden lg:flex ml-24 space-x-4">
                    <li>{renderNavLink("home", "Home")}</li>
                    <li>{renderNavLink("about", "About Us")}</li>
                    <li>{renderNavLink("contact", "Contact Us")}</li>
                </ul>

                <div className="hidden lg:flex items-center space-x-4">
                    <UserActions />
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden z-50">
                    <GiHamburgerMenu size={30} onClick={toggleDropdown} />
                    {showDropdown && (
                        <div className="absolute top-[60px] right-0 bg-amber-50 shadow-md p-6 w-full">
                            <ul className="flex flex-col space-y-2 items-center">
                                {userInfo && (
                                    <>
                                        {/* <li>Welcome back, {userInfo}</li> */}
                                        <li
                                            className="profile-button cursor-pointer text-blue-600"
                                            onClick={handleProfileClick}
                                        >
                                            Profile
                                        </li>

                                        <li
                                            className="logout-button cursor-pointer text-red-600"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </li>
                                    </>
                                )}
                                <li>{renderNavLink("home", "Home")}</li>
                                <li>{renderNavLink("about", "About Us")}</li>
                                <li>{renderNavLink("contact", "Contact Us")}</li>
                                {!userInfo && (
                                    <>
                                        <Button
                                            disableElevation
                                            variant="contained"
                                            onClick={() => navigate("/register")}
                                            sx={{
                                                bgcolor: yellow[700],
                                                "&:hover": {
                                                    bgcolor: "transparent",
                                                    borderColor: yellow[800],
                                                    color: yellow[800],
                                                },
                                            }}
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant="outlined"
                                            sx={{
                                                borderColor: yellow[700],
                                                color: yellow[700],
                                                "&:hover": {
                                                    bgcolor: yellow[700],
                                                    color: "white",
                                                },
                                            }}
                                            onClick={() => navigate("/login")}
                                        >
                                            Login
                                        </Button>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
