"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links: any = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <FaBug />
      <ul className="flex space-x-6 ">
        {links.map((link: any) => {
          return (
            <Link
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors":
                  link.href !== currentPath,
              })}
              href={link.href}
              key={link.href}
            >
              {link.label}{" "}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
