import { lazy } from "react";

const NavBar = lazy(() => import("./NavBar"));
const CreateContactForm = lazy(() => import("./CreateContact"));
const EditContactForm = lazy(() => import("./EditContact"));

export { NavBar, CreateContactForm, EditContactForm };
