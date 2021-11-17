import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlantDetails(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedPlant = useSelector((store) => store.selectedPlant);
    const current_date = useSelector((store) => store.current_date);
    // const [heading, setHeading] = useState('Functional Component');

    console.log('--- these are the selected plants', selectedPlant);

    return (
        <div>
            <h2>PLANT DETAILS</h2>
            {selectedPlant.map(plant => (
                <div key={plant.id}>
                    <img src={plant.photo_url} />
                    <p>{plant.date_uploaded.split(`T`)[0]}</p>
                </div>
            ))}
        </div>
    );
}

export default PlantDetails;
