"use client";

import React from "react";
import { TextInput, Button } from "@tremor/react";
import { FaLinkedin, FaUserCircle } from "react-icons/fa";
import { RiSearchLine } from "@remixicon/react";
import { RiMapPinLine } from "@remixicon/react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 bg-white p-4">
      <div className="mx-auto w-[95%] lg:w-[70%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            {/* LinkedIn Icon */}
            <Link href="/">
              <FaLinkedin size={37} color="blue" />
            </Link>

            {/* Search Input */}
            <TextInput
              placeholder="Title, skill or company"
              className="bg-white text-gray-500"
              icon={RiSearchLine}
            />

            {/* Location Input */}
            <TextInput placeholder="Remote" icon={RiMapPinLine} />

            {/* Search Button */}
            <Button className="bg-white text-blue-600 hover:bg-white hover:text-blue-900">
              Search
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link href="/jobs/post">
              <Button className="bg-blue-600 text-white hover:bg-white hover:text-blue-600">
                Create Your Job
              </Button>
            </Link>
            <FaUserCircle size={30} color="gray" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
