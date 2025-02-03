import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import BarList from "./pages/BarList";
import BarForm from "./pages/BarForm";
import Profil from "./pages/Profil";
import BarEdit from "./pages/BarEdit";
import BarDetail from "./pages/BarDetail";
import BarDeletePage from "./pages/BarDeletePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState, useEffect } from "react";
import Loading from "./pages/Loading";
import Dashboard from "./pages/Dashboard";
import EventList from "./pages/EventList";
import EventForm from "./pages/EventForm";



export default function App() {

  const [loading, setLoding] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      setLoding(false);
    }, 3500);
  }, []);


  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
        <Route index element={loading ? <Loading /> : <Homepage />}/>
          <Route path="/about" element={<About />} />
          <Route path="/bars" element={<BarList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/bar-edit/:id" element={<BarEdit />} />
          <Route path="/bar-form" element={<BarForm />} />
          <Route path="/event-form" element={<EventForm />} />
          <Route path="/bar-delete/:id" element={<BarDeletePage />} />
          <Route path="/bar/:id" element={<BarDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

