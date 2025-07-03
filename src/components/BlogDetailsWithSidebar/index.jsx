import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SearchForm from "../Blog/SearchForm";
import LatestPosts from "../Blog/LatestPosts";
import LatestProducts from "../Blog/LatestProducts";
import blogData from "../BlogGrid/blogData";
import shopData from "../Shop/shopData";
import Image from "next/image";

const BlogDetailsWithSidebar = () => {
  return (
    <>
      <Breadcrumb
        title={"Blog Details With Sidebar"}
        pages={["blog details sidebar"]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Blog Content */}
            <div className="w-full lg:w-2/3">
              <div className="rounded-2xl overflow-hidden shadow-md mb-8">
                <Image
                  src="/images/blog/blog-details-01.png"
                  alt="Blog"
                  width={750}
                  height={477}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="mb-4 text-sm text-gray-500 flex items-center gap-4">
                <a href="#" className="hover:text-blue-600 transition">
                  Mar 27, 2022
                </a>
                <span className="h-4 w-px bg-gray-300"></span>
                <a href="#" className="hover:text-blue-600 transition">
                  300k Views
                </a>
              </div>

              <h2 className="text-2xl xl:text-4xl font-semibold text-gray-800 mb-6 leading-snug">
                What information is needed for shipping?
              </h2>

              <div className="space-y-6 text-gray-600 text-base leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer sit amet eros ac ipsum egestas dapibus.
                </p>
                <p>
                  Nunc faucibus libero sem, quis placerat nisl pellentesque
                  eget. Morbi porta velit ut leo sollicitudin.
                </p>
                <p>
                  Quis enim lobortis scelerisque fermentum. Neque sodales ut
                  etiam sit amet.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Digital marketplace for Ui/Ux designers.
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Consectetur adipiscing elit in voluptate velit.</li>
                  <li>Mattis vulputate cupidatat.</li>
                  <li>
                    Vulputate enim nulla aliquet porttitor odio pellentesque.
                  </li>
                  <li>Ligula ullamcorper malesuada proin.</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm my-10 text-center">
                <p className="italic text-gray-700 max-w-xl mx-auto">
                  ‘‘Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod incididunt utionals labore et dolore magna aliqua
                  quis fermentum.’’
                </p>
                <div className="mt-6 flex justify-center items-center gap-3">
                  <Image
                    src="/images/users/user-04.jpg"
                    alt="user"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      Jhon Drineo
                    </p>
                    <p className="text-xs text-gray-500">Entrepreneur</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-gray-600 text-base leading-relaxed">
                <p>
                  Consectetur adipiscing elit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Nunc faucibus libero sem, quis placerat nisl pellentesque
                  eget.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 mt-10">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-gray-700 font-medium">
                    Tags:
                  </span>
                  {["Desktop", "Macbook", "PC"].map((tag) => (
                    <a
                      key={tag}
                      href="#"
                      className="text-sm border border-gray-300 py-1.5 px-3 rounded-md text-gray-700 hover:bg-blue-600 hover:text-white transition"
                    >
                      {tag}
                    </a>
                  ))}
                </div>

                <div className="flex gap-3">
                  {[
                    { bg: "#BD081C", icon: "/images/icons/pinterest.svg" },
                    { bg: "#0376A8", icon: "/images/icons/linkedin.svg" },
                    { bg: "#00ACEE", icon: "/images/icons/twitter.svg" },
                    { bg: "#1877F2", icon: "/images/icons/facebook.svg" },
                  ].map(({ bg, icon }, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-9 h-9 flex items-center justify-center rounded-full transition"
                      style={{ backgroundColor: bg }}
                    >
                      <Image src={icon} width={18} height={18} alt="icon" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-8 text-neutral-600">
              <SearchForm />
              <LatestPosts blogs={blogData} />
              <LatestProducts products={shopData} />

              {/* Popular Categories */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Popular Categories
                  </h2>
                </div>
                <div className="px-6 py-4 space-y-3">
                  {[
                    "Desktop",
                    "Laptop",
                    "Monitor",
                    "UPS",
                    "Phone",
                    "Tablet",
                    "Watch",
                    "Mouse",
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      className="group flex justify-between w-full text-sm text-gray-900 hover:text-blue-600 transition"
                    >
                      {item}
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-800 group-hover:bg-blue-600 group-hover:text-white transition">
                        {Math.floor(Math.random() * 50 + 1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
                </div>
                <div className="px-6 py-4 flex flex-wrap gap-3">
                  {[
                    "Desktop",
                    "Macbook",
                    "PC",
                    "Watch",
                    "USB Cable",
                    "Mouse",
                    "Windows PC",
                    "Monitor",
                  ].map((tag) => (
                    <a
                      key={tag}
                      href="#"
                      className="text-sm text-gray-900 border border-gray-300 py-1.5 px-3 rounded-md hover:bg-blue-600 hover:text-white transition"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsWithSidebar;
