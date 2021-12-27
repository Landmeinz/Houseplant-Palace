import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useLocation } from "react-router";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LoginPage from '../LoginPage/LoginPage.jsx';
import RegisterPage from '../RegisterPage/RegisterPage.jsx';
import Collection from '../Collection/Collection.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import PlantForm from '../PlantForm/PlantForm.jsx';
import Profile from '../Profile/Profile.jsx';
import PlantDetails from '../PlantDetails/PlantDetails.jsx';
import AdminPage from '../AdminPage/AdminPage.jsx';
import ScrollToTop from '../ScrollToTop/ScrollToTop.jsx';

// import './App.css';

// --- MUI --- //
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_PLANTS' });
    // dispatch({ type: 'FETCH_PHOTOS' });
    dispatch({ type: 'FETCH_CURRENT_DATE' })
  }, [dispatch]);

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, []);



  // let's set up a theme for our project
  const theme = createTheme({
    palette: {
      primary: {
        main: 'hsla(220, 80%, 50%, 1)',
        dark: 'hsla(220, 80%, 30%, 1)',
        light: 'hsla(220, 80%, 70%, 1)',
      },
      secondary: {
        main: 'hsla(45, 95%, 50%, 1.0)',
        dark: 'hsla(45, 80%, 30%, 1)',
        light: 'hsla(45, 80%, 70%, 1)',
      },
      error: {
        main: 'hsla(350, 80%, 50%, 1)',
      },
      info: {
        main: 'hsla(0, 5%, 20%, 1)',
        dark: 'hsla(0, 5%, 20%, 1)',
        light: 'hsla(0, 5%, 90%, 1)',
      }
    },
  });

  // container so that we can center our sxAppContent on the screen
  const sxApp = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }; // sxApp

  // constrain all content down to mobile sizing
  const sxAppContent = {
    border: '2px solid lightgray',
    width: 355,
    // width: 800,
    height: 725,
    // borderRadius: 4,
    overflow: 'auto',
  }; // sxAppContent


  return (

    <ThemeProvider theme={theme}>
      <Typography>

        <Router>
          <ScrollToTop>

            <Box sx={sxApp}>

              <Box sx={sxAppContent}>

                <Switch>
                  {/* Visiting localhost:3000 will redirect to localhost:3000/dashboard */}
                  <Redirect exact from="/" to="/dashboard" />

                  {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}

                  {/* Visiting localhost:3000/dashboard will show the user their dashboard & water schedule. */}
                  <ProtectedRoute
                    // logged in shows Dashboard else shows LoginPage
                    exact
                    path="/dashboard"
                  >
                    <Dashboard />
                    {/* <Nav /> */}
                  </ProtectedRoute>

                  {/* Visiting localhost:3000/collection will show the use their collection of plants. */}
                  <ProtectedRoute
                    // logged in shows Collection else shows LoginPage
                    exact
                    path="/collection"
                  >
                    <Collection />
                  </ProtectedRoute>

                  {/* Visiting localhost:3000/PlantDetails by tapping on the plant from either the dashboard or the collection page you will be brought here*/}
                  <ProtectedRoute
                    // logged in shows PlantDetails when tapped on 
                    exact
                    path="/PlantDetails"
                  >
                    <PlantDetails />
                  </ProtectedRoute>

                  {/* Visiting localhost:3000/add_plant will allow user to add a new plant. */}
                  <ProtectedRoute
                    // logged in shows PlantForm else shows LoginPage
                    exact
                    path="/add_plant"
                  >
                    <PlantForm />
                  </ProtectedRoute>

                  {/* Visiting localhost:3000/user_profile will allow user to view their profile */}
                  <ProtectedRoute
                    // logged in shows Profile else shows LoginPage
                    exact
                    path="/user_profile"
                  >
                    <Profile />
                  </ProtectedRoute>



                  {/* HOW DO WE SEND TO ADMIN FROM THE LOGIN? */}
                  {/* Visiting localhost:3000/admin will allow the admin to view their profile */}
                  <ProtectedRoute
                    // logged in shows Profile else shows LoginPage
                    exact
                    path="/admin"
                  >
                    {user.access_level >= 5 ?
                      // If the user has the right access level, 
                      // redirect to the /admin level, otherwise take them to the dashboard
                      <AdminPage />
                      :
                      // Otherwise, show the dashboard page
                      <Redirect to="/dashboard" />
                    }
                  </ProtectedRoute>



                  {/* // -- LOGIN vs REGISTER -- //  */}

                  {/* LOGIN PAGE */}
                  <Route
                    exact
                    path="/login"
                  >
                    {user.id ?
                      // If the user is already logged in, 
                      // redirect to the /user page
                      <Redirect to="/dashboard" />
                      :
                      // Otherwise, show the login page
                      <LoginPage />
                    }
                  </Route>

                  {/* REGISTER PAGE */}
                  <Route
                    exact
                    path="/registration"
                  >
                    {user.id ?
                      // If the user is already logged in, 
                      // redirect them to the /user page
                      <Redirect to="/dashboard" />
                      :
                      // Otherwise, show the registration page
                      <RegisterPage />
                    }
                  </Route>

                  {/* ELSE IF no other routes matched, we will show a 404. */}
                  <Route>
                    <h1>404</h1>
                  </Route>

                </Switch>

                {/* show NAV on ALL views */}
                <Nav />

              </Box> {/* Box sx={sxAppContent}> */}

            </Box> {/* Box sx={sxApp}> */}

          </ScrollToTop>
        </Router>
      </Typography>
    </ThemeProvider>
  );
}

export default App;
