import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { MpContext } from '../Context/ContextProvider';

const useAdmin = () => {
    const { user } = useContext(MpContext)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            if (user.email) {
                const { data } = await axiosSecure.get(`/users/admin/${user?.email}`)
                return data;
            }

        }
    })
    // console.log(isAdmin);
    return isAdmin
};

export default useAdmin;