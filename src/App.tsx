import "./App.css";
import "./index.css";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={<Layout>{React.createElement(component)}</Layout>} // Wrap each page with Layout
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
