import { BsInfoCircleFill } from "react-icons/bs";
import { FiAlignRight } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { PiSortAscending } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";

const DashboardLeft = () => {

    const navlinks = <>
        {/* <NavLink to={"/"}><li><button className="btn bg-white text-black rounded-md">Home</button></li></NavLink> */}
        <NavLink to={"/dashboard/sessionInfo"}><li className="flex items-center gap-2"><IoIosInformationCircleOutline /> Session Info</li></NavLink>
        <NavLink to={"/dashboard/lastSevenSession"}><li className="flex items-center gap-2"><PiSortAscending /> Last 7 Session </li></NavLink>

    </>
    return (
        <div>
            <div className="px-2 hidden lg:block">
                <Link to={"/"}>
                    <div className="flex items-center gap-3">
                        <img className="w-8 h-8" src="https://res.cloudinary.com/dgs2ywdd6/image/upload/mp-logo_kq3oqf.jpg" alt="" />
                        <h1 className="text-xl font-bold text-[#57CCF4]">Moral Parenting</h1>
                    </div>
                </Link>
                <ul className="mt-6 text-white">
                    {navlinks}
                </ul>
            </div>

            <div className="block lg:hidden flex items-center justify-around">

                <div className="drawer  block lg:hidden z-30">
                
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
                    <div className="flex items-center gap-3">
                        <img className="w-8 h-8" src="https://res.cloudinary.com/dgs2ywdd6/image/upload/mp-logo_kq3oqf.jpg" alt="" />
                        <h1 className=" font-bold text-[#57CCF4]">Moral Parenting</h1>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default DashboardLeft;