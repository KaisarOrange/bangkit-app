import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Main from './Components/Main/Main';
import AddUmkm from './Components/addUmkm/AddUmkm';

import About from './Components/Main/beranda menu/About';
import Checkout from './Components/Main/beranda menu/Checkout';
import Card from './Components/Main/beranda menu/Card';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Daftar from './Components/Register/Daftar';
import Portofolio from './Components/Main/portofolio/Portofolio';
import UmkmDash from './Components/Main/UmkmDash/UmkmDash';
import Admin from './Components/Adimin/Admin';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useEffect } from 'react';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
      },
    },
  });
  useEffect(() => {
    document.title = 'Bangkit';
  }, []);
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='main' element={<Main />}>
            <Route path='card' element={<Card />} />
            <Route path=':id' element={<About />} />
            <Route path='portofolio' element={<Portofolio />} />
            <Route path='umkm-dashboard' element={<UmkmDash />}></Route>
          </Route>
          <Route path='registerUMKM' element={<AddUmkm />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='daftar' element={<Daftar />} />
          <Route path='admin' element={<Admin />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
