import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { NavBar } from "./components";
import {
  Home,
  DashBoard,
  EditContact,
  AddNewContact,
  RecentlyDeleted,
} from "./pages";

const App = () => {
  return (
    <div className="w-full font-primary bg-light min-h-[100vh]">
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>Loading</p>}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<p>Loading</p>}>
              <DashBoard />
            </Suspense>
          }
        />

        <Route
          path="/edit-contact/:id"
          element={
            <Suspense fallback={<p>Loading</p>}>
              <EditContact />
            </Suspense>
          }
        />

        <Route
          path="/add-contact"
          element={
            <Suspense fallback={<p>Loading</p>}>
              <AddNewContact />
            </Suspense>
          }
        />

        <Route
          path="/recently-deleted"
          element={
            <Suspense fallback={<p>Loading</p>}>
              <RecentlyDeleted />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
