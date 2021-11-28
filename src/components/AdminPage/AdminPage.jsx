import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

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

  const sxAdminContainer = {
    display: 'flex',
    flexDirection: 'column',
  }

  const sxAdminH2 = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 250,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1,
    p: 1,
    mx: 'auto',
    
  }

  return (
    <Box sx={sxAdminContainer}>

      <Typography sx={sxAdminH2} color="info.main"><h2>ADMIN - All Users</h2></Typography>
      
      <TableContainer>
        <Table
          sx={{ width: 345 }}
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
    </Box>
  )
}; // AdminPage

export default AdminPage;
