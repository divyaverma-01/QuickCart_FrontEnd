import "./css/satoshi.css";
import "./css/style.css";
// import "./css/euclid-circular-a-font.css";
// import "./css/style.css";

import { Sidebar } from "@/components/Admin/Layouts/sidebar";

// import "flatpickr/dist/flatpickr.min.css";
// import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Admin/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";

export const metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-2 md:p-4 2xl:p-6">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

//ISSUE WITH DARK THEME -- text not visible then
//redirect link for all the sidebar options
//also when you hover over it toh it blends with the bg
