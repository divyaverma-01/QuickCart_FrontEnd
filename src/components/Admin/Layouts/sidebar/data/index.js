import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/merchant/dashboard",
        items: [],
      },
      {
        title: "Orders",
        icon: Icons.Table,
        url: "/merchant/orders",
        items: [],
      },
      {
        title: "Products",
        icon: Icons.FourCircle,
        url: "/merchant/products",
        items: [],
      },
      {
        title: "Transactions",
        icon: Icons.PieChart,
        url: "/merchant/transaction",
        items: [],
      },
      {
        title: "Profile",
        icon: Icons.User,
        url: "/merchant/account",
        items: [],
      },
      {
        title: "Calendar",
        icon: Icons.Calendar,
        url: "/merchant/calendar",
        items: [],
      },
    ],
  },
];
