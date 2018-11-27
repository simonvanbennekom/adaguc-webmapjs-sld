import React from "react";
import ReactDOM from "react-dom";
import SLDEditor from "./SLDEditor";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div id="app_grid">
      <div id="header">
      <h1>ADAGUC WebMapJS Demo</h1>
      </div>
      <div id="sld_editor_container"><SLDEditor/></div>
      <div id="webmap_container">
        <div id="webmap"></div>
      </div>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));