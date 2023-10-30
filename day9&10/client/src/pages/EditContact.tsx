import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { EditContactForm } from "../components";

const EditContact = () => {
  return (
    <div className="p-8 my-24 mx-80">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <ArrowLeftIcon />
        </Link>

        <p className="text-xl">Edit Contact</p>
      </div>

      <EditContactForm />
    </div>
  );
};

export default EditContact;
