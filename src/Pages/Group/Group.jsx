import { useQuery } from "@tanstack/react-query";
import McChart from "../../Components/McChart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic"; // Ensure this is correctly imported
import { useContext, useState } from "react";
import { MpContext } from "../../Context/ContextProvider";
import { getStoredData, saveData } from "../../Hooks/localStorage";
import axios from "axios";
import McAttendanceSheet from "../../Components/McAttendanceSheet";
import SessionInfo from "../Dashboard/SessionInfo";
import PresentSessionSummary from "../../Components/PresentSessionSummary";
import LastSevenSessionInfo from "../EnglishAdda.jsx/LastSevenSessionInfo";
import Swal from "sweetalert2";


const Group = () => {
    const { groupNo } = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const { user } = useContext(MpContext)
    const [allMembers, setShowAllMembers] = useState(false)
    const [showAttendance, setShowAttendance] = useState(false)
    const [sessionCount, setSessionCount] = useState(null)
    const [sessionData, setSessionData] = useState()
    const [showSessionNo, setShowSessionNo] = useState()
    const [lastSevenSessionInfo, setLastSevenSessionInfo] = useState(false)

    const [submittedSessionNo, setSubmittedSessionNo] = useState()
    const mentor = user?.email;
    const sessionNo = getStoredData('sessionNo')[0];



    const handleSessionCount = async () => {
        try {
            const { data } = await axiosPublic.get(`/sessionCount/${groupNo}`)
      

            if (data) {
                setSessionCount(data)
            }

        } catch (error) {
            console.log(error);

        }

    }
    const handleSessionChanges = async (e) => {
        const sessionNo = e.target.value;

        try {
            if (groupNo) {
                const { data } = await axiosPublic.get(`/specificSessionInfo/groupNo/${groupNo}?sessionNo=${sessionNo}`);
           
                setSessionData(data)

            }
        } catch (error) {
            console.log(error);

        }
    }

    // const { data: sessionData } = useQuery({
    //     queryKey: ['specificSessionInfo', groupNo],  // Include groupNo to re-fetch if it changes
    //     queryFn: async () => {
    //         const { data } = await axiosPublic.get(`/specificSessionInfo/groupNo/${groupNo}?sessionNo=${sessionNo}`);
    //         return data;
    //     },
    // });

    // console.log(sessionData);


    const { data: groupdata, refetch:refetchGroupData } = useQuery({
        queryKey: ['specificGroupInfo', groupNo],  // Include groupNo to re-fetch if it changes
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/specificGroupInfo/groupNo/${groupNo}`);
            return data; // Return the data so that useQuery receives it
        },
        enabled: !!submittedSessionNo
    });
    if (groupNo) {
        refetchGroupData()
    }




    const { groupInfo, membersProfile } = groupdata || {}
    // console.log(membersProfile);


    const { data: sessionInfo } = useQuery({
        queryKey: ['specificSessionInfo',],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/sessionInfo`, {
                params: {
                    groupNo
                }
            })
            return data
        },
      
    })
    // console.log(sessionInfo);
    const isShowAttenDanceSheet = sessionInfo?.some(item => item.showAttendance)



    // const { data: groupMemberInfo } = useQuery({
    //     queryKey: ['groupMemberInfo', mentor],
    //     queryFn: async () => {
    //         const { data } = await axiosPublic.get('/groupMemberInfo', {
    //             params: { mentor } 
    //         })
    //         return data
    //     }
    // })
    // console.log(groupMemberInfo);




    const handleSessionNo = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            const sessionNo = form.sessionNo.value;
   

            const { data } = await axiosPublic.patch(`/createSession?sessionNo=${sessionNo}`, { mentor })

            if (data.acknowledged) {

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Successfully created a new session",

                });
            }




        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>

            <div className="text-center">
                <p className="text-2xl font-bold">Group No: {groupInfo?.groupNo}  </p>
            </div>
            <div className="space-x-2 flex flex-col lg:flex-row gap-4">
                <button onClick={() => setShowAllMembers(true)} className="bg-[#6fc8f5] px-2 p-1 rounded-md hover:bg-white border-2 border-blue-300">Show All Group Members </button>
                <button onClick={() => setShowAttendance(!showAttendance)} className="bg-[#6fc8f5] px-2 p-1 rounded-md hover:bg-white border-2 border-blue-300">Show Attendance Sheet</button>
                <button onClick={() => setShowSessionNo(!showSessionNo)} className="bg-[#6fc8f5] px-2 p-1 rounded-md hover:bg-white border-2 border-blue-300">Session Info</button>
                <button onClick={() => setLastSevenSessionInfo(true)} className="bg-[#6fc8f5] px-2 p-1 rounded-md hover:bg-white border-2 border-blue-300">Last Seven Session Info</button>

            </div>

            {
                showSessionNo && <div>
                    <select onClick={() => handleSessionCount()} name="groupNo" onChange={(e) => handleSessionChanges(e)} className="border border-blue-300 rounded-md px-3 py-1">
                        <option >Select a Session no</option>
                        {
                            sessionCount && sessionCount?.sessionNumbers?.map(item => <option key={item} value={item}>Session no: {item}</option>)
                        }

                    </select>

                </div>
            }



            {
                !showAttendance || isShowAttenDanceSheet ? null : <form className="grid grid-cols-4" onSubmit={(e) => handleSessionNo(e)}>
                    <div className="">
                        <label htmlFor="reasonOfAbsence" className="block text-sm font-medium">Give your session no </label>
                        <div className="flex items-center">
                            <input type="number" name="sessionNo" className="flex flex-1 text-center sm:text-sm rounded-l-md py-2 border-2 border-blue-300 focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600" />
                            <button onClick={() => setSubmittedSessionNo(true)}
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
                sessionData && <PresentSessionSummary th1={"Name"} th2={"MC ID"} th3={" Attendance Status"} th4={"Absent"} th5={"Action"} th6={"SL No."} th7={"Attendence Sheet"} data={sessionData}></PresentSessionSummary>
            }

            {
                isShowAttenDanceSheet && <div>
                    <McAttendanceSheet groupdata={groupdata} sessionInfo={sessionInfo}></McAttendanceSheet>
                </div>
            }

            {
                lastSevenSessionInfo && <LastSevenSessionInfo></LastSevenSessionInfo>
            }

            {allMembers && <McChart
                th1={'Sl No'}
                th2={'Name'}
                th3={'University Name'}
                th4={'MC ID'}
                th5={'Action'}
                data={groupdata?.membersProfile}
            />}



        </div>
    );
};

export default Group;
