import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

//import Upload from "./pages/Upload";
import TestList from "./components/TestList";
import Parent from "./components/TestParentComponent";
import Upload from "./pages/Upload1";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Upload />
      </header>
    </div>
  );
}

export default App;
