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

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_PLANTS' });
    dispatch({ type: 'FETCH_PHOTOS' });
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

          {/* Visiting localhost:3000/dashboard will show the dashboard water schedule. */}
          <ProtectedRoute
            // logged in shows Dashboard else shows LoginPage
            exact
            path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>

          {/* Visiting localhost:3000/collection will show the collection of plants. */}
          <ProtectedRoute
            // logged in shows Collection else shows LoginPage
            exact
            path="/collection"
          >
            <Collection />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows PlantForm else shows LoginPage
            exact
            path="/add_plant"
          >
            <PlantForm />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Profile else shows LoginPage
            exact
            path="/user_profile"
          >
            <Profile />
          </ProtectedRoute>

              {/* // -- check under here -- //  */}

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

          <Route
            exact
            path="/dashboard"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

          <UserPage />

        </Switch>

        <Nav />
        <Footer />

      </div>
    </Router>
  );
}

export default App;
