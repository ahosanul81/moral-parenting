import useAxiosPublic from "./useAxiosPublic";

const useGetTargetObject = (url) => {
    const axiosPublic = useAxiosPublic();

    const targetObject = async () => { 
        try {
            const { data } = await axiosPublic.get(url);
            return data;
        } catch (error) {
            console.log(error);
            return null; 
        }
    };

    return targetObject;
};

export default useGetTargetObject;
