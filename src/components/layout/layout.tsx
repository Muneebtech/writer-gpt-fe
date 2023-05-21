import React, { ReactElement, ReactNode } from 'react'
import Sidebar from '../sidebar/sidebar'
interface LayoutProp {
    children: ReactNode
}
const Layout: React.FC<LayoutProp> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-white p-6 overflow-y-auto">{children}</main>
        </div>
    )
}

export default Layout;
export function getAppLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  }