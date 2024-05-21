import Link from "next/link";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links: any = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <FaBug />
      <ul className="flex space-x-6 ">
        {links.map((link: any) => {
          return <Link
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            href={link.href}
            key={link.href}
          >
            {link.label}{" "}
          </Link>;
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
