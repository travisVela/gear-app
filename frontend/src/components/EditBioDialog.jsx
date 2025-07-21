import {forwardRef} from 'react';

import {api} from "../api.js";
import EditBioForm from "./EditBioForm.jsx";


const EditFormDialog = forwardRef(({onClose, initialData, children}, ref) => {

    const {edit_user} = api()


    const handleClick = (e) => {

        if (e.currentTarget === e.target) {
            ref.current.hasAttribute("open")
            ? ref.current.close()
            : ref.current.showModal()
        }

    }

    return (
        <dialog
            ref={ref}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-xl max-w-lg focus:outline-none"
            onClick={handleClick}
        >
                <div>
                    {children}
                    <button onClick={handleClick}>X</button>
                    <EditBioForm data={initialData} onSubmit={(updatedData) => {

                        edit_user(updatedData)

                        onClose();
                    }}/>
                </div>
        </dialog>
    )
})
export default EditFormDialog;