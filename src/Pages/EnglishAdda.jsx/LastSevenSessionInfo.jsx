import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { useParams } from "react-router-dom"

const LastSevenSessionInfo = () => {
    const axiosPublic = useAxiosPublic()
    const { groupNo } = useParams()
    const { data, refetch } = useQuery({
        queryKey: ['lastSevenSession', ],
        queryFn: async () => {
            const { data } = await axiosPublic(`/lastSevenSessionInfo/groupNo/${groupNo}`)
            return data;
        }
    })
    if (groupNo) {
        refetch()
    }

    const { membersProfile = [], lastSevenSessionAttendance = [] } = data || {}


    const isMcPresent = (mcID) => {


        try {
            let presentCount = 0
            lastSevenSessionAttendance[0]?.forEach(item => {
                if (item.presented.includes(mcID)) {
                    return presentCount = presentCount + 1
                }
            })
            return presentCount
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="overflow-x-auto">
            <div className="text-2xl mb-4 font-bold text-center">
                <h1 >Last 7 session record</h1>
            </div>

            <table className="table table-xs">
                <thead>
                    <tr className="font-bold text-green-500 mb-2 border-r-2 border-b border-gray-400">
                        <th>Sl. No</th>
                        <th>Name</th>
                        <th>MC ID</th>
                        {
                            lastSevenSessionAttendance[0]?.map(({ sessionNo }) => <th key={sessionNo}>
                                {sessionNo}
                            </th>)
                        }
                        <th>Present</th>
                    </tr>

                </thead>
                <tbody>
                    {membersProfile?.map(({ name, mcID }, index) => {
                            const presentCount = isMcPresent(mcID)
                            const persentageOfPresent = (presentCount / 7) * 100

                        return (
                            <tr key={mcID} className="border-r border-gray-400">
                                <th>{index + 1}</th>
                                <td className="capitalize">{name}</td>
                                <td className="uppercase">{mcID}</td>
                                {
                                    lastSevenSessionAttendance[0]?.map(({ presented, sessionNo }) => <td key={sessionNo}>
                                        {presented.includes(mcID) ? 'P' : <span className="text-red-400">A</span>}
                                    </td>
                                    )
                                }
                                <td>{persentageOfPresent.toFixed(0)< 50 ? <span className="text-red-400">{persentageOfPresent.toFixed(0)}%</span> : <span>{persentageOfPresent.toFixed(0)}%</span>}</td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>
        </div>
    )
}
export default LastSevenSessionInfo;