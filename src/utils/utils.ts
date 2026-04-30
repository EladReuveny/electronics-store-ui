import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleError = (err: unknown) => {
  console.error(err);

  if (err instanceof AxiosError) {
    toast.error(err.response?.data);
  } else if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error("An unknown error occurred");
  }
};
