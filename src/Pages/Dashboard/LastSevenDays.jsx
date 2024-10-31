import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "../../Hooks/useAxiosPublic"


const LastSevenDays = () => {
    const axiosPublic = useAxiosPublic()
    const { data } = useQuery({
        queryKey: ['lastSevenSession'],
        queryFn: async () => {
            const { data } = await axiosPublic('/lastSevenSession')
            return data;
        }
    })

    const { allMc, lastSevenSessionPresented } = data || {}
    

    const isMcPresent = (mcID) => {

        
        try {
            let presentCount = 0
            lastSevenSessionPresented.forEach(item => {
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
                            lastSevenSessionPresented?.map(({ sessionNo }) => <th key={sessionNo}>
                                {sessionNo}
                            </th>)
                        }
                         <th>Present</th>
                    </tr>
                   
                </thead>
                <tbody>
                    {allMc?.map(({ name, mcID }, index) => {
                            const presentCount = isMcPresent(mcID)
                            const persentageOfPresent = (presentCount / 7) * 100

                        return (
                            <tr key={mcID} className="border-r border-gray-400">
                                <th>{index + 1}</th>
                                <td className="capitalize">{name}</td>
                                <td className="uppercase">{mcID}</td>
                                {
                                    lastSevenSessionPresented?.map(({ presented, sessionNo }) => <td key={sessionNo}>
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

export default LastSevenDays