import Link from "next/link";
import { useSidebarContext } from "./sidebar-context";

export function MenuItem(props) {
  const { toggleSidebar, isMobile } = useSidebarContext();

  const getBaseClasses = (isActive, isLink) => {
    const base =
      "rounded-lg px-3.5 font-medium text-gray-700 transition-all duration-200";
    const active =
      "bg-[rgba(87,80,241,0.07)] text-gray-900 font-semibold hover:bg-[rgba(87,80,241,0.07)]";
    const inactive = "hover:bg-blue hover:text-gray-900";

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
