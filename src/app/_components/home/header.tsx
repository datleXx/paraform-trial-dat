"use client";

import React from "react";
import { TextInput, Button, Divider } from "@tremor/react";
import { FaUserCircle } from "react-icons/fa";
import { RiSearchLine } from "@remixicon/react";
import { RiMapPinLine } from "@remixicon/react";
import Link from "next/link";
import Logo from "./logo";
import { RiMenu3Fill } from "@remixicon/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Card } from "@tremor/react";

const Header = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-10 bg-white p-4">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            {/* LinkedIn Icon */}
            <Link href="/jobs">
              <Logo size={32} />
            </Link>

            {/* Search Input */}
            <div className="hidden md:block">
              <TextInput
                placeholder="Title, skill or company"
                className="bg-white text-gray-500"
                icon={RiSearchLine}
              />
            </div>

            {/* Location Input */}
            <div className="hidden md:block">
              <TextInput placeholder="Remote" icon={RiMapPinLine} />
            </div>

            {/* Search Button */}
            <div className="hidden md:block">
              <Button className="bg-white text-blue-600 hover:bg-white hover:text-blue-900">
                Search
              </Button>
            </div>
          </div>

          <div className="md:flex md:items-center md:justify-center md:gap-3">
            <Link href="/jobs/post" className="hidden md:block">
              <Button className="bg-blue-600 text-white hover:bg-white hover:text-blue-600">
                Create Your Job
              </Button>
            </Link>
            {session?.user.image ? (
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Image
                    src={session.user.image}
                    alt="User Image"
                    width={35}
                    height={35}
                    className="cursor-pointer rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <Card className="flex flex-col gap-2 !p-2">
                    <p className="cursor-pointer p-2 text-sm font-medium hover:bg-gray-50">
                      Profile
                    </p>
                    <Divider className="!my-0" />
                    <Link
                      href="/jobs/post"
                      className="cursor-pointer p-2 text-sm font-medium hover:bg-gray-50 md:hidden"
                    >
                      Post a Job
                    </Link>
                    <Divider className="!my-0 md:hidden" />
                    <p
                      onClick={handleSignOut}
                      className="cursor-pointer p-2 text-sm font-medium hover:bg-gray-50"
                    >
                      Sign Out
                    </p>
                  </Card>
                </PopoverContent>
              </Popover>
            ) : (
              <FaUserCircle size={30} color="gray" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
