"use client";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { signInEmail } from "better-auth/api";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if(isPending) {
    return <div className="absolute right-4 mt-15">সাইন ইন করা হচ্ছে...</div>
  }

  console.log(user);



  return (
    <div className="absolute right-4 mt-15">
      {user ? (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-md">
          {/* User Info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
           <Link href="/profile">
              <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-red-500 ring-offset-2">
                <Image
                  src={user?.image as string}
                  alt={user?.name as string}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </div>

           </Link>
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
            </div>

            {/* Name */}
            <div className="hidden sm:block">
              <p className="text-xs text-gray-500">Welcome back</p>
              <h1 className="max-w-32 truncate text-sm font-bold text-gray-800">
                {user?.name}
              </h1>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block"></div>

         
        </div>
      ) : (
        <div>
          {/* Sign In */}
          <Link
            href="/sign-in"
            className="rounded-xl px-4  text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-red-600"
          >
            সাইন ইন
          </Link>

          {/* Sign Up */}
          <Link
            href="/sign-up"
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
