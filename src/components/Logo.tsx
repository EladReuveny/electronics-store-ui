import { Link } from "react-router";

type LogoProps = {};

const Logo = ({}: LogoProps) => {
  return (
    <Link
      to="/"
      className="font-bold tracking-tight text-2xl flex items-center hover:text-shadow-[0_0_10px_var(--secondary-clr)]"
    >
      Electron
      <img src="/bolt.svg" className="size-6" />
      cs
    </Link>
  );
};

export default Logo;
