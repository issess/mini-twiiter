import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, canGoBack, children }: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <div>
        <div className="w-full h-16 max-w-xl justify-center px-10 border-b fixed text-slate-800 flex items-center">
          {canGoBack ? (
            <button onClick={onClick} className="absolute left-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
          ) : null}
          <div className="flex flex-col justify-center items-center">
            <Link href="/">
              <a className="text-3xl font-semibold">Mini Twitter</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex pt-16 flex-col space-y-5 divide-y">{children}</div>
    </div>
  );
}
