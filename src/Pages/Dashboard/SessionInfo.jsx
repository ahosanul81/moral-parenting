import { useContext, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PresentSessionSummary from "../../Components/PresentSessionSummary";
import { MpContext } from "../../Context/ContextProvider";
const SessionInfo = () => {
    // const axiosPublic = useAxiosPublic()
    // const { setLoading, loading } = useContext(MpContext)
    // const [totalSession, setTotalSesssion] = useState([])


    // const [data, setData] = useState(null)

    // const [openPresent, setOpenPresent] = useState(false)
    // const [openAbsent, setOpenAbsent] = useState(false)



    // // get present session info
    // const handlePresent = async () => {
    //     try {
    //         const { data } = await axiosPublic.get('/countTotalSession')
    //         // console.log('totalSession', data);
    //         if (!data) {
    //             setLoading(true)
    //         }
    //         setTotalSesssion(data)
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    // const handlePresentSessionChange = async (e) => {
    //     const presentSessionNo = e.target.value;
    //     // console.log(presentSessionNo);

    //     try {
    //         const { data } = await axiosPublic.get(`/specificSessionInfo/sessionNo/${presentSessionNo}`)
          
    //         if (!data) {
    //             setLoading(true)
    //         }
    //         setData(data)
     
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    if (loading) {
        return <div className='flex justify-center items-center w-full h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-600 "></div>
        </div>
    }




    return (
        <div className="flex flex-col gap-3 mt-3">
          
            <div className="space-x-3">
                <select onClick={() => { handlePresent(); () => setOpenPresent(true) }} name="presentSessionNo" onChange={(e) => handlePresentSessionChange(e)} id="" className="border border-blue-300 rounded-md p-2">
                    <option >Select a session</option>
                    {
                        totalSession?.map(item => <option key={item} value={item}>Session No: {item}</option>)
                    }
                </select>


            </div>
            <div className="flex gap-4">
                <div>
                    {
                        data && <PresentSessionSummary th1={"Name"} th2={"MC ID"} th3={" Attendance Status"} th4={"Absent"} th5={"Action"} th6={"SL No."} th7={"Attendence Sheet"} data={data}></PresentSessionSummary>
                    }
                </div>

           
            </div>


        </div>
    )
}
export default SessionInfo;