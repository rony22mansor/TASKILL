
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "./Axios";

const useAxiosDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ url, displayAlert = true, invalidateQueryKey = [] }) => {
      console.log(url);
      console.log(invalidateQueryKey);
      
      if (displayAlert) {
        const confirmResult = await Swal.fire({
          title: "هل انت متأكد؟",
          text: "هل متأكد من حذف هذا العنصر؟",
          icon: "warning",
          iconColor: "red",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم",
          cancelButtonText: "لا",
        });

        if (!confirmResult.isConfirmed) {
          throw new Error("Cancelled by user");
        }
      }

      const response = await privateAxios.delete(url);
      return { response, invalidateQueryKey };
    },

    onSuccess: ({ response, invalidateQueryKey }) => {
      Swal.fire({
        title: "تم الحذف",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      if (invalidateQueryKey.length) {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
      }
    },

    onError: (error) => {
      if (error?.response?.status === 401) {
        navigate("/login");
        return;
      }

      Swal.fire({
        title: "لم يتم الحذف",
        html:
          error?.response?.data?.message ||
          Object.values(error?.response?.data?.errors || {})
            .flat()
            .join("<br>"),
        icon: "error",
      });
    },
  });

  return {
    deleteData: mutation.mutateAsync,
    deleteLoading: mutation.isLoading,
    response: mutation.data?.response || null,
  };
};

export default useAxiosDelete;


// const { deleteData, deleteLoading } = useAxiosDelete();
// deleteData({
//       url: `administrations/delete/${row.id}`,
//       invalidateQueryKey: ["fetchData", "administrations/index"],
//     });