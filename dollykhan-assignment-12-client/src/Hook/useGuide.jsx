import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGuide = () => {
    const { user, loading} = useAuth();

  const axiosSecure = useAxiosSecure()

  const { data: isGuide = [], isPending: isloading } = useQuery({
    enabled: !loading,
    queryKey: [user?.email, "isGuide"],
    queryFn: async() =>{
        const res = await axiosSecure.get(`/guideUser/guide/${user.email}`)
        return res.data?.guide
    }
  });

  return [isGuide, isloading];
};

export default useGuide;