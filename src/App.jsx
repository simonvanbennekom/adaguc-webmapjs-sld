import React from "react";
import ReactDOM from "react-dom";
import SLDEditor from "./SLDEditor";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
  <div id="app_grid">
    <div id="header" className="bg-primary py-4 pl-5">
      <h1 className="text-white">Adaguc webmap-js SLD Demo</h1>
    </div>
    <div id="sld_editor_container" className="m-2">
      <SLDEditor/>
    </div>
    <div id="webmap_container" className="m-2">
      <div id="webmap"></div>
    </div>
  </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));