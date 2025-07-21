import img from "../assets/react.svg";
import React, {forwardRef, useEffect, useState} from "react";

const EditBioForm = ({data, onSubmit, onClose}) => {
    const [bio, setBio] = useState(data)
    const [formState, setFormState] = useState(data);


    useEffect(() => {
        setFormState(data);
    }, [data]);


    const handleChange = (e) => {


        const {name, value} = e.target
        setFormState(prevState => ({...prevState, [name]: value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        onSubmit(formState)
    }

    return (
        <div className={"flex container flex-col w-full items-center justify-center h-lvh "}>
            <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                <div className="flex flex-col items-center pb-10">

                    <div className="flex mt-4 md:mt-6">
                        <form onSubmit={handleSubmit}>
                            <div className={"flex flex-col w-50"}>

                                <textarea
                                    value={formState.bio || ''}
                                    name={"bio"}
                                    onChange={handleChange}

                                    className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                                    rows="5"
                                    cols={"40"}
                                />
                            </div>
                            <div className={"flex flex-col w-50"}>

                                <input
                                    value={formState.username || ''}
                                    name={"username"}
                                    onChange={handleChange}

                                    className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"

                                />
                            </div>
                            <button className="m-2" type="submit" onClick={onClose}>Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBioForm