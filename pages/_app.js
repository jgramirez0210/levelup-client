/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react'; // Import useMemo from 'react'
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import UserContext from '../utils/context/UserContext';
import EventPage from './event';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use useMemo to memoize the context value
  const providerValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthProvider>
      <UserContext.Provider value={providerValue}>
        {isMounted && (
          <Router>
            <Routes>
              <Route path="/event" element={<EventPage />} />
              {/* Add more routes as needed */}
            </Routes>
            <ViewDirectorBasedOnUserAuthStatus
              component={Component}
              pageProps={pageProps}
            />
          </Router>
        )}
      </UserContext.Provider>
    </AuthProvider>
  );
}
export default MyApp;
