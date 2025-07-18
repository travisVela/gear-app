import {forwardRef, useState} from "react";

const Dialog = forwardRef(({children, toggleDialog}, ref) => {
    const [isopen, setIsOpen] = useState(false)

    const handleClick = (e) => {
        // setIsOpen(!isopen)

        if (e.currentTarget === e.target) {

            toggleDialog()
            setIsOpen(!isopen)
        }
        console.log(isopen)
    }
    return (
        <dialog
            ref={ref}
            onClick={handleClick}
            className={`${isopen === true ? "flex flex-col justify-items-center items-center" : ""} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-xl max-w-lg focus:outline-none`}
        >
            {children}

            <button onClick={toggleDialog} className={"flex mt-4 "}>X</button>
        </dialog>

    )
})

export default Dialog

