import React, {useEffect, useRef, useState} from 'react';

// import api from '../api.js';
import AddGearForm from "../components/AddGearForm.jsx";
import Dialog from "../components/Dialog.jsx";
import {api} from "../api"

const Home = () => {
    const {get_gear, save_new_gear, authUserGear} = api()
    const [gearList , setGearList] = useState(null)

    const [dialogContent, setDialogContent] = useState(null)
    const dialogRef = useRef(null)

    const columns = [
        {header: 'Type', accessor: 'type'},
        {header: 'Brand', accessor: 'brand'},
        {header: 'Model', accessor: 'model'},
        {header: 'SN', accessor: 'serial_number'},
        {header: 'Year', accessor: 'year'},
        {header: 'Description', accessor: 'description'},
    ];



    useEffect(() => {
        get_gear()
      }, [get_gear]);


    function toggleDialog(item) {
        if (!dialogRef) {
            return
        }

        setDialogContent(item)
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close(setDialogContent(null))
            : dialogRef.current.showModal()
    }



    // API ENDPOINTS

    const addGear = async (type, brand, model, serial_number, year, description) => {
        try {
            await save_new_gear( {
                type: type,
                brand: brand,
                model: model,
                serial_number: serial_number,
                year: year,
                description: description
            });
            // Refresh
            get_gear
        } catch (error) {
            console.error("Error adding gear", error);
        }
    };


    return (

        <div
            className="flex flex-row  items-center justify-center p-2 w-screen h-screen mt-2 divide-x-2 divide-sky-500">

            {/*column to set divide*/}
            <div className="flex flex-row items-center w-full justify-center h-3/4">

                {/*inventory column*/}
                {authUserGear > 0  ? <h1 className={"animate-pulse"}>...</h1> :
                    <div className="container w-full flex flex-col items-center justify-start p-8 h-lvh">
                        <h2 className="p-2 text-2xl">Gear List</h2>
                        <table className={"w-full"}>
                            <thead>
                            <tr className="flex flex-row  border-b border-b-sky-500  items-start justify-start w-full gap-10 space-x-3">
                                {columns.map((column, index) => (
                                    <th className="py-2 flex flex-col w-full items-start"
                                        key={`header-${index}`}>{column.header}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {/* Map over your data to render table rows and cells */}
                            {authUserGear?.map((item, rowIndex) => (
                                <tr
                                    className={`flex flex-row border-b border-b-slate-500 items-start justify-start w-full gap-10 space-x-3`}
                                    key={`row-${rowIndex}`}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td onClick={column.accessor === 'description' ? () => toggleDialog(item.description) : undefined}
                                            className={`py-2 flex flex-col w-full ${column.accessor === "description" ? "max-h-20 overflow-hidden hover:cursor-pointer text-sky-500 hover:text-sky-700 overflow-ellipsis min-w-24 underline" : ""}`}
                                            key={`cell-${rowIndex}-${colIndex}`}>{item[column.accessor]}

                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            {/*form column*/}
            <div className="container h-lvh flex flex-col flex-6/8 justify-center items-center">
                <h2 className="text-3xl ">Add gear here.</h2>
                <AddGearForm addGear={addGear}/>
            </div>
            <Dialog toggleDialog={toggleDialog} ref={dialogRef}>
                {dialogContent}
            </Dialog>


        </div>

    );
};

export default Home;