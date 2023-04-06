import React, { useContext } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import './tailwinds.css'

import { About } from './about/about'
import { Search } from './search/search'
import Map from './map/map'
import { Tracker } from './tracker/tracker'
import { Login } from './login/login'
import { AuthState } from './login/authState';
import logo from './assets/tree.png'
import beta from './assets/beta.png'
import { useNavigate } from 'react-router-dom';
import { Campground } from './campground/campground';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ycmxvZ2FuIiwiYSI6ImNsZnVqMTIydjAycTAzZ250bG1wc2xmc3cifQ.mZwH-XJARtUN7Ru4Y9N-mA';

function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');

  // Asynchronously determine if the user is authenticated by calling the service
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    if (userName) {
      fetch(`/api/user/${userName}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          const state = user?.authenticated ? AuthState.Authenticated : AuthState.Unauthenticated;
          setAuthState(state);
        });
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);


  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
    .then(() => setAuthState(AuthState.Unauthenticated))
  }


  return (
    <div className='w-screenflex justify-center flex-col'>

      <nav className="bg-white dark:bg-gray-900 fixed sticky top-0 pt-4 pb-4">
        <div className="lg:w-9/12 flex flex-wrap items-end justify-between mx-auto pt-4 pb-4">
          <NavLink to="/search" className="flex items-baseline">
            <img src={logo} className="self-center h-6 mr-3" alt="Campsnatch Logo"></img>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mr-4">Campsnatch</span>
            {/* <img src={beta} className="self-center h-6 mr-3" alt="Campsnatch Logo"></img> */}
          </NavLink>
          <div className="flex md:order-2">
            {authState === AuthState.Unauthenticated && (
              <NavLink to="login" ><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button></NavLink>
            )}
            {authState === AuthState.Authenticated && (
              <NavLink to="login" ><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => logout()}>Logout</button></NavLink>
            )}
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="about" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">About</NavLink>
              </li>
              <li>
                <NavLink to="search" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Search</NavLink>
              </li>
              <li>
                <NavLink to="map" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Map</NavLink>
              </li>
              {authState === AuthState.Authenticated && (
              <li>
                <NavLink to="trackers" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Trackers</NavLink>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>


      <Routes>
      <Route path='/' element={<About />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login
          userName={userName}
          authState={authState}
          onAuthChange={(userName, authState) => {
            setAuthState(authState);
            setUserName(userName);
          }}
        />} />
        <Route path='/search' element={<Search />} />
        <Route path='/map' element={<Map />} />
        <Route path='/trackers' element={<Tracker />} />
        <Route path="/campground/:id/:name" element={<Campground authState={authState}/>} />
      </Routes>

    </div>
  );
}

export default App;
