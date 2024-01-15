import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Typer from './components/Typer.js';
import Counter from './components/Counter.js';
import Weekdays from './components/Weekdays.js';
import Home from './components/Home.js';
import Meteo from './components/Meteo.js';


const routerConfig = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { path: '/', element : <Home /> },
    { path: '/agenda', element : <Weekdays /> },
    { path: '/counter', element : <Counter /> },
    { path: '/typer', element : <Typer /> },
    { path: '/meteo', element : <Meteo /> },
  ] },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerConfig}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
