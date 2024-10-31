import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MpContext } from "../../Context/ContextProvider";
import useAdmin from "../../Hooks/useAdmin";
import { FiAlignRight } from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate()
    const { user, logOut } = useContext(MpContext)

    // console.log('user', user);

    const navlinks = <>
        {/* <li><NavLink to={"/attendanceSheet"}>Take Attendance</NavLink></li> */}
        <li><NavLink to={"/englishAdda"}>English Adda</NavLink></li>
        {/* <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li> */}
    </>

    const handleLogOut = async () => {
        await logOut()
        navigate('/')
    }

    return (
        <div className="grid grid-cols-12 lg:grid lg:grid-cols-4 items-center border border-b border-gray-200 py-2">


            <div className="drawer col-span-2 block lg:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <label htmlFor="my-drawer" className="w-4 bg-blue-400 "><FiAlignRight className="text-4xl" /></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-white text-base-content min-h-full w-3/5 p-4">

                        {navlinks}
                    </ul>
                </div>
            </div>



            <Link to={"/"}>
                <div className="flex items-center gap-3 col-span-5 lg:col-span-1">
                    <img className="w-9 h-9 lg:w-16 lg:h-16" src="https://res.cloudinary.com/dgs2ywdd6/image/upload/mp-logo_kq3oqf.jpg" alt="" />
                    <h1 className="text-xs lg:text-3xl font-bold text-[#57CCF4]">Moral Parenting</h1>
                </div>
            </Link>

            <div className="hidden lg:block">
                <ul className="flex items-center gap-4">
                    {navlinks}
                </ul>

            </div>

            <div className="hidden lg:block">
                <fieldset className="w-full space-y-1 text-gray-800">
                    <label htmlFor="Search" className="hidden">Search</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-800">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="search" name="Search" placeholder="Search..." className="w-32 py-1 lg:py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-teal-600" />
                    </div>
                </fieldset>
            </div>
            <div className=" -mt-10 lg:-mt-0 text-right space-x-3 col-span-12 lg:col-span-1">

                {
                    user ? <div className="flex justify-end items-center gap-5 ">
                        <Link to={`/profile/${user?.email}`}>
                            <div title={user?.email} className=" border-2 border-blue-300 rounded-full p-[.12rem] lg:p-1">
                                <img className="w-9 h-9 lg:w-14 lg:h-14 rounded-full " src={user.photoURL} alt="" />
                            </div>
                        </Link>
                        <button onClick={handleLogOut} type="button" className="px-2 py-1 lg:px-8 lg:py-3 font-semibold rounded bg-[#57CCF4] text-white">Log Out</button>
                    </div>
                        : <>
                            <Link to={"/login"}>
                                <button type="button" className="px-2 py-1 lg:px-8 lg:py-3 font-semibold rounded bg-[#57CCF4]  border-2 border-blue-300 text-white hover:bg-transparent hover:text-black">Login</button>
                            </Link>
                            <Link to={"/signUp"}>
                                <button type="button" className="px-1 py-1 lg:px-8 lg:py-3 font-semibold rounded bg-[#57CCF4] border-2 border-blue-300 text-white hover:bg-transparent hover:text-black">Sign Up</button>
                            </Link>
                        </>
                }


            </div>
        </div>
    );
};

export default Navbar;