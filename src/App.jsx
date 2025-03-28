// CSS
import "./App.css";

// Hooks
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./hooks/useAuth.jsx";

// Pages
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";

// auth context
import { AuthProvider } from "./context/AuthContext.jsx";
import CreateProperty from "./pages/createProperty/CreateProperty.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Search from "./pages/search/Search.jsx";
import Property from "./pages/properties/Property.jsx";
import EditProperty from "./pages/editProperty/EditProperty.jsx";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  // TODO - transformar em hook
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  // TODO -------------------------

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/properties/:id" element={<Property />}></Route>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/properties/createProperty"
                element={user ? <CreateProperty /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/properties/edit/:id"
                element={user ? <EditProperty /> : <Navigate to="/" />}
              ></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
