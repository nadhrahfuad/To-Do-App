// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider,AuthContext } from "./contexts/AuthContext";
import { PlaceProvider } from "./contexts/PlaceContext";
import { PhotosProvider } from "./contexts/PhotosContext";
import { TodoProvider } from "./contexts/TodoContext";
import Layout from "./components/Layout";
import AddPlace from "./pages/AddPlace";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import EditPlace from "./pages/EditPlace";
import TravelNews from "./pages/TravelNews";
import MyGallery from "./pages/MyGallery";
import Login from "./pages/Login";
import "./components/css/custom.css";
import RequireAuth from "./contexts/RequireAuth"
// import ErrorGuestPage from "./pages/ErrorGuestPage"


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      {/* <PlaceProvider> */}
          <Routes>
            {/* public */}
            <Route path="/login" element={<Login />} /> 

            {/* private */}
            <Route element={<RequireAuth/>}>
            {/* YELLOW */}
              <Route element={<Layout />}>
                <Route path="/" element={<PlaceProvider><TodoProvider><Home /></TodoProvider></PlaceProvider>} />
                {/* <Route path="/add" element={<PlaceProvider><AddPlace /></PlaceProvider>} /> */}


                {/* HERER!!! */}
                <Route path="/add" element={<PlaceProvider><TodoProvider><AddPlace /></TodoProvider></PlaceProvider>} />
                
                {/* for holder, useparams */}
                <Route path="/place/:id" element={<PlaceProvider><TodoProvider><EditPlace /></TodoProvider></PlaceProvider>} />

                <Route path="/travelnews" element={<TravelNews />} />
                <Route path="/mygallery" element={<PhotosProvider><MyGallery /></PhotosProvider>} />
              </Route>
            </Route>

            <Route path="*" element={<ErrorPage />} />    

          </Routes>
          {/* </PlaceProvider> */}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
