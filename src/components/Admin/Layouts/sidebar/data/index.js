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
        title: "Onboarding",
        icon: Icons.User,
        url: "/merchant/onboarding",
        items: [
          {
            title: "Registration",
            url: "/merchant/account/register",
          },
          {
            title: "KYC Submission",
            url: "/merchant/account/kyc",
          },
          {
            title: "Account Status",
            url: "/merchant/account/status",
          },
          {
            title: "Onboarding Dashboard",
            url: "/merchant/onboarding",
          },
        ],
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
        title: "Calendar",
        icon: Icons.Calendar,
        url: "/merchant/calendar",
        items: [],
      },
    ],
  },
];
