import React from 'react';
import EditGearForm from "./EditGearForm.jsx";
import {api} from "../api.js";


function EditFormDialog({ onClose, initialData }) {
    const {edit_gear} = api()

  return (
    <div className="dialog-overlay">
      <div className="dialog-content flex flex-col justify-items-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-xl max-w-lg focus:outline-none bg-black">
        <button onClick={onClose}>Close</button>
        <EditGearForm data={initialData} onSubmit={(updatedData) => {

          edit_gear(updatedData)
          onClose();
        }} />
      </div>
    </div>
  );
}
export default EditFormDialog;