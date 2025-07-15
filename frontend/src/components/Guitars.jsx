import React, { useEffect, useState } from 'react';
import AddGuitarForm from './AddGutiarForm';
import api from '../api';

const GuitarList = () => {
  const [guitars, setGuitars] = useState([]);

  const fetchGuitars = async () => {
    try {
      const response = await api.get('/guitars');
      setGuitars(response.data.guitars);

    } catch (error) {
      console.error("Error fetching guitars", error);
    }
  };

  const addGuitar = async (brand, model) => {

    try {
      await api.post('/guitars', { brand: brand, model: model });
      fetchGuitars();  // Refresh the list after adding a fruit
    } catch (error) {
      console.error("Error adding guitars", error);
    }
  };

  useEffect(() => {
    fetchGuitars();
  }, []);

  return (
    <div>
      <h2>Guitars List</h2>
      <div>
        {guitars.map((guitar, index) => (
          <div>
            <p key={index}>{index >= 0 ? guitar.brand : "nothing to see here"}  {index >= 0 ? guitar.model : "nothing to see here"}</p>

          </div>
        ))}
      </div>
      <AddGuitarForm addGuitar={addGuitar} />
    </div>
  );
};

export default GuitarList;