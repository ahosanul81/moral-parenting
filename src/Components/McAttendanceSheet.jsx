import { useContext, useState } from "react"
import { MpContext } from "../Context/ContextProvider"
import Swal from "sweetalert2"
import useAxiosPublic from "../Hooks/useAxiosPublic"
import { useParams } from "react-router-dom"

const McAttendanceSheet = ({ sessionInfo, groupdata }) => {
    const { user } = useContext(MpContext)
    const { groupNo } = useParams();
    const axiosPublic = useAxiosPublic()
    const [isChecked, setIsChecked] = useState(false)
    const { groupInfo, membersProfile } = groupdata || {}
    const mentor = user?.email

    const sessionNo = sessionInfo && sessionInfo.length > 0 ? sessionInfo[0].latestSessionNo : null;
    // console.log('sessionNo', sessionNo);

    const handleCheckBox = async (e, mcID) => {
        if (e.target.checked) {
            setIsChecked(e.target.checked)
        }
        // console.log(mcID, sessionNo);


        try {
            // add mcId to attendance coolection in presented array
            const { data } = await axiosPublic.patch('/takeAttendance', { mcID, sessionNo, mentor, groupNo })
            console.log(data);

            if (data.acknowledged) {
                Swal.fire({
                    title: "Ok, You are present",
                    icon: "success"
                });
            }

            // const { data: updateToProfile } = await axiosPublic.patch('/updatePresentToProfile', { mcID, sessionNo })
            // console.log('updateToProfile', updateToProfile);

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Something went wrong",
                text: { error },
                icon: 'oops'
            });
        }
    }


    const updateAbsentMc = async () => {
        const { data } = await axiosPublic.patch('/updateAbsentMcEnglishAdda', { sessionNo, groupNo })
console.log(data);

        if (data.acknowledged) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Session is closed",
                text: 'Those who are not attend, they are absent and updated to server',
            });
        }
    }



    return (
        <div>

            <h1 className="text-2xl font-bold text-center">Session no:  {sessionNo}</h1>

            <table className="table table-xs w-full">
                <thead className="">
                    <tr className="text-left text[1rem] border-b border-blue-300 bg-green-300">
                        <th className="w-1/4  ">SL No</th>
                        <th className="w-1/4"> MC Name</th>
                        <th className="w-1/4">MC ID</th>
                        <th className="w-1/4 text-right">Present</th>
                    </tr>
                </thead>


                <tbody className="">
                    {
                        membersProfile?.map(({ _id, name, mcID, userCredential }, index) => <tr key={index} className="border-b border-blue-300 ">
                            <td className="w-1/4 ">{index + 1}</td>
                            <td className="w-1/4">{user?.email === userCredential?.email ? <span className="text-[#ed582a] font-semibold text-xl">{name}</span> : <span className="capitalize  text-[1rem]">{name}</span>} </td>
                            <td className="w-1/4">{user?.email === userCredential?.email ? <span className="text-[#ed582a] font-semibold text-xl uppercase">{mcID}</span> : <span className="uppercase text-[1rem]">{mcID}</span>}</td>

                            {
                                user?.email === userCredential?.email ? <td className="w-1/4 text-right">
                                    <label className="inline-flex items-center cursor-pointer mx-auto ">

                                        <input
                                            type="checkbox"
                                            value=""
                                            checked={isChecked}
                                            onChange={(e) => handleCheckBox(e, mcID)}
                                            className="sr-only peer"
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </td> : <td className="text-right"><label className="inline-flex items-center cursor-pointer mx-auto ">
                                    <input disabled type="checkbox" value="" name="attendance" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                                </td>}


                        </tr>)
                    }

                </tbody>
            </table>



            <div className="mt-6 text-center">
                <button onClick={async () => {
                    await updateAbsentMc();
                  
                }} className="font-semibold text-white  border-2 border-blue-300 bg-blue-500 hover:bg-transparent hover:text-black px-4 py-1 rounded-md "> Close the session</button>
            </div> 
            {/* setCloseSession(true); */}
        </div>
    )
}
export default McAttendanceSheet