
import { useState } from "react";
import { privateAxios } from "./Axios";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import { showSnackbar } from "../store/snackbarSlice";

const useAxiosPost = (url) => {
    const [data, setData] = useState(null);
    const [responseData, setResponseData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const location = useLocation();
    const queryClient = useQueryClient();
    // const dispatch = useDispatch();

const postData = async (postData, addUrl = "", invalidateQueryKeys = []) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setSuccessMessage("");
        try {
            const response = await privateAxios.post(url + addUrl, postData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setProgress(progress);
                },
            });
            setData(response.data);
            console.log(response.data);
            
            setResponseData(response);
            setSuccess(true);
            setSuccessMessage(response.data.message);

            // if (location.pathname.split('/')[1] !== 'NotificationsAndReports') {
            //     dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
            // }

            invalidateQueryKeys.forEach(key => {
                queryClient.invalidateQueries({ queryKey: key });
              });
            return response;
        } catch (err) {
            console.error(err);
            const errorMessage = () => {
                if (err.response && err.response.data.errors) {
                    return Object.values(err.response.data.errors).join("\n");
                } else if (err.response && err.response.data.message) {
                    return err.response.data.message;
                } else {
                    return "حدث خطأ أثناء الإضافة .";
                }
            };
            setError(err);
            // if (url !== "markets/sendToken") {
            //     dispatch(showSnackbar({ message: errorMessage(), severity: "error" }));
            // }
            return err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        progress,
        postData,
        success,
        successMessage,
        responseData,
    };
};

export default useAxiosPost;


// await postData(myData, "", [["fetchData", "api/user"]]);
