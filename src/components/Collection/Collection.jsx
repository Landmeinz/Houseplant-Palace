import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Collection(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const photos = useSelector((store) => store.photos);
  const [heading, setHeading] = useState('Functional Component');

  const sxPhotoBox = {
    border: 1,
    m: 2,
    overflow: 'scroll',

  }

  return (
    <Box sx={sxPhotoBox}>
      <h2>COLLECTION OF PLANTS</h2>

      {photos.map(photo => (
        <div key={photo.id}>
          <img src={photo.photo_url} />
          <p>{photo.date_uploaded.split(`T`)[0]}</p>
        </div>
      ))}

    </Box>
  );
}

export default Collection;
