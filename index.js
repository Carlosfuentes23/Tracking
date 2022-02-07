require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Directions",
    "esri/config",
    "esri/layers/FeatureLayer",
    "esri/widgets/Track",
    "esri/rest/route",
  ], function (
    Map,
    MapView,
    Directions,
    esriConfig,
    FeatureLayer,
    Track,
    route
  ) {
    // An authorization string used to access the basemap, geocoding and routing services
    esriConfig.apiKey =
      "AAPK5a302445443b4c939bdd3bf43beb4329_mCqAiiYzj_ICRiIPUh-NSvGnKggn8EKE7suD36vO8sGPK7RRZ9VhoVheFrvzmqE";

    const map = new Map({
      basemap: "arcgis-topographic",
    });

    const view = new MapView({
      zoom: 14,
      center: [-74.05108899629639, 4.674536952406692],
      container: "viewDiv",
      map: map,
    });

    let directionsWidget = new Directions({
      view: view,
      routeServiceUrl:
        "https://sig.simur.gov.co/arcgis/rest/services/MVI_REDBICI/NARedBici/NAServer/Principiante",
      container: "widget-container"
    });

    // Add the Directions widget to the top right corner of the view
    view.ui.add(directionsWidget, {
      position: "top-right",
    });

    const trailheadsRenderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "https://cdn-icons-png.flaticon.com/512/656/656126.png",
        width: "25px",
        height: "25px",
      },
    };

    const cicloParqueaderos = new FeatureLayer({
      url: "https://services2.arcgis.com/NEwhEo9GGSHXcRXV/arcgis/rest/services/Cicloparqueaderos_Certificados_Bogota_D_C/FeatureServer/0",
      title: "Ciclo Parqueaderos Bogotá",
      renderer: trailheadsRenderer,
    });

    map.add(cicloParqueaderos);

    let trackWidget = new Track({
      view: view,

      // goToLocationEnabled: true
    });

    view.ui.add(trackWidget, "top-left");
    view.when(function () {
      trackWidget.start();
    });
  });

  function mostrar(){
    document.getElementById('widget-container').style.display ='block';
  }
  
  function ocultar(){
    document.getElementById('widget-container').style.display ='none';
  }