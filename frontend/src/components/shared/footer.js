import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/images/Surasa Logo.png";
import emailIcon from "../../assets/vectors/email.svg";
import callIcon from "../../assets/vectors/call.svg";

function Footer() {
  const socialIcons = [
    { icon: <FaFacebook className="text-[#3B5998] text-2xl" />, link: "#" },
    { icon: <FaTwitter className="text-[#1DA1F2] text-2xl" />, link: "#" },
    { icon: <FaInstagram className="text-[#C13584] text-2xl" />, link: "#" },
    { icon: <FaLinkedin className="text-[#0077B5] text-2xl" />, link: "#" },
  ];

  return (
      <footer className=" pt-10 bg-[#A9A29A0F] px-20">
        <div className="flex flex-wrap justify-between p-10">
          <div className="w-full md:w-auto mb-4 md:mb-0 flex justify-center items-center ">
            <img src={logo} alt="Logo" className="w-16 h-16" />
          </div>
          <div className="space-y-2 text-center md:text-left ">
            <p className="font-bold">Opening Hours</p>
            <p>Weekdays: 9:00 AM - 5:00 PM</p>
            <p>Weekends: 8:00 AM - 8:00 PM</p>
          </div>
          <div className="space-y-2 text-center md:text-left md:pt-[0px] pt-[20px]">
            <p className="font-bold">Address</p>
            <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
          </div>
          <div className="space-y-2 text-center md:text-left  md:pt-[0px] pt-[20px]">
            <p className="font-bold">Contact</p>
            <div className="flex items-center justify-center md:justify-start">
              <img src={emailIcon} alt="Email" className="w-5 h-5 mr-2" />
              <p>Info@example.com</p>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <img src={callIcon} alt="Phone" className="w-5 h-5 mr-2" />
              <p>077-1234567</p>
            </div>
          </div>
        </div>

        <div className="md:flex justify-between items-center p-4 border-t grid  ">
          <p className="text-center md:text-left">&copy; 2024, All Rights Reserved</p>
          <div className="flex space-x-3 justify-center items-center md:pt-[0px] pt-[20px]">
            {socialIcons.map((icon, index) => (
                <a href={icon.link} key={index} className="text-xl">
                  {icon.icon}
                </a>
            ))}
          </div>
        </div>
      </footer>
  );
}

export default Footer;
