import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a className="fixed hover:bg-slate-500 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-8 right-8 shadow-xl bg-slate-400 rounded-full w-16 flex items-center justify-center text-white">
        {children}
      </a>
    </Link>
  );
}
