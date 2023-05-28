import React, { ReactElement, ReactNode } from "react";
import Sidebar from "../sidebar/sidebar";
import Header from "@/common/Header/header";
interface LayoutProp {
  children: ReactNode;
  showSearch?: boolean;
  title: string;
}
const Layout: React.FC<LayoutProp> = ({
  children,
  showSearch = false,
  title,
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex-col bg-white p-6 overflow-y-auto">
        <Header title={title} showSearch={showSearch}></Header>
        <div className="pt-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
export function getAppLayout(
  page: ReactElement,
  title: string,
  showSearch?: boolean,
) {
  return (
    <Layout showSearch={showSearch} title={title}>
      {page}
    </Layout>
  );
}
