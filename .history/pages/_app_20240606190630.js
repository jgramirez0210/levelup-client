/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import UserContext from '../utils/context/UserContext';
import EventPage from './event';


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthProvider>
      <UserContext.Provider value={{ user, login, logout }}>
        <Router>
          <Routes>
            <Route path="/event" element={<EventPage />} />
            {/* Add more routes as needed */}
          </Routes>
          <ViewDirectorBasedOnUserAuthStatus
            // if status is pending === loading
            // if status is logged in === view app
            // if status is logged out === sign in page
            component={Component}
            pageProps={pageProps}
          />
        </Router>
      </UserContext.Provider>
    </AuthProvider>
  );
}
export default MyApp;
