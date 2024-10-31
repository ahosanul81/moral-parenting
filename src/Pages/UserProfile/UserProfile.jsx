import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MpContext } from "../../Context/ContextProvider";
import Chart from "../../Components/Chart";
import { useParams } from "react-router-dom";
import { MdDescription } from "react-icons/md";
import McChart from "../../Components/McChart";

const UserProfile = () => {
    const axiosPublic = useAxiosPublic();
    const { userEmail } = useParams();
    const { user, } = useContext(MpContext)
    const [submittedReason, setSubmittedReason] = useState(false)

    const [allSession, setAllSession] = useState(false)


    const { data: userInfo = {}, isLoading, error, refetch } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/profile/${userEmail || user?.email}`);
            // const { data } = await axiosPublic.get('/userInfo', {
            //     params: { email: user?.email},
            // });
            return data;
        },
        enabled: !!userEmail || !!user?.email,
    });

    if (userEmail || user?.email) {
        refetch()
    }
    // console.log(userInfo.mcID);
    const mcid = userInfo.mcID
    const barChartData = userInfo.barChartdata;


    const { data: allPresentedSession = [] } = useQuery({
        queryKey: ['allPresentedSession', mcid],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/allPresentedSession', {
                params: { mcid }
            });
            return data
        }
    })
    // console.log(allPresentedSession);
    const formatedDate = allPresentedSession.map(item => {
        // Extract year, month, and day
        const year = item.slice(0, 4);
        const month = item.slice(4, 6);
        const day = item.slice(6, 8);

        // Return the formatted date as 'YYYY-MM-DD'
        return `${year}-${month}-${day}`;
    })
    // console.log(formatedDate);


    const handlereasonOfAbsence = async (e, sessionNo) => {
        e.preventDefault()
        try {
            const form = e.target;
            const reasonOfAbsence = form.reasonOfAbsence.value;

            const { data } = await axiosPublic.patch(`/updateReasonOfAbsentSession/${userEmail || user?.email}`, { reasonOfAbsence, sessionNo })



        } catch (error) {
            console.log(error.message);
        }
    }

    const { data: absentSession = [], refetch: refetchAbsentSession } = useQuery({
        queryKey: ['absentSession'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/absentSession/${userEmail || user?.email}`)
            return data
        },
        enabled: !!userEmail || user?.email
    })

    if (submittedReason) {
        refetchAbsentSession()
    }




    // english adda 

    const { data: myGroupMembers = [] } = useQuery({
        queryKey: ['myGroupMembers'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/myGroupMembers/${userEmail || user?.email}`)
            return data;
        }
    })

    console.log('myGroupMembers', myGroupMembers);

    const { data: groupInfo = [], refetch: refetchGroupInfo } = useQuery({
        queryKey: ['groupInfo'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/groupInfo/${user?.email}`)
            return data
        },
    })


    // Handle loading state
    if (isLoading) {
        return <div className='flex justify-center items-center w-full h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-600 "></div>
        </div>
    }




    // Handle error state
    if (error) {
        return <div>Error loading user info: {error.message}</div>;
    }

    // Destructure userInfo object
    const { imageUrl, name, mcID, universityName, userCredential } = userInfo;

    return (
        <div>

            <div className="flex flex-col lg:flex-row justify-start gap-12 mt-5">
                <div className="w-full lg:w-3/5 flex justify-center ">
                    <div className="w-5/6 lg:w-4/6 rounded-lg border border-blue-300 text-center space-y-3 p-3 bg-blue-50">
                        <img className="w-3/5 mx-auto border-2 border-blue-400 rounded-full p-2" src={imageUrl} alt="Profile photo" />
                        <hr />
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <hr />
                        <p className="uppercase">MC ID: {mcID}</p>
                        <hr />
                        <p> {universityName}</p>
                        <hr />
                        <p>{userCredential?.email}</p>
                        <hr />
                    </div>

                </div>
                <div className="relative w-full flex flex-col items-start space-y-5 p-4 lg:rounded-lg lg:border lg:border-blue-300">

                    <div className="">
                        <Chart></Chart>
                    </div>
                    <div className="flex  gap-4">
                        {absentSession && absentSession.map(({ sessionNo, sessionDate, absent, description }, index) => (
                            // <div className="grid grid-cols-3 gap-4">


                            <fieldset key={sessionNo} className=" w-full dark:text-gray-800">


                                {
                                    !description && <form onSubmit={(e) => handlereasonOfAbsence(e, sessionNo)}>
                                        <div className="flex flex-col ">
                                            {/* <p>Session No: {sessionNo}</p> */}
                                            <label htmlFor="reasonOfAbsence" className="block text-sm font-medium">Session No: {sessionNo}</label>
                                            <div className="flex items-center">
                                                <input

                                                    type="text"
                                                    name="reasonOfAbsence"
                                                    id="price"
                                                    placeholder="Reason of absence was..."
                                                    className="flex flex-1 text-right sm:text-sm rounded-l-md py-2 border-2 border-blue-300 focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
                                                />
                                                <button
                                                    onClick={() => setSubmittedReason(true)}
                                                    type="submit"
                                                    className="flex items-center px-3 py-2 bg-blue-500 border-2 border-blue-300 hover:bg-transparent text-white hover:text-black sm:text-sm rounded-r-md dark:bg-gray-300"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                }

                            </fieldset>
                        ))}
                    </div>
                </div>




            </div >

            {
                groupInfo?.mentor === userInfo?.userCredential.email && <div className="mt-5 border border-blue-400 p-4 rounded-md">
                    <h1 className="text-4xl font-bold text-center">English Adda</h1>
                    {
                        groupInfo?.groupNo && <div className="text-center">
                            <h1><span className="font-semibold">Group no:</span> {groupInfo?.groupNo}  <span className="font-semibold">Mentor:</span> {groupInfo?.mentor}</h1>
                        </div>
                    }
                  
                </div>
            }
        </div>

    );
};

export default UserProfile;
