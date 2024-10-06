import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";
import { ImGithub, ImLinkedin2 } from "react-icons/im";


// Images
import StudyNotionLogo from "../../assets/Logo/Logo.png";

// footer data
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];



const Footer = () => {
  return (
    
    <div className="bg-richblack-800 mx-7 rounded-3xl mb-10">
    <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
      <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
  
      
        <div className="lg:w-[50%] flex flex-wrap justify-between lg:border-r border-richblack-700 pl-3 lg:pr-5 gap-3">
          <div className="w-[30%] lg:w-[30%] mb-7">
            <img src={StudyNotionLogo} alt="" className="object-contain" />
            <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
            <div className="flex flex-col gap-2">
        
              <Link to="/about" className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">About</Link>
            </div>
          </div>
  
          <div className="w-[48%] lg:w-[30%] mb-7">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
          
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/articles" className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">Articles</Link>
            </div>
          </div>
        </div>
  
        {/* <!-- Right Side Section: FooterLink2 --> */}
        <div className="lg:w-[50%] flex flex-wrap justify-between pl-3 lg:pl-5 gap-3">
          {/* <!-- Repeat Footer Link Structure --> */}
          {FooterLink2.map((ele, i) => (
            <div key={i} className="w-[35%] lg:w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">{ele.title}</h1>
              <div className="flex flex-col gap-2 mt-2">
                {ele.links.map((link, index) => (
                  <Link key={index} to={link.link} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">{link.title}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    {/* <!-- Bottom Footer Section --> */}
    <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
      <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
        <div className="flex">
          {BottomFooter.map((ele, ind) => (
            <Link key={ind} to={ele.split(" ").join("-").toLowerCase()} className={`px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200 ${BottomFooter.length - 1 !== ind ? "border-r border-richblack-700" : ""}`}>
              {ele}
            </Link>
          ))}
        </div>
  
        <div className="text-center flex flex-col sm:flex-row">
          <span>Made with ❤️ by <Link to='https://github.com/SuriyaPriyanS' target="__blank" className="text-white hover:underline mr-1">Aniruddha Gade</Link></span>
          <span> © 2023 Studynotion</span>
        </div>
  
        <div className="flex items-center">
          
          <a href="https://www.linkedin.com/in/suriya-priyan-ab186721b/" target="_blank" className="text-white p-3 hover:bg-richblack-700 rounded-full duration-300"><ImLinkedin2 size={17} /></a>
          <a href="https://github.com/SuriyaPriyanS" target="_blank" className="text-white p-3 hover:bg-richblack-700 rounded-full duration-300"><ImGithub size={17} /></a>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Footer;