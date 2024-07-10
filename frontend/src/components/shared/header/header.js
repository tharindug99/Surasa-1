import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../../../../src/assets/images/Surasa Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { yellow } from "@mui/material/colors";

const Header = (props) => {
  const { items } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user-info");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <>
      <div
        className={`bg-NavBarBG ${
          isScrolled
            ? "fixed top-0 left-0 w-full z-50 bg-white"
            : "top-0 left-0 w-full"
        }`}
      >
        <nav className="flex justify-between items-center w-full h-20 px-4 md:px-8">
          {/* Logo */}
          <div className="flex">
            <img className="h-[5rem] w-[5rem]" src={logo} alt="Surasa Logo" />
          </div>
          {/* Navigation Links */}
          <ul className="hidden lg:flex ml-24 space-x-4">
            <li>
              <ScrollLink
                className="dropdown-link"
                activeclass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                className="dropdown-link"
                activeclass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                About Us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                className="dropdown-link"
                activeclass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Contact Us
              </ScrollLink>
            </li>
          </ul>
          {/* Index and Login Buttons */}
          {userInfo ? (
            <div className="hidden lg:flex md:flex items-center space-x-4">
              <span>Welcome back, {userInfo.full_name}</span>
              <button
                className="logout-button"
                onClick={() => {
                  localStorage.removeItem("user-info");
                  setUserInfo(null);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex md:flex space-x-4">
              <Button
                disableElevation
                variant="contained"
                onClick={() => navigate("/register")}
                sx={{
                  bgcolor: yellow[700],
                  "&:hover": {
                    bgcolor: "transparent",
                    borderWidth: 2,
                    borderColor: yellow[800],
                    color: yellow[800],
                  },
                }}
              >
                {" "}
                Register
              </Button>
              <Button
                disableElevation
                variant="outlined"
                sx={{
                  borderColor: yellow[700],
                  color: yellow[700],
                  "&:hover": {
                    borderColor: yellow[800],
                    color: "white",
                    bgcolor: yellow[700],
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          )}
          {/* Hamburger Menu for Small Screens */}
          <div className="lg:hidden">
            <GiHamburgerMenu size={40} onClick={toggleDropdown} />
            {/* Dropdown menu for small screens */}
            {showDropdown && (
              <div className="absolute top-16 right-0 bg-white shadow-md p-6 w-full">
                <ul className="flex flex-col space-y-2 items-center">
                  {userInfo && (
                    <>
                      <li>Welcome back, {userInfo.full_name}</li>
                      <li
                        className="logout-button"
                        onClick={() => {
                          localStorage.removeItem("user-info");
                          setUserInfo(null);
                        }}
                      >
                        Logout
                      </li>
                    </>
                  )}
                  {/* Dropdown items with hover effect */}
                  <li>
                    <ScrollLink
                      className="dropdown-link"
                      activeclass="active"
                      to="home"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      Home
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink
                      className="dropdown-link"
                      activeclass="active"
                      to="about"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      About Us
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink
                      className="dropdown-link"
                      activeclass="active"
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      Contact Us
                    </ScrollLink>
                  </li>
                  {!userInfo && (
                    <>
                      <li>
                        <button onClick={() => navigate("/register")}>
                          Register
                        </button>
                      </li>
                      <li>
                        <button onClick={() => navigate("/login")}>
                          Login
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

const mapStateToProps = ({ cart }) => {
  const { items } = cart;
  return { items };
};

export default connect(mapStateToProps)(Header);
