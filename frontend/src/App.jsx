import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import AddProperty from "./pages/AddProperty.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import { Protected } from "./Protected/Protected.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/add-property"
          element={
            <Protected>
              <Layout>
                <AddProperty />
              </Layout>
            </Protected>
          }
        />
        <Route
          path="/property/:id"
          element={
            <Layout>
              <PropertyDetails />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
