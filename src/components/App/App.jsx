import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage.jsx';
import UserPage from '../UserPage/UserPage.jsx';
import InfoPage from '../InfoPage/InfoPage.jsx';
import LandingPage from '../LandingPage/LandingPage.jsx';
import LoginPage from '../LoginPage/LoginPage.jsx';
import RegisterPage from '../RegisterPage/RegisterPage.jsx';
import Collection from '../Collection/Collection.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import PlantForm from '../PlantForm/PlantForm.jsx';
import Profile from '../Profile/Profile.jsx';
import PlantDetails from '../PlantDetails/PlantDetails.jsx';
import AdminPage from '../AdminPage/AdminPage.jsx';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_PLANTS' });
    dispatch({ type: 'FETCH_PHOTOS' });
    dispatch({ type: 'FETCH_CURRENT_DATE' })
  }, [dispatch]);



  return (
    <Router>
      <div>

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
          </ProtectedRoute>

          {/* Visiting localhost:3000/collection will show the use their collection of plants. */}
          <ProtectedRoute
            // logged in shows Collection else shows LoginPage
            exact
            path="/collection"
          >
            <Collection />
          </ProtectedRoute>

          {/* by tapping on the plant in either the dashboard or the collection page you will be brought here*/}
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

          {/* Visiting localhost:3000/admin will allow the admin to view their profile */}
          <ProtectedRoute
            // logged in shows Profile else shows LoginPage
            exact
            path="/admin"
          >
            <AdminPage />
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

      </div>
    </Router>
  );
}

export default App;
