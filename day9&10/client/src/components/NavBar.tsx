import clsx from "clsx";
import { useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menus from "../constants/menus";

const NavBar = () => {
  const [active, setActive] = useState<number | undefined>(1);
  const location = useLocation();

  useLayoutEffect(() => {
    const path = location.pathname;
    const index = menus.findIndex((menu) => menu.href === path);
    setActive(index + 1);
  }, [location]);

  const handleClick = (id: number) => {
    setActive(id);
  };

  return (
    <nav className="flex items-center justify-between px-5 py-6 text-white bg-primary">
      <Link to="/">
        <h1 className="text-2xl font-medium">ContactsX</h1>
      </Link>

      <ul className="flex gap-12">
        {menus.map((menu) => (
          <Link key={menu.id} to={menu.href}>
            <li
              onClick={() => handleClick(menu.id)}
              className={clsx(
                "font-medium transition-all ease-in-out border-b-2  hover:border-secondary",
                menu.id == active ? "border-secondary" : " border-transparent"
              )}
            >
              {menu.title}
            </li>
          </Link>
        ))}
      </ul>

      <span></span>
    </nav>
  );
};

export default NavBar;
