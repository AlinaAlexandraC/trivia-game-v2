import './App.css';
import Homepage from './Pages/Homepage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Pages/Layout';
import Rules from './Components/Rules/Rules';
import TriviaGame from './Pages/TriviaGame';
import NotFound from './Pages/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout>
        <Homepage />
      </Layout>,
      errorElement: <Layout><NotFound /></Layout>
    },
    {
      path: '/question',
      element: <Layout>
        <TriviaGame />
      </Layout>,
    },
    {
      path: '/rules',
      element: <Layout>
        <Rules />
      </Layout>,
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
