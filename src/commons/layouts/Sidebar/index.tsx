import React from "react"

interface SidebarPropArg { }

export const Sidebar: React.FC<SidebarPropArg> = () => {
    return (
       <aside>This is Sidebar</aside>
    )
}

Sidebar.displayName = "Sidebar"
