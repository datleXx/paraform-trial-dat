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
  return (
    <div className="fixed left-0 right-0 top-0 z-10 border-b bg-white p-4">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            {/* LinkedIn Icon */}
            <Link href="/jobs">
              <Logo size={32} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
