import Link from "next/link";
import { useSidebarContext } from "./sidebar-context";

export function MenuItem(props) {
  const { toggleSidebar, isMobile } = useSidebarContext();

  const getBaseClasses = (isActive, isLink) => {
    const base =
      "rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6";
    const active =
      "bg-[rgba(87,80,241,0.07)] text-primary hover:bg-[rgba(87,80,241,0.07)] dark:bg-[#FFFFFF1A] dark:text-white";
    const inactive =
      "hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white";

    const linkPadding = "relative block py-2";
    const buttonPadding = "flex w-full items-center gap-3 py-3";

    return [
      base,
      isActive ? active : inactive,
      isLink ? linkPadding : buttonPadding,
      props.className || "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        onClick={() => isMobile && toggleSidebar()}
        className={getBaseClasses(props.isActive, true)}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      aria-expanded={props.isActive}
      className={getBaseClasses(props.isActive, false)}
    >
      {props.children}
    </button>
  );
}
