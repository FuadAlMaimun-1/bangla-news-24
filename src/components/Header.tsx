import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  const data = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div>
        <div className="flex items-center justify-center p-4 w mx-auto max-w-7xl w-full relative">
  
      <Link href='/' className="flex items-center gap-4">
        <Image src="/logo.webp" width={50} height={40} alt="logo" />

        <div>
          <h1 className="text-4xl font-bold">Bangla News 24</h1>
          <p>{data}</p>
        </div>
      </Link>

    <UserInfo />
    
    </div>

    <div className="flex items-center justify-center p-4 mx-auto max-w-7xl relative">
        <NavLink />
    </div>
    </div>
  );
};

export default Header;
