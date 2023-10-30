import { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import {
  CopyIcon,
  DownloadIcon,
  FileEditIcon,
  Trash2Icon,
  CheckCircle2Icon,
} from "lucide-react";
import clsx from "clsx";
import jsPDF from "jspdf";
// import { utils, writeFile } from "xlsx";
import { useContactsActions, useContactsStates } from "../hooks";
import type { IContacts } from "../interfaces/contacts.interface";

const DashBoard = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | undefined>(0);

  const { isLoading, data } = useContactsStates();
  const { deleteContactTemporarily } = useContactsActions();

  const handleCopy = (phone: string, id?: number) => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setCopiedId(id);

    setTimeout(() => {
      setCopied(false);
      setCopiedId(0);
    }, 1000);
  };

  const handleTemporaryDelete = (id: number) => {
    deleteContactTemporarily.mutate(id);
  };

  const generatePDF = ({
    name,
    phone,
    gmail,
  }: {
    name: string;
    phone: string;
    gmail: string;
  }) => {
    const doc = new jsPDF("portrait", "pt", "a4");
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Phone Number: ${phone}`, 20, 60);
    doc.text(`Email Address: ${gmail}`, 20, 90);
    doc.save(`${name}.pdf`);
  };

  // const generateXLS = ({ name, phone, gmail }: IContacts) => {
  //   console.log(name, phone, gmail);

  //   const worksheet = utils.json_to_sheet(data?.data);
  //   const workbook = utils.book_new();
  //   utils.book_append_sheet(workbook, worksheet, "Data");
  //   writeFile(workbook, `${name}.xlsx`);
  // };

  return (
    <div className="w-full p-8 ">
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center justify-between p-4 px-6 text-lg font-semibold bg-white border rounded-md">
          <p>Name</p>

          <p className="ml-12">Contact Number</p>

          <p className="mr-40">Email Address</p>

          <p>Options</p>
        </div>

        {isLoading && <p className="p-4 px-6">Loading...</p>}

        {!isLoading &&
          data?.data.map(({ name, phone, id, gmail }: IContacts) => (
            <div
              key={id}
              className="flex items-center justify-between px-6 pb-8 border-b"
            >
              <p>{name}</p>

              <p>{phone}</p>

              <p>{gmail}</p>

              <div className="flex justify-between gap-2">
                <Tooltip title="Edit Contact" placement="bottom">
                  <Link to={`/edit-contact/${id}`}>
                    <button className="p-2 transition-all ease-in-out bg-white border rounded-md hover:bg-gray-100">
                      <FileEditIcon className="w-5" />
                    </button>
                  </Link>
                </Tooltip>

                <Tooltip title="Download Contact Details" placement="bottom">
                  <button
                    onClick={() => generatePDF({ name, phone, gmail })}
                    className="p-2 transition-all ease-in-out bg-white border rounded-md hover:bg-gray-100"
                  >
                    <DownloadIcon className="w-5" />
                  </button>
                </Tooltip>

                <Tooltip title="Copy Contact" placement="bottom">
                  <button
                    onClick={() => handleCopy(phone, id)}
                    className={clsx(
                      "p-2 transition-all ease-in-out border rounded-md hover:bg-gray-100",
                      copied && copiedId == id ? "bg-gray-100" : "bg-white"
                    )}
                  >
                    {copied && copiedId == id ? (
                      <CheckCircle2Icon className="w-5" />
                    ) : (
                      <CopyIcon className="w-5" />
                    )}
                  </button>
                </Tooltip>

                <Tooltip title="Delete Temporarily" placement="bottom">
                  <button
                    onClick={() => handleTemporaryDelete(id)}
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

export default DashBoard;
