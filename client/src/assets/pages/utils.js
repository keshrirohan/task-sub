import { toast } from "react-toastify";

export const handlesuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
  });
};

export const handlefailed = (msg) => {
  toast.error(msg, {
    position: "top-center",
  });
};
