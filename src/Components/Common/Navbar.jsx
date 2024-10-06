import React, { useEffect, useState } from 'react';
import { matchPath, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../services/operations/courseDetailsApi'; // Adjust this path
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Hamburger icons
import ProfileDropDown from '../Coures/Auth/ProfileDropDown'; 
import MobileProfileDropDown from '../Coures/Auth/MobileProfileDropDown'; 
import studyNotionLogo from '../../assets/Logo/Logo-Full-Dark.png';
import { NavbarLinks } from '../../../data/navbar-links';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // To handle mobile menu state

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const response = await fetchCourseCategories();
      setSubLinks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShowNavbar('hide');
      } else {
        setShowNavbar('show');
      }
    } else {
      setShowNavbar('top');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white transition-all ${showNavbar}`}>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Logo */}
        <Link to="/">
          <img src={studyNotionLogo} width={160} height={42} loading='lazy' alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden sm:flex gap-x-6 text-richblack-25'>
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "bg-yellow-25 text-black rounded-xl p-1 px-3" : "text-richblack-25 rounded-xl p-1 px-3"}`}>
                  <p>{link.title}</p>
                  <MdKeyboardArrowDown />
                  <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                    <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (subLinks?.length > 0 ? (
                      subLinks.map((subLink, i) => (
                        <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" key={i}>
                          <p>{subLink.name}</p>
                        </Link>
                      ))
                    ) : (
                      <p className="text-center">No Courses Found</p>
                    ))}
                  </div>
                </div>
              ) : (
                <Link to={link?.path}>
                  <p className={`${matchRoute(link?.path) ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3`}>
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className='sm:hidden'>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl text-richblack-25">
            {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul className='absolute top-14 left-0 w-full bg-richblack-900 p-4 sm:hidden'>
            {NavbarLinks.map((link, index) => (
              <li key={index} className="my-2">
                <Link to={link?.path} className="block text-richblack-25 py-2">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Profile & Cart */}
        <div className='flex gap-x-4 items-center'>
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-2 duration-200" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login">
                <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md ${matchRoute('/login') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropDown />}
          {token !== null && <MobileProfileDropDown />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
