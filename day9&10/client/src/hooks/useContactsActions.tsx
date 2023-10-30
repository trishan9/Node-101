import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IContacts } from "../interfaces/contacts.interface";
import { useNavigate } from "react-router-dom";

const useContactsActions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createNewContact = useMutation({
    mutationFn: (data: IContacts | object) => {
      const result = axios.post("http://localhost:3000/contacts", data);
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allContacts"] });
      navigate("/dashboard");
    },
  });

  const editContact = useMutation({
    mutationFn: async (payload: IContacts) => {
      console.log(payload);
      const result = await axios.patch(
        `http://localhost:3000/contacts/${payload.id}`,
        {
          ...payload,
        }
      );
      console.log(result);
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allContacts"],
      });
      navigate("/dashboard");
    },

    onError: () => {
      console.log("error");
    },
  });

  const deleteContactTemporarily = useMutation({
    mutationFn: (id: number) => {
      const result = axios.patch(`http://localhost:3000/contacts/${id}`, {
        isRecentlyDeleted: true,
      });
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allContacts"],
      });
    },
  });

  const deleteContactPermanently = useMutation({
    mutationFn: (id: number) => {
      const result = axios.delete(`http://localhost:3000/contacts/${id}`);
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allDeletedContacts"],
      });
    },
  });

  const restoreContact = useMutation({
    mutationFn: (id: number) => {
      const result = axios.patch(`http://localhost:3000/contacts/${id}`, {
        isRecentlyDeleted: false,
      });
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allDeletedContacts"],
      });
    },
  });

  return {
    createNewContact,
    editContact,
    deleteContactTemporarily,
    deleteContactPermanently,
    restoreContact,
  };
};

export default useContactsActions;
