import { WMJSMap, WMJSLayer } from 'adaguc-webmapjs';
import $ from 'jquery';
import tileRenderSettings from './config/tilesettings.json'
import style from "./styles/main.css";
import App from "./App.jsx";
require('./img/adaguc-logo-favicon-16x16.png');
require('./img/adaguc-logo-favicon-32x32.png');

$(function() {

  let element = document.getElementById('webmap');
  var webMapJS  = new WMJSMap(element);


  /* Set size according to window w/h */
  // webMapJS.setSize(window.innerWidth,window.innerHeight - 300);
  


  function setSize(){
    let element = document.getElementById('webmap_container');
    webMapJS.setSize(element.offsetWidth,element.offsetHeight);
    webMapJS.draw('resize');
  }
  setSize();

  /* Set tile render settings configuration object */
  webMapJS.setWMJSTileRendererTileSettings(tileRenderSettings);
  
  /* Resize handler */
  $( window ).resize(function() {
    // webMapJS.setSize(window.innerWidth,window.innerHeight - 300);
    setSize();
  });

  /* Tiled baselayer */
  var baseLayer = new WMJSLayer({ name: 'OSM_Blossom_NL', title: 'ESRI ArcGIS satellite map (Mercator/LatLon)', type: 'twms', enabled: true });
        
  var topLayer = new WMJSLayer({ service:"//geoservices.knmi.nl/cgi-bin/worldmaps.cgi?", name:"world_line", format:"image/png",  title:"World country borders",
    keepOnTop:true,
    enabled:true
  });

  var radarlayer = new WMJSLayer({
    service:'http://bhw512.knmi.nl/~bennekom/adaguc.testdata.cgi?',
    name:'radar'
  });
  
  var currentLatestDate = undefined;
  var currentBeginDate = undefined;
  
  
  
  /**
   * Callback function which can optionally be used to give info about the current animation step
   */
  var nextAnimationStepEvent = function(map){
    // console.log(map.getDimension('time'));
    //$('#debug').html("Dates: "+currentBeginDate+" till "+currentLatestDate+"<br/>"+"Current: "+map.getDimension('time').currentValue);
  };

  var beforecanvasdisplay = function(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#01547D";
    let timeDim = webMapJS.getDimension('time');
    if (timeDim) {
      ctx.fillText(timeDim.currentValue,10,70);
      ctx.font = "18px Arial";
      ctx.fillText("Latest date: " + currentLatestDate,10,100);
    }
  }
  
  /**
   * Callback called when the layer is ready to use
   */
  radarlayer.onReady = function(layer){
    webMapJS.setProjection(layer.getProjection("EPSG:3857"));
    webMapJS.setBBOX('314909.3659069278,6470493.345653814,859527.2396033217,7176664.533565958');
    webMapJS.setAnimationDelay(200);
    layer.onReady = undefined;
  };
  
  webMapJS.addListener("onnextanimationstep",nextAnimationStepEvent,true);
  webMapJS.addListener("beforecanvasdisplay",beforecanvasdisplay,true);
  webMapJS.setBaseLayers([baseLayer]);
  webMapJS.addLayer(radarlayer);

});

