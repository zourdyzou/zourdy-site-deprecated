import Link from "next/link";

import Socials from "./Socials";

export default function Footer() {
  return (
    <div className="my-10">
      <Socials center="center" />
      <nav className="mt-4 flex flex-wrap justify-center" aria-label="Footer">
        <div className="px-5 py-2">
          <Link href="/">
            <a className="text-base text-gray-300 hover:text-red-400">Home</a>
          </Link>
        </div>

        <div className="px-5 py-2">
          <Link href="/blog">
            <a className="text-base text-gray-300 hover:text-red-400">Blog</a>
          </Link>
        </div>

        <div className="px-5 py-2">
          <Link href="/services">
            <a className="text-base text-gray-300 hover:text-red-400">Services</a>
          </Link>
        </div>

        <div className="px-5 py-2">
          <Link href="/privacy">
            <a className="text-base text-gray-300 hover:text-red-400">Privacy</a>
          </Link>
        </div>

        <div className="px-5 py-2">
          <a
            href="https://zourdydev.vercel.app"
            target="none"
            className="text-base text-gray-300 hover:text-red-400">
            Portfolio
          </a>
        </div>
      </nav>
      <p className="mt-4 text-center text-base text-gray-400">
        &copy; {new Date().getFullYear()} Build by Muhammad Zourdy. All rights reserved.
      </p>
    </div>
  );
}

// ⚡😎💥🚀💷
// Adam Richardson Re-Design by
