import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Nav } from "./components/navbar/Nav";
import { Error404 } from "./pages/Error404";
import { Footer } from "./components/footer/Footer";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/admin/Admin-Users";
import { AdminContacts } from "./pages/admin/Admin-Contacts";
import { AdminUpdate } from "./pages/admin/AdminUpdate";
import { AdminHome } from "./pages/admin/Admin-Home";
const App = () => {
  return (
    <div data-theme="night">
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/update" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
};

export default App;
