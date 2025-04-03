import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
// import Contact from "./pages/Contact";
import PostJobPage from "./pages/PostJobPage";
import JobBoard from "./pages/JobBoard";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import Card from "./pages/Card";
import Logout from "./pages/Logout";
import Alumnis from "./pages/Alumnis";
import AdminUpdateUser from "./pages/AdminUpdateUser";
import WaitingCard from "./pages/WaitingCard";


const App = () => {
  return (
    <Router>
      <div className='font-sans'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/contact' element={<Contact />} /> */}
          <Route path='/job-board' element={<JobBoard />} />
          <Route path='/job-post' element={<PostJobPage />} />
          <Route path='/events' element={<Events />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/card/:userId' element={<Card />} />
          <Route path='/processing' element={<WaitingCard />} />
        
          {/* register is basically filled the data of alumni user */}
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />} />

          {/* admin panel route */}
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/logout' element={<Logout />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/admin/alumnis' element={<Alumnis />} />
          <Route path="/admin/alumnis/:userId/edit" element={<AdminUpdateUser />} />  
          <Route path='/admin' element={<Dashboard />} />
          
        </Routes>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
