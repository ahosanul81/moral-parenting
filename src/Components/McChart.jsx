import { useState } from "react";
import { Link } from "react-router-dom";


const McChart = ({ th1, th2, th3, th4, th5, data }) => {


    return (
        <div className="overflow-x-auto">
            <table className="table">

                {data?.length > 0 && <thead>
                    <tr>
                        <th>{th4}</th>
                        <th>{th1}</th>
                        <th>{th2}</th>
                        <th>{th3}</th>
                        {th5 && <th>{th5}</th>}

                    </tr>
                </thead>}
                <tbody>

                    {
                        data?.map(({ name, mcID, universityName, userCredential }, index) =>
                            <tr key={mcID}>
                                <th>{index + 1}</th>
                                <td className="capitalize">{name}</td>
                                <td className="capitalize">{universityName}</td>
                                <td className="uppercase">{mcID}</td>
                                {th5 &&
                                    <th>
                                        <Link to={`/profile/${userCredential.email}`}>
                                            <button className="btn btn-ghost btn-xs">Go to profile</button>
                                        </Link>
                                    </th>}
                            </tr>)
                    }


                </tbody>
            </table>
        </div>
    )
}

export default McChart;