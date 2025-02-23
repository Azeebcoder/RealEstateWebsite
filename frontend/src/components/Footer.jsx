  import React from "react";
  import {
    FaLinkedinIn,
    FaGithub,
    FaPaperPlane,
    FaInstagram,
    FaHome
  } from "react-icons/fa";
  import { FaXTwitter, FaCircleChevronRight } from "react-icons/fa6";
  import { IoIosCall } from "react-icons/io";
  import { MdEmail } from "react-icons/md";

  const Footer = () => {
    return (
      <>
        <div className="bg-gray-900 text-gray-300 py-8 px-6">
          <div className="container mx-auto flex flex-col gap-6">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 flex flex-col gap-3 p-3">
                <h2 className="text-white text-xl font-semibold">Baghpat Real-Estate</h2>
                <p>Baghpat Real Estate Official Website</p>
                <p>Keep Rising 🚀. Connect with me over live chat!</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-3 p-3">
                <h2 className="text-white text-xl font-semibold">Contact Info</h2>
                <ul className="flex flex-col gap-2 font-semibold">
                  
                    <li className="hover:text-orange-500 transition transform hover:scale-105">
                      <a href="tel:+919911003704"className="flex items-center gap-2">
                      <IoIosCall /> +91 991 100 3704
                      </a>
                    </li>
                    <li className="hover:text-orange-500 transition transform hover:scale-105">
                      <a href="tel:+919358215797"className="flex items-center gap-2">
                      <IoIosCall /> +91 935 821 5797
                      </a>
                    </li>
                    <li className="hover:text-orange-500 transition transform hover:scale-105">
                      <a href="tel:+917895010007"className="flex items-center gap-2">
                      <IoIosCall /> +91 789 501 0007
                      </a>
                    </li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-3 p-3">
                <h2 className="text-white text-xl font-semibold">Social Media & Addresses</h2>
                <ul className="flex flex-col gap-2">
                  <li><a href="mailto:kchauhan3790@gmail.com" className="flex items-center gap-2 hover:text-orange-500 transition"><MdEmail /> kchauhan3790@gmail.com</a></li>
                  <li><a href="https://maps.app.goo.gl/k5ZjjXK8tLLS5jEB7" className="flex items-center gap-2 hover:text-orange-500 transition"><FaHome/>  Vandana Chowk, Baghpat</a></li>
                </ul>


                {/* THis Section details is not available right now */}

                
                {/* <div className="flex gap-3 mt-3">
                  {[{ href: "https://www.linkedin.com/in/sumit-bhardwaj-new", icon: <FaLinkedinIn /> },
                    { href: "https://github.com/Azeebcoder", icon: <FaGithub /> },
                    { href: "https://www.instagram.com/lilsumyy/", icon: <FaInstagram /> },
                    { href: "https://x.com/LilSuumyy", icon: <FaXTwitter /> },
                    { href: "https://t.me/+916397929579", icon: <FaPaperPlane /> }
                  ].map(({ href, icon }, index) => (
                    <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 text-white rounded-full hover:bg-white hover:text-gray-900 transition text-xl">
                      {icon}
                    </a>
                  ))}
                </div> */}
              </div>
            </div>
            <hr className="border-gray-700" />
            <div className="text-center text-gray-400">Designed with 💗 by Sumit</div>
          </div>
        </div>
      </>
    );
  };

  export default Footer;
