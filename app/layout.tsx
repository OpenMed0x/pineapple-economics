import type { Metadata } from "next";
import "./globals.css";
import BrandLogo from "../components/BrandLogo";
import SidebarNav from "../components/SidebarNav";
import { NavProvider } from "../contexts/NavContext";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "pineapple economics - Financial Econometrics Terminal",
  description: "基于经济学原理与计量经济学的实时分析投资系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-white text-slate-900 min-h-screen flex antialiased selection:bg-amber-200 selection:text-slate-900">
        <NavProvider>
          <aside className="w-64 border-r border-slate-200 bg-slate-50/70 backdrop-blur flex flex-col justify-between p-4 sticky top-0 h-screen z-10">
            <div>
              <BrandLogo />
              <SidebarNav />
            </div>

            <div className="border-t border-slate-200 pt-4">
              <button className="flex w-full items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl text-sm font-medium transition-all">
                <Settings size={18} /> System Settings
              </button>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-8 bg-white">
            {children}
          </main>
        </NavProvider>
      </body>
    </html>
  );
}