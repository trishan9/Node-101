import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "@mui/material";
import axios from "axios";
import formSchema from "./formSchema";
import useContactsActions from "../../hooks/useContactsActions";

const EditContactForm = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const getContactData = async () => {
      const response = await axios.get(`http://localhost:3000/contacts/${id}`);
      console.log(response);
      reset({
        name: response.data.name,
        phone: response.data.phone,
        gmail: response.data.gmail,
      });
    };
    getContactData();
  }, [id]);

  const { editContact } = useContactsActions();

  const handleCreateContact = (data: any) => {
    const payload = {
      ...data,
      id: id,
    };
    editContact.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateContact)}>
      <div className="grid grid-cols-2 gap-10 my-8">
        <div className="flex flex-col gap-1">
          <label>Name</label>

          <input
            type="text"
            {...register("name")}
            className="px-3 py-2 border rounded-sm outline-none focus:ring-1 focus:ring-blue-500"
          />

          {errors?.name && (
            <p className="text-sm text-red-500">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Phone Number</label>

          <input
            type="number"
            {...register("phone")}
            className="px-3 py-2 border rounded-sm outline-none focus:ring-1 focus:ring-blue-500"
          />

          {errors?.phone && (
            <p className="text-sm text-red-500">
              {errors.phone.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col col-span-2 gap-1">
          <label>Email Address</label>

          <input
            type="email"
            {...register("gmail")}
            className="px-3 py-2 border rounded-sm outline-none focus:ring-1 focus:ring-blue-500"
          />

          {errors?.gmail && (
            <p className="text-sm text-red-500">
              {errors.gmail.message as string}
            </p>
          )}
        </div>

        <Tooltip title="Update Contact" placement="bottom">
          <button
            type="submit"
            className="col-span-2 py-3 transition-all ease-in-out border rounded-sm bg-secondary hover:bg-yellow-500 disabled:hover:bg-yellow-200 disabled:bg-yellow-200"
          >
            Update Contact
          </button>
        </Tooltip>
      </div>
    </form>
  );
};

export default EditContactForm;
