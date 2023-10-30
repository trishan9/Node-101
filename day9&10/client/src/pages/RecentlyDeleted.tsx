import { ArchiveRestoreIcon, Trash2Icon } from "lucide-react";
import { Tooltip } from "@mui/material";
import { useContactsStates, useContactsActions } from "../hooks";
import type { IContacts } from "../interfaces/contacts.interface";

const RecentlyDeleted = () => {
  const { isLoadingDeleted: isLoading, deletedData: data } =
    useContactsStates();
  const { restoreContact, deleteContactPermanently } = useContactsActions();

  const handleRestore = (id: number) => {
    restoreContact.mutate(id);
  };

  const handleDelete = (id: number) => {
    deleteContactPermanently.mutate(id);
  };

  return (
    <div className="w-full p-8 ">
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center justify-between p-4 px-6 text-lg font-semibold bg-white border rounded-md">
          <p>Name</p>

          <p className="ml-12">Contact Number</p>

          <p className="mr-20">Email Address</p>

          <p>Options</p>
        </div>

        {isLoading && <p className="p-4 px-6">Loading...</p>}

        {data?.data.map(({ name, phone, id, gmail }: IContacts) => (
          <div
            key={id}
            className="flex items-center justify-between px-6 pb-8 border-b"
          >
            <p>{name}</p>

            <p>{phone}</p>

            <p>{gmail}</p>

            <div className="flex justify-between gap-2">
              <Tooltip title="Restore Contact" placement="bottom">
                <button
                  onClick={() => handleRestore(id)}
                  className="p-2 transition-all ease-in-out bg-white border rounded-md hover:bg-gray-100"
                >
                  <ArchiveRestoreIcon className="w-5" />
                </button>
              </Tooltip>

              <Tooltip title="Delete Permanently" placement="bottom">
                <button
                  onClick={() => handleDelete(id)}
                  className="p-2 transition-all ease-in-out bg-white border rounded-md hover:bg-gray-100"
                >
                  <Trash2Icon className="w-5 text-red-500" />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyDeleted;
