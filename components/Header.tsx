"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import useAuthModal from "@/hooks/useAuthModal";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!')
    }
  };

  return (
    <div
      className="
      h-fit
      bg-gradient-to-b
      from-emerald-800
      p-6
    "
    >
      <div
        className="
       w-full
       mb-4
       flex
       items-center
       justify-between
      "
      >
        <div
          className="
          hidden
          md:flex
          gap-x-2
          items-center
        "
        >
          <button
            onClick={() => router.back()}
            className="
              bg-black
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-opacity-75
              transition
          "
          >
            <RxCaretLeft className="text-white" size={36} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              bg-black
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-opacity-75
              transition
          "
          >
            <RxCaretRight className="text-white" size={36} />
          </button>
        </div>
        <div
          className="
          flex
          md:hidden
          gap-x-2
          items-center
        "
        >
          <button
            className="
            p-2
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
            p-2
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
          flex
          justify-between
          items-center
          gap-x-4
        "
        >
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button 
                onClick={handleLogout}
                className="bg-white px-4 py-2"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push('./account')}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                  bg-transparent
                  text-neutral-300
                  hover:text-white
                  font-medium
                "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                  text-black
                  bg-white
                  px-6
                  py-2
                "
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
