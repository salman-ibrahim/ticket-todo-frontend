import React from "react";

const Header = (props) => {
    const { children } = props

    return (
        <div className="flex items-center justify-center my-2 font-bold">
            <div className="bg-white rounded-3xl border shadow-xl p-8 w-3/4">
                {children}
            </div>
        </div>
    )
}

export default Header
