import React, { useContext } from "react";
const axiosPublic = useAxiosPublic()
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
} from "recharts";
import CustomTooltip from "../Components/CustomTooltip";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { MpContext } from "../Context/ContextProvider";

// const data = [
//     {
//         session: "1",
//         date: '2024-10-09',
//         present: 1,

//     },
//     {
//         session: "2",
//         date: '2024-10-09',
//         absent: -1,
//         label: "Reason of absence",
//         description: "I was busy for my semester"
//     },
//     {
//         session: "3",
//         date: '2024-10-09',
//         present: 1,


//     },
//     {
//         session: "4",
//         date: '2024-10-09',

//         absent: -1,

//     },
//     {
//         session: "5",
//         date: '2024-10-09',

//         absent: -1,

//     },

// ];



const Chart = () => {
    const { userEmail } = useParams();
    const {user} = useContext(MpContext)



    const { data = [] } = useQuery({
        queryKey: ['barchartData'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/barchartData/${userEmail || user?.email}`)
            return data
        }
    })
    // console.log(data);


    
    return (
        <BarChart
            width={700}
            height={300}
            data={data?.presented}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
            
            
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sessionNo" label={{ value: "Session No", position: "insideBottom", dy: 10 }} />
            <YAxis ticks={[-1, 0, 1]} domain={[-1, 1]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar  dataKey="absent" fill="#FF474C" />
            <Bar dataKey="present" fill="#82ca9d" />
        </BarChart>
    );
}
export default Chart;