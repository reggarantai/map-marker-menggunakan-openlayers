var Icon = ol.style.Icon,
Style = ol.style.Style;

// Untuk menentukan koordinat marker nya
var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([106.817208,-6.239169])
  ),
  text: '<b>@reggarantai</b><br>---<br>Tendean Square<br><small>Jakarta Selatan</small>'
});

// Memeilih & menampilkan marker yang diinginkan
// anchor adalah posisi marker terhadap koordinat
// disini anchorXUnits & anchorYUnits menggunakan satuan pixel
var iconStyle = new Style({
  image: new Icon({
    anchor: [40, 40],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    //src: 'https:///contoh.com/uri/misal-gambar.png',
    src: 'assets/images/marker.png',
  }),
});

// Memasang marker terhadap koordinat
iconFeature.setStyle(iconStyle);

// Membuat source untuk vector layer
var vectorSource = new ol.source.Vector({
  features: [iconFeature],
});

// Membuat vector layer untuk dipasang pada peta
var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
});

// Membuat peta dasar dari Esri Map
var baseMap = new ol.layer.Tile({
  source: new ol.source.XYZ({
    attributions:
      'Tiles Â© <a href="https://services.arcgisonline.com/ArcGIS/' +
      'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
    url:
      'https://server.arcgisonline.com/ArcGIS/rest/services/' +
      'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  })
});

// Membuat peta
// target adalah id attribute dari html elemen
// view adalah container untuk peta
// center merupakan posisi tengah dari peta
var map = new ol.Map({
  target: 'map',
  layers: [
    baseMap,
    vectorLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([106.817208,-6.236569]),
    zoom: 15
  })
});

// Untuk membuat popup info saat popup di klik
var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -45],
});
map.addOverlay(popup);

// display popup on click
map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    var coordinates = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinates);
    $(element).popover({
      placement: 'top',
      html: true,
      content: feature.get('text'),
    });
    $(element).popover('show');
  } else {
    $(element).popover('dispose');
  }
});

// Untuk menjadikan marker sebagai tautan
// map.on('click', function (evt) {
//   var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
//     return feature;
//   });
//   if (feature) {
//     window.open("https://regga.id/coding/map-marker-menggunakan-openlayers/");
//   }
// });
