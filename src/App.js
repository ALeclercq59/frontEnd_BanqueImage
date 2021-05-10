import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

//import Upload from "./pages/Upload";
import TestList from "./components/TestList";
import Parent from "./components/TestParentComponent";
import Upload from "./pages/Upload1";
import Dashboard from "./pages/DashBoard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
