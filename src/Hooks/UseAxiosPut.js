import { useState } from "react";
import { privateAxios } from "./Axios";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import { showSnackbar } from "../store/snackbarSlice";

const useAxiosPut = (url) => {
  const [data, setData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const queryClient = useQueryClient();
  // const dispatch = useDispatch();

  const putData = async (putData, addUrl = "", invalidateQueryKeys = []) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSuccessMessage("");

    try {
      const response = await privateAxios.put(url + addUrl, putData, {
        onUploadProgress: (progressEvent) => {
          const prog = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(prog);
        },
      });

      setData(response.data);
      setResponseData(response);
      setSuccess(true);
      setSuccessMessage(response.data.message);

      // if (location.pathname.split("/")[1] !== "NotificationsAndReports") {
      //   dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
      // }

      // Invalidate react-query caches
      invalidateQueryKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      return response;
    } catch (err) {
      console.error(err);

      const errorMessage = () => {
        if (err.response && err.response.data?.errors) {
          return Object.values(err.response.data.errors).join("\n");
        } else if (err.response?.data?.message) {
          return err.response.data.message;
        } else {
          return "حدث خطأ أثناء التحديث.";
        }
      };

      setError(err);

      // if (url !== "markets/sendToken") {
      //   dispatch(showSnackbar({ message: errorMessage(), severity: "error" }));
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
    success,
    successMessage,
    responseData,
    putData,
  };
};

export default useAxiosPut;



// const { putData, loading, success } = useAxiosPut("products/update/");

// await putData(updatedProduct, "123", [["fetchData", "/api/user"]]);
