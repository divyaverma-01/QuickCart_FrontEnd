"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { UserInfo } from "./user-info";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="rounded-lg border border-gray-300 bg-gray-900 text-white px-1.5 py-1 lg:hidden hover:bg-gray-800"
      >
        <MenuIcon className="text-white" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="font-medium">Admin Dashboard</p>
      </div>

      {/* Centered search bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary"
          />
          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>
      </div>

      <div className="flex items-center gap-2 min-[375px]:gap-4">
        <Notification />
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
