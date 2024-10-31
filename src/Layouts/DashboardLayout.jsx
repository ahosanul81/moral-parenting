import { Outlet } from "react-router-dom";
import DashboardLeft from "../Pages/Dashboard/DashboardLeft";
// import Navbar from "../Pages/HomePage/Navbar";

const DashboardLayout = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="lg:bg-green-800 w-full lg:w-1/5 lg:min-h-screen">
                    <DashboardLeft></DashboardLeft>
                </div>
                <div className="w-full lg:w-4/5">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    )
}
export default DashboardLayout;