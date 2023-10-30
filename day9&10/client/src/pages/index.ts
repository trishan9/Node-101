import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const DashBoard = lazy(() => import("./DashBoard"));
const RecentlyDeleted = lazy(() => import("./RecentlyDeleted"));
const AddNewContact = lazy(() => import("./AddNewContact"));
const EditContact = lazy(() => import("./EditContact"));

export { Home, DashBoard, RecentlyDeleted, AddNewContact, EditContact };
