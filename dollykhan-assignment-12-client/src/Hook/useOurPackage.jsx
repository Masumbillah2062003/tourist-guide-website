import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useOurPackage = () => {
    const axiosPublic = useAxiosPublic()
    
    const {data: ourPackages = [], isLoading} = useQuery({
        queryKey: ['tourPackages'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/tourPackages')
            return res.data
        }
    })

    return [ourPackages, isLoading]
};

export default useOurPackage;