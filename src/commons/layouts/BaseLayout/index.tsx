import React from "react"
import dynamic from "next/dynamic"
import { CommonTypes } from "types/common"

const HeaderComponent = dynamic<CommonTypes.Object<any>>(() => import("commons/layouts/Header").then((mod) => mod.Header), {
    loading: () => <></>,
    ssr: true,
})

const SidebarComponent = dynamic<CommonTypes.Object<any>>(() => import("commons/layouts/Sidebar").then((mod) => mod.Sidebar), {
    loading: () => <></>,
    ssr: true,
})

const FooterComponent = dynamic<CommonTypes.Object<any>>(() => import("commons/layouts/Footer").then((mod) => mod.Footer), {
    loading: () => <></>,
    ssr: true,
})

interface BaseLayoutPropArg {
    children: React.ReactNode
}

export const SiteLayout = ({ children }: BaseLayoutPropArg): JSX.Element => <>{children}</>

export const BaseLayout = (page: React.ReactElement): JSX.Element => {
    return (
        <SiteLayout>
            <main>
                <HeaderComponent />
                <div className="app-content">
                    <SidebarComponent />
                    <div className="app-board">
                        <div className="app-board-inner">
                            {page}
                            <FooterComponent />
                        </div>
                    </div>
                </div>
            </main>
        </SiteLayout>
    )
}
