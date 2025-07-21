import {forwardRef, useState} from "react";

const Dialog = forwardRef(({children, toggleDialog}, ref) => {

    const handleClick = (e) => {
        if (e.currentTarget === e.target) {
            toggleDialog()
        }
    }

    return (
        <dialog
            ref={ref}
            onClick={handleClick}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-xl max-w-lg focus:outline-none`}
        >
            <div>
                {children}

                <button onClick={toggleDialog} className={"flex mt-4 "}>X</button>
            </div>
        </dialog>

    )
})

export default Dialog

