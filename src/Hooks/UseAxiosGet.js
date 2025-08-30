
// import Swal from "sweetalert2";
import { privateAxios } from "./Axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// import { showSnackbar } from "../store/snackbarSlice";

const useAxiosGet = (url, displayLoading = true) => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const fetchData = async () => {
        if (!url || url.length < 1) return null;
        try {
            const response = await privateAxios.get(url);
            // if (response) Swal.close();
			console.log(response.data);
			console.log(response);
			
            return response.data;
        } catch (error) {
            console.error(error);
          
        }
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["fetchData", url],
        queryFn: fetchData,
        enabled: !!url,
        refetchOnWindowFocus: false,
    });
  const isEmpty = !isLoading && !error && (!data || !data.data || data.data.length === 0);

    return { data, loading: isLoading, error ,isEmpty};
};

export default useAxiosGet;
