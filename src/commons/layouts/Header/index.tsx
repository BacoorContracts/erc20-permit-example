import React from "react"

interface HeaderPropArg { }

export const Header: React.FC<HeaderPropArg> = () => {
    return (
       <header>This is Header</header>
    )
}

Header.displayName = "Header"
