import React, {useEffect, useRef, useState} from "react";
import {api} from "../api.js";

import img from "../assets/react.svg"

import EditBioDialog from "../components/EditBioDialog.jsx";


const ProfilePage = () => {
    const [isRefOpen, setIsRefOpen] = useState(false)
    const [isdropdownRefOpen, setisdropdownRefOpen] = useState(false)

    const ref = useRef(null)
    const dropdownRef = useRef(null)
    const [formData, setFormData] = useState({})
    const {get_user_info, userInfo} = api()


    useEffect(() => {

        get_user_info()
    }, [get_user_info]);

    useEffect(() => {
        if (isRefOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
    }, [isRefOpen])

    useEffect(() => {
        if (isdropdownRefOpen) {
     dropdownRef.current?.showModal();
    } else {
     dropdownRef.current?.close();
    }
    }, [isdropdownRefOpen])



    const handleDropdown = () => {
        if (!dropdownRef) {
            return
        }
        setisdropdownRefOpen(true)
        dropdownRef.current.hasAttribute("open")
            ? dropdownRef.current.close()
            : dropdownRef.current.showModal()
    }

    function toggleEditBioDialog() {
        if (!ref) {
            return
        }
        setisdropdownRefOpen(false)
        setIsRefOpen(true)
        setFormData(userInfo)
        ref.current.hasAttribute("open")
            ? ref.current.close()
            : ref.current.showModal()
        get_user_info()

    }

    return (
        <div className={"flex container flex-col w-full items-center justify-center h-lvh"}>
            <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown"
                            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                            type="button"
                            onClick={handleDropdown}
                            onCancel={() => setisdropdownRefOpen(false)}
                    >
                        <span className="sr-only">Open dropdown</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 16 3">
                            <path
                                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>
                    {/*${!show ? "hidden" : "absolute m-0 transform translate-12 z-10"}*/}
                    <dialog ref={dropdownRef}
                            className={`absolute top-1/2 left-1/2 transform translate-x-8 -translate-y-6 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-30 dark:bg-gray-700`}
                            onClick={(e) => {
                                if (e.currentTarget === e.target) {
                                    handleDropdown();
                                }
                            }}

                    >

                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <div
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    onClick={() => toggleEditBioDialog()}
                                >Edit
                                </div>
                            </li>
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                            </li>
                        </ul>
                    </dialog>
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={img}
                         alt=""/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userInfo?.firstname} {userInfo?.lastname}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                    <div className="flex mt-4 md:mt-6">
                        <a href="#"
                           className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                        >Edit Bio

                        </a>
                        <a href="#"
                           className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                    </div>
                </div>
                <EditBioDialog
                    toggleDialog={toggleEditBioDialog}
                    initialData={formData}
                    ref={ref}
                    onClose={toggleEditBioDialog}
                />
            </div>
        </div>


    )

}

export default ProfilePage