require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Directions",
  "esri/config",
  "esri/layers/FeatureLayer",
  "esri/widgets/Locate",
  "esri/widgets/Track",
  "esri/Graphic",
], function (
  Map,
  MapView,
  Directions,
  esriConfig,
  FeatureLayer,
  Locate,
  Track,
  Graphic
) {
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
    container: "widget-container",
  });

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

  // const locate = new Locate({
  //   view: view,
  //   useHeadingEnabled: false,
  //   goToOverride: function (view, options) {
  //     options.target.scale = 1500;
  //     return view.goTo(options.target);
  //   },
  // });
  // view.ui.add(locate, "top-left");

  const track = new Track({
    view: view,
    graphic: new Graphic({
      symbol: {
        type: "simple-marker",
        size: "12px",
        color: "green",
        outline: {
          color: "#efefef",
          width: "1.5px",
        },
      },
    }),
    useHeadingEnabled: true,
  });
  view.ui.add(track, "top-left");

  view.when(function () {
    track.start();

    var options = {
      enableHighAccuracy: true,
      timeout: 5000, //Cada 5 segundos capture la ubicación
      maximumAge: 0,
    };
    function success(pos) {
      var crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  });
});

function mostrar() {
  document.getElementById("widget-container").style.display = "block";
}

function ocultar() {
  document.getElementById("widget-container").style.display = "none";
}
