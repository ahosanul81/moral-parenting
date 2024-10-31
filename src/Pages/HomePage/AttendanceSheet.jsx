import { useContext, useEffect, useState } from "react";
import { MpContext } from "../../Context/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAdmin from "../../Hooks/useAdmin";
import PresentSessionSummary from "../../Components/PresentSessionSummary";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const AttendanceSheet = () => {
    const { user } = useContext(MpContext)
    const isAdmin = useAdmin()
    const axiosPublic = useAxiosPublic()
    const [isChecked, setIsChecked] = useState(false)
    const [present, setPresent] = useState(false)
    const [McID, setMcID] = useState('')
    const [showSheet, setShowSheet] = useState(false)
    const [closeSession, setCloseSession] = useState(null)
    const [purposeAdded, setPurposeAdded] = useState(false)





    const handleCheckBox = async (e, mcID) => {
        if (e.target.checked) {
            setPresent(mcID)
            setIsChecked(e.target.checked)
        }

        try {
            // add mcId to attendance coolection in presented array
            const { data: PresentData } = await axiosPublic.patch('/presentedMC', { mcID, sessionNo })

            if (PresentData.acknowledged) {
                Swal.fire({
                    title: "Ok, You are present",
                    icon: "success"
                });
            }

            const { data: updateToProfile } = await axiosPublic.patch('/updatePresentToProfile', { mcID, sessionNo })
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

    const { data: userInfo = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/allUsers')
            return data
        }
    })
    

    const { data: sessionInfo = [], refetch } = useQuery({
        queryKey: ['attendance'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/attendance')
            return data
        }

    })
    // console.log(sessionInfo);

    if (showSheet || closeSession || purposeAdded) {
        refetch()
    }

    const isShowSheet = sessionInfo ? sessionInfo.some(item => item.showSheet === true) : false;
    const sessionNo = sessionInfo && sessionInfo.length > 0 ? sessionInfo[0].sessionNo : null;
    // console.log('sessionNo', sessionNo);

    // console.log('isShowSheet', isShowSheet);



    useEffect(() => {
        const showAttendSheet = async () => {
            const { data } = await axiosPublic.post('/attendance', { showSheet })

            // console.log(data);
            setShowSheet(data.showSheet)

        }
        if (showSheet) {
            showAttendSheet()
        }
    }, [showSheet, axiosPublic])

    // after clicking the close button showSheet will update as false 
    const { data: sessionCloseInfo } = useQuery({
        queryKey: ['attendance-close', closeSession],
        queryFn: async () => {
            const { data } = await axiosPublic.patch('/attendance-close', { closeSession, sessionNo })
            return data;
        },

        enabled: !!closeSession
    })

    // console.log('sessionCloseInfo', sessionCloseInfo?.acknowledged);
    useEffect(() => {
        if (sessionCloseInfo?.acknowledged) {
            setShowSheet(false)
        }
    }, [sessionCloseInfo?.acknowledged])


    // update purpose of attendance

    const handlePurpose = async (e) => {
        e.preventDefault()
        const form = e.target;
        const purpose = form.purpose.value;
        // console.log(purpose);

        try {
            const { data } = await axiosPublic.patch('/attendance-purpose', { purpose, sessionNo })
            // console.log(data);
            setPurposeAdded(data.acknowledged)
            if (data.acknowledged) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Purpose added done.",
                    showConfirmButton: false,
                    timer: 500
                });
            }

        } catch (error) {
            console.log(error);
        }
    }


    const updateAbsentMc = async () => {
        const { data } = await axiosPublic.patch('/updateAbsentMc', { sessionNo })
      
        if (data.acknowledged) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Session is closed",
                text: 'Those who are not attend, they are absent and updated to server',
            });
        }
    }


    const { data: allPresentedMcInfo = [] } = useQuery({
        queryKey: ['allPresentedMc'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/allPresentedMc', { params: { sessionNo } })
            return data
        },
        enabled: !!closeSession

    })
 
    

    return (

        <div className=" mx-auto w-4/5 mt-5">


            {
                (isAdmin && !isShowSheet) && (
                    <div>
                        <button
                            onClick={() => setShowSheet(true)}
                            className="bg-[#6fc8f5] text-xl px-2 p-1 rounded-md hover:bg-white border-2 border-blue-300"
                        >
                            Show attendance sheet
                        </button>
                    </div>
                )
            }



            {
                isShowSheet && sessionInfo.map(({ _id, sessionNo, currentDate, purpose }) => <div key={_id} className="flex items-center gap-6 mb-5">
                    <h1 className="text-xl font-semibold">Session No: {sessionNo}</h1>
                    <h1 className="text-xl font-semibold">Session date: {currentDate}</h1>

                    {
                        isAdmin && purpose  ? <h1 className="text-xl font-semibold">Session purpose: {purpose}</h1> : <form onSubmit={handlePurpose}>
                            <input type="text" name="purpose" className="border-2 border-blue-300 rounded-md py-1 px-2" placeholder="Write session purpose" />
                            <button type="submit" className="font-semibold text-white  border-2 border-blue-300 bg-blue-500 hover:bg-transparent hover:text-black px-4 py-1 rounded-md ml-2">Add</button>
                        </form>
                    }


                </div>)
            }


            {
                showSheet || isShowSheet ? <table className="table table-xs w-full">
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
                            userInfo?.map(({ _id, name, mcID, userCredential }, index) => <tr key={_id} className="border-b border-blue-300 ">
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
                </table> : null
            }

            {
                isAdmin && isShowSheet ? <div className="mt-6 text-center">
                    <button onClick={() => { updateAbsentMc(), setCloseSession(true) }} className="font-semibold text-white  border-2 border-blue-300 bg-blue-500 hover:bg-transparent hover:text-black px-4 py-1 rounded-md "> Close the session</button>
                </div> : null
            }
            {/* 

            {
                closeSession && <PresentSessionSummary
                th1={"Name"} th2={"Email"} th3={"Phone Number"} th4={"Action"} th5={"Action"} th6={"SL No."} data={allPresentedMcInfo}
            >

            </PresentSessionSummary>
            } */}

        </div>

    );
};

export default AttendanceSheet;