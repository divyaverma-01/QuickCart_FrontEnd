import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = () => {
  return (
    <>
      <Breadcrumb title="Blog Details" pages={["blog details"]} />

      <section className="overflow-hidden py-20 bg-gray-100">
        <div className="max-w-[750px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="rounded-lg overflow-hidden mb-8">
            <Image
              className="rounded-lg"
              src="/images/blog/blog-details-01.png"
              alt="Blog header"
              width={750}
              height={477}
            />
          </div>

          <div>
            <span className="flex items-center gap-3 text-gray-500 mb-4 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Mar 27, 2022
              </a>
              <span className="block w-px h-4 bg-gray-300" />
              <a href="#" className="hover:text-blue-600 transition-colors">
                300k Views
              </a>
            </span>

            <h2 className="text-gray-800 text-2xl xl:text-3xl font-semibold mb-4">
              What information is needed for shipping?
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              sit amet eros ac ipsum egestas dapibus. Vivamus gravida, ex non
              placerat tincidunt, lorem felis facilisis tellus, vitae bibendum
              purus felis eget tellus.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Nunc faucibus libero sem, quis placerat nisl pellentesque eget.
              Morbi porta velit ut leo sollicitudin, a faucibus purus faucibus.
              Maecenas mollis dui nec metus euismod, sed aliquam risus luctus.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              enim lobortis scelerisque fermentum. Neque sodales ut etiam sit
              amet. Ligula ullamcorper malesuada proin libero nunc consequat
              interdum varius.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Digital marketplace for UI/UX designers
              </h3>

              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Consectetur adipiscing elit in voluptate velit.</li>
                <li>Mattis vulputate cupidatat.</li>
                <li>
                  Vulputate enim nulla aliquet porttitor odio pellentesque.
                </li>
                <li>Ligula ullamcorper malesuada proin.</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white shadow-sm pt-8 pb-6 px-6 my-10 border border-gray-200">
              <p className="italic text-center text-gray-800">
                ‘‘Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod incididunt utionals labore et dolore magna aliqua
                quis fermentum,,
              </p>

              <a
                href="#"
                className="flex items-center justify-center gap-4 mt-6"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/users/user-04.jpg"
                    alt="Author"
                    width={48}
                    height={48}
                  />
                </div>

                <div className="text-left">
                  <h4 className="text-gray-800 font-medium text-sm">
                    Jhon Drineo
                  </h4>
                  <p className="text-xs text-gray-500">Entrepreneur</p>
                </div>
              </a>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              consectetur adipiscing elit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat mattis vulputate
              cupidatat.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Morbi porta velit ut leo sollicitudin, a faucibus purus faucibus.
              Maecenas mollis dui nec metus euismod, sed aliquam risus luctus.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Quis enim lobortis scelerisque fermentum. Neque sodales ut etiam
              sit amet. Ligula ullamcorper malesuada proin libero nunc consequat
              interdum varius.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              sit amet eros ac ipsum egestas dapibus. Vivamus gravida, ex non
              placerat tincidunt.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 mt-12">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-gray-600">Popular Tags:</span>
                <ul className="flex flex-wrap gap-2">
                  {["Desktop", "Macbook", "PC"].map((tag) => (
                    <li key={tag}>
                      <a
                        href="#"
                        className="inline-block py-1.5 px-4 rounded-md border border-gray-300 bg-white text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-colors"
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { bg: "#BD081C", icon: "/icons/pinterest.svg" },
                  { bg: "#0376A8", icon: "/icons/linkedin.svg" },
                  { bg: "#00ACEE", icon: "/icons/twitter.svg" },
                  { bg: "#1877F2", icon: "/icons/facebook.svg" },
                ].map(({ bg, icon }, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center justify-center w-[35px] h-[35px] rounded-full"
                    style={{ backgroundColor: bg }}
                  >
                    <Image src={icon} alt="icon" width={16} height={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
