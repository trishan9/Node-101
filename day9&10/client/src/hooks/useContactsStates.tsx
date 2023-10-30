import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useContactsStates = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allContacts"],
    queryFn: () => {
      const result = axios.get("http://localhost:3000/contacts");
      return result;
    },
  });

  const {
    isLoading: isLoadingDeleted,
    data: deletedData,
    error: deletedError,
  } = useQuery({
    queryKey: ["allDeletedContacts"],
    queryFn: () => {
      const result = axios.get("http://localhost:3000/contacts/deleted");
      return result;
    },
  });

  return {
    isLoading,
    isLoadingDeleted,
    data,
    deletedData,
    error,
    deletedError,
  };
};

export default useContactsStates;
