import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MobileProfileDropDown = () => {

    const { user} = useSelector((state)=> state.profile)
    if (!user)
        return null;

    const [open, setOpen ] = useState(false);
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchSublinks =  async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/sublinks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch sublinks');
            }
            const data = await response.json();
            setSubLinks(data);
            setLoading(false);
        }
        catch (error) {
            console.error('Failed to fetch sublinks:', error);
            setLoading(false);
        }
    }

    useEffect (()=> {
        fetchSublinks();
    },[])
    return (
        <button className="relative sm:hidden" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1">
            <Img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className={'aspect-square w-[30px] rounded-full object-cover'}
            />
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
        </div>


        {open && (
            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute min-w-[120px] top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-lg border-[1px] border-richblack-700 bg-richblack-800"
                ref={ref}
            >
                <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100">
                        <VscDashboard className="text-lg" />
                        Dashboard
                    </div>
                </Link>


                <Link to='/' onClick={() => setOpen(false)}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 border-y border-richblack-700 ">
                        <AiOutlineHome className="text-lg" />
                        Home
                    </div>
                </Link>

                <Link to='/' onClick={() => setOpen(false)}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100">
                        <PiNotebook className="text-lg" />
                        Catalog
                    </div>
                </Link>

                <Link to='/about' onClick={() => setOpen(false)}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 border-y border-richblack-700 ">
                        <TbMessage2Plus className="text-lg" />
                        About Us
                    </div>
                </Link>

                <Link to='/contact' onClick={() => setOpen(false)}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 ">
                        <MdOutlineContactPhone className="text-lg" />
                        Contact Us
                    </div>
                </Link>

                <div
                    onClick={() => {
                        dispatch(logout(navigate))
                        setOpen(false)
                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100"
                >
                    <VscSignOut className="text-lg" />
                    Logout
                </div>


                {/* <CatalogDropDown subLinks={subLinks} /> */}

            </div>
        )}
    </button>
    );
};

export default MobileProfileDropDown;