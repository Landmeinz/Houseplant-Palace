import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AdminPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const userList = useSelector((store) => store.userList);
  console.log('------- this is the userList inside of the Admin Page', userList);

  return (
    <div>
      <h2>ADMIN PAGE</h2>
      {/* {userList.map(user => (
        <p>USER: {user.username} ACCESS LEVEL: {user.access_level}</p>
      ))} */}
    </div>
  )
}; // AdminPage

export default AdminPage;
