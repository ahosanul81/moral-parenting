import { useQuery } from "@tanstack/react-query";
import McChart from "../../Components/McChart";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { MpContext } from "../../Context/ContextProvider";
import { RiH1 } from "react-icons/ri";
import useGetTargetObject from "../../Hooks/usegetTargetObject";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EnglishAdda = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const targetObject = useGetTargetObject()
    const { user } = useContext(MpContext)
    const mentorEmail = user?.email
    const [createGroup, setCreateGroup] = useState(false)
    const [groupCount, setGroupCount] = useState(null)
    const [groupdata, setGroupData] = useState(null)


    const { data: userInfo = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/allUsers')
            return data
        }
    })
    // console.log(userInfo);

    const { data: groupInfo = [], refetch: refetchGroupInfo } = useQuery({
        queryKey: ['groupInfo',],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/groupInfo/${user?.email}`)
            return data
        },
    
    })
    if (user?.email) {
        refetchGroupInfo()
    }


    const ishowMcSheet = groupInfo?.showMcSheet

 

    const handleGroupCount = async () => {
        try {
            const { data } = await axiosPublic.get('/groupCount')
            if (data) {
                setGroupCount(data)
            }

        } catch (error) {
            console.log(error);

        }

    }
    const handleGroupChanges = async (e) => {
        const groupNo = e.target.value;

        if (groupNo) {
            navigate(`/englishAdd/group/${groupNo}`);
        }

    }


    // console.log(groupInfo);



    const handleGroupInfo = async (e) => {
        e.preventDefault();

        try {
            const form = e.target;
            const groupNo = form.groupNo.value;
            console.log(groupNo);

            const groupInfo = {
                groupNo,
                mentor: user?.email,
                showMcSheet: true,
            }

            const { data } = await axiosPublic.post('/createGroup', { groupInfo })

            console.log(data);nav

        } catch (error) {
            console.log(error);

        }

    }
    const AddMember = async (mcID,) => {
        try {
            const { data } = await axiosPublic.patch('/addMember', { mcID, mentorEmail })
            console.log(data);
            if (data.acknowledged) {
                refetchGroupInfo()
            }

        } catch (error) {
            console.log(error);

        }
    }

    const closeMcChart = async () => {
        try {
            const { data } = await axiosPublic.patch('/closeMcSheet', { mentorEmail })

            refetchGroupInfo()
           

        } catch (error) {
            console.log(error);

        }
    }



    return (
        <div className="mt-2">
            <div>
                <button onClick={() => setCreateGroup(true)} className="bg-[#6fc8f5] px-2 p-1 rounded-md hover:bg-white border-2 border-blue-300">Create My Group </button>

                <select onClick={() => handleGroupCount()} name="groupNo" onChange={(e) => handleGroupChanges(e)} className="border border-blue-300 rounded-md px-3 py-1">
                    <option>Select a group no</option>
                    {groupCount && groupCount?.map(item =>
                        <option key={item} value={item}>group no: {item}</option>
                    )}
                </select>
            </div>


            <div>

                {
                    groupInfo?.groupNo && <h1>Group no:{groupInfo?.groupNo}  Mentor: {groupInfo?.mentor}</h1>
                }

                {
                    !groupInfo?.groupNo && createGroup && <form onSubmit={(e) => handleGroupInfo(e)} className="grid grid-cols-4">
                        <div className="">
                            <label htmlFor="reasonOfAbsence" className="block text-sm font-medium">Group No: </label>
                            <div className="flex items-center">
                                <input type="number" name="groupNo" className="flex flex-1 text-center sm:text-sm rounded-l-md py-2 border-2 border-blue-300 focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600" />
                                <button
                                    type="submit"
                                    className="flex items-center px-3 py-2 bg-blue-500 border-2 border-blue-300 hover:bg-transparent text-white hover:text-black sm:text-sm rounded-r-md dark:bg-gray-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                }




                {
                    ishowMcSheet && <div className="overflow-x-auto">
                        <table className="table">

                            <thead>
                                <tr>
                                    <th>sl No.</th>
                                    <th>Name</th>
                                    <th>University Name</th>
                                    <th>MC ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userInfo?.map(({ name, mcID, universityName }, index) => {
                                        const isMember = groupInfo?.members?.includes(mcID);

                                        return (
                                            <tr key={mcID}>
                                                <th>{index + 1}</th>
                                                <td className="capitalize">{name}</td>
                                                <td className="capitalize">{universityName}</td>
                                                <td className="uppercase">{mcID}</td>
                                                <td className="uppercase">
                                                    {isMember ? (
                                                        <span className="text-green-500 font-semibold">Added</span>
                                                    ) : (
                                                        <button
                                                            onClick={() => AddMember(mcID)}
                                                            className="bg-gray-200 rounded-lg p-1 px-2 hover:bg-gray-300"
                                                        >
                                                            Add to Group
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            {ishowMcSheet && <div className="text-center">
                <button onClick={closeMcChart} className="bg-[#6fc8f5] px-2 p-1 rounded-md hover:bg-white border-2 border-blue-300">Close </button>
            </div>}

            {/* <div>
                <div>

                </div>
                <McChart th1={'Sl No'} th2={'Name'} th3={'University Name'} th4={'MC ID'} th5={'Action'} data={groupdata?.membersProfile} ></McChart>
            </div> */}
        </div>
    )
}
export default EnglishAdda;