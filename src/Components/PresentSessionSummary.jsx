
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PresentSessionSummary = ({ th1, th2, th3, th4, th5, th6, th7, data }) => {
    const [setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data])


    if (loading) {
        return <div className='flex justify-center items-center w-full h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-600 "></div>
        </div>
    }

    const { sessionInfo, membersProfile } = data;
    const presentedMc = sessionInfo?.map(item=> item.presented)
    console.log(presentedMc);
    
    // const presentedMc = allPresetedMcInfo?.map(item => item.mcID)



    return (

        <div>
            <div className="text-2xl font-bold text-center">
                <h1>{th7}</h1>
            </div>

            <div className="flex gap-6 justify-center text-xl font-semibold">
                {sessionInfo && sessionInfo?.map(item => <>
                    <h1>Session No: {item?.sessionNo}</h1>
                    <h1>Date: {item?.currentDate}</h1>
                </>)}
            </div>

            <div className="flex justify-center">
                {/* 
                {
                    percentageOfPresent &&
                    <div className="w-3/5 bg-gray-200 rounded-full dark:bg-gray-700 my-2">
                        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${percentageOfPresent}%` }}> <span className="mr-2">Present</span> {parseFloat(percentageOfPresent).toFixed()}%</div>
                    </div>

                } */}

            </div>

            <div className="overflow-x-auto">

                <table className="table w-full">

                    <thead>
                        <tr>

                            <th>{th6}</th>
                            <th>{th1}</th>
                            <th>{th2}</th>
                            <th className="text-center">{th3}</th>
                            <th>{th5}</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            membersProfile?.map(({ _id, name, mcID, imageUrl,universityName, userCredential }, index) => <tr key={_id}>

                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-8 w-8">
                                                <img
                                                    src={imageUrl}
                                                    alt="Profile Photo" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold capitalize">{name}</div>
                                            <div className="text-sm opacity-50 capitalize">{universityName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="uppercase"> {mcID}</td>

                                <th className="text-center"> {presentedMc && presentedMc[0]?.includes(mcID) ? 'p' : <span className="text-red-500">A</span>}</th>


                                <th>
                                    <Link to={`/profile/${userCredential.email}`}>
                                        <button onClick={() => setUserEmail(userCredential.email)} className="btn btn-ghost btn-xs">Go to profile</button>
                                    </Link>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}
export default PresentSessionSummary;