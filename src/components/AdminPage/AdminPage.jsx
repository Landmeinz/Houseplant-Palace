import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// --- MUI --- // 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouteMatch } from 'react-router';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AdminPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_LIST' });
  }, [dispatch]);

  const userList = useSelector((store) => store.userList);

  console.log('------- this is the userList inside of the Admin Page', userList);

  return (
    <div>
      <h2>ADMIN PAGE</h2>

      <TableContainer>
        <Table
          sx={{ minWidth: 345 }}
          aria-label="simple table"
          size="small"
        >
          <TableHead >
            <TableRow >
              <TableCell align="center" size="medium">Username</TableCell>
              <TableCell align="center">Access Level</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.access_level}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}; // AdminPage

export default AdminPage;
