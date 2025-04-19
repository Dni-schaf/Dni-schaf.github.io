// === Globale Variablen === //
let projection;
let svgpath, svgmap, svggrid, svgice, svglabel;
let totalLengthScott, totalLengthAmundsen;
let halbbreit;
let halbhoehe;

// === Hilfsfunktionen === //
function getMapDimensions() {
  const width = window.innerWidth;
  const height = width * 0.699;
  halbbreit = width/2;
  halbhoehe = height/2;
  const scale = width * 0.15;
  return { width, height, scale };
}

function setupSVGs({ width, height }) {
  svgmap = d3.select("#map").append("svg").attr("width", width).attr("height", height);
  svgice = d3.select("#ice").append("svg").attr("width", width).attr("height", height);
  svgpath = d3.select("#path").append("svg").attr("width", width).attr("height", height);
  svggrid = d3.select("#grid").append("svg").attr("width", width).attr("height", height);
  svglabel = d3.select("#label").append("svg").attr("width", width).attr("height", height);
}

function setupProjection({ width, height, scale }) {
  projection = d3.geoAzimuthalEqualArea()
    .rotate([-70, 0])
    .scale(scale)
    .translate([width / 2, height / 2]);
}

// === Zeichnen der Karte === //
function drawBaseMap() {
  const path = d3.geoPath().projection(projection);
  const graticule = d3.geoGraticule().step([20, 15]);

  svgmap.append("path")
    .datum(graticule.outline)
    .attr("class", "foreground")
    .attr("d", path);

  d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json", function(err, world) {
    if (err) throw err;
    svgmap.append("g")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter().append("path")
      .attr("class", "map")
      .attr("d", path);
  });

  svggrid.append("path").datum(graticule).attr("class", "graticule").attr("d", path);

  svggrid.append("line")
    .attr("x1", projection([-95, 0])[0])
    .attr("y1", projection([0, 0])[1])
    .attr("x2", projection([235, 0])[0])
    .attr("y2", projection([0, 0])[1])
    .attr("stroke", "#5D7082")
    .attr("stroke-width", 2.5)
    .attr("class", "equator-line");
}

function drawIce() {
    d3.json("https://gist.githubusercontent.com/ScharffenBerg/5fb9342bb4abe86bec09230d90275197/raw/4bfb48ab30681e6ec441b0d8a2d7a5da6583900a/Shelf_Ice_Data.json", function(error, ice) {
        if (error) return console.error(error);
    const path = d3.geoPath().projection(projection);
    svgice.append("g")
      .attr("class", "iceshelf")
      .selectAll("path")
      .data(ice.features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", "ice");
  });
}

// === Routen zeichnen === //
function drawPath(dataset, team) {
  for (let i = 0; i < dataset.length - 1; i++) {
    svgpath.append("line")
      .attr("x1", projection([dataset[i].lng, dataset[i].lat])[0])
      .attr("y1", projection([dataset[i].lng, dataset[i].lat])[1])
      .attr("x2", projection([dataset[i + 1].lng, dataset[i + 1].lat])[0])
      .attr("y2", projection([dataset[i + 1].lng, dataset[i + 1].lat])[1])
      .attr("id", `${team}${i}`)
      .attr("class", team)
      .style("stroke-width", 2);
  }
}

function addMarker(svg, id, color, radius = 3) {
  d3.select("#" + id).remove();

  const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  marker.setAttribute("id", id);
  marker.setAttribute("r", radius);
  marker.setAttribute("fill", color);
  marker.setAttribute("visibility", "hidden");
  svg.node().appendChild(marker);
}

// === Labels (Platzhalterfunktionen) === //
function drawLabels() {
    svglabel.selectAll(".city-circle").remove();
  svglabel.selectAll(".city").remove();

  function getCityName(cityData, lang) {
    if (lang === 'de') return cityData.text_de;
    if (lang === 'en') return cityData.text_en;
    if (lang === 'no') return cityData.text_no;
  }

  // Städte auf die Karte setzen
  Object.keys(cities).forEach(function(cityKey) {
    const city = cities[cityKey];
            
    // Kreise für jede Stadt (kleine Punkte)
    svglabel.append("circle")
      .attr("cx",  projection(city.coordinates)[0])
      .attr("cy", projection(city.coordinates)[1])
      .attr("r", 4)  // Radius des Kreises
      .attr("class", "city-circle" + " " + city.text_de)
      .style("visibility", "hidden");

    svglabel.append("text")
      .attr("x", projection(city.coordinates)[0])  // Längengrad zu x-Pixel-Koordinate
      .attr("y", projection(city.coordinates)[1])  // Breitengrad zu y-Pixel-Koordinate
      .text(getCityName(city, language))    // Den Namen in der aktuellen Sprache verwenden
      .attr("class", city.kind + " " + city.text_de)   // CSS-Klasse basierend auf "kind"
      .attr("dx", "0.8em")
      .attr("dy", "0.25em")
      .style("visibility", "hidden") ;                      // Text leicht nach oben verschieben
  });
}

function addOceanLabel(svglabel, continent, lang, x, y) {
  const labelData = oceanLabels[continent];
  const textLines = labelData[`text_${lang}`];

  // Erste Zeile
  svglabel.append("text")
    .attr("x", x)          // X-Position
    .attr("y", y)          // Y-Position für die erste Zeile
    .attr("class", "ocean-label")
    .style("text-anchor", "middle") 
    .text(textLines[0]);   // Erste Zeile des Textes

  // Zweite Zeile
  svglabel.append("text")
    .attr("x", x)          // Gleiche X-Position wie die erste Zeile
    .attr("y", y + 20)     // Y-Position für die zweite Zeile (verschoben)
    .attr("class", "ocean-label")
    .style("text-anchor", "middle") 
    .text(textLines[1]);   // Zweite Zeile des Textes
}

function addContinentLabel(svglabel, continent, lang, x, y) {
  const labelData = continentLabels[continent];
  const textLines = labelData[`text_${lang}`];

  // Erste Zeile
  svglabel.append("text")
    .attr("x", x)          // X-Position
    .attr("y", y)          // Y-Position für die erste Zeile
    .attr("class", "continent-label")
    .style("text-anchor", "middle") 
    .text(textLines[0]);   // Erste Zeile des Textes

  // Zweite Zeile
  svglabel.append("text")
    .attr("x", x)          // Gleiche X-Position wie die erste Zeile
    .attr("y", y + 20)     // Y-Position für die zweite Zeile (verschoben)
    .attr("class", "continent-label")
    .style("text-anchor", "middle") 
    .text(textLines[1]);   // Zweite Zeile des Textes
}


// === Hauptfunktion zum Neuzeichnen === //
function redrawAll() {
    console.log("redrow");
  d3.selectAll("svg").remove();

  const dim = getMapDimensions();
  setupSVGs(dim);
  setupProjection(dim);

  drawBaseMap();
  drawIce();
  drawPath(Scott, "Scott");
  drawPath(Amundsen, "Amundsen");

  totalLengthScott = fillLength(Scott.length, "Scott");
  totalLengthAmundsen = fillLength(Amundsen.length, "Amundsen");

  hidelines(Scott.length, "Scott", totalLengthScott);
  hidelines(Amundsen.length, "Amundsen", totalLengthAmundsen);

  drawLabels();
    // Entferne vorherige Labels mit der Klasse "continent/ocean-label"
    svglabel.selectAll(".continent-label").remove();
    svglabel.selectAll(".ocean-label").remove();

    // Beispiel: Afrika auf Deutsch beschriften
    addOceanLabel(svglabel, "Atlantik", language, halbbreit*0.653, halbhoehe*0.46);
  
    // Beispiel: Europa auf Englisch beschriften
    addOceanLabel(svglabel, "Pazifik", language, halbbreit*1.45,  halbhoehe*0.8);
  
    // Beispiel: Asien auf Norwegisch beschriften
    addOceanLabel(svglabel, "Indischerozean", language, halbbreit, halbhoehe*1.1);
  
    // Beispiel: Asien auf Norwegisch beschriften
    addOceanLabel(svglabel, "Aequator", language, halbbreit*1.5, halbhoehe*0.99);
  
     // Beispiel: Asien auf Norwegisch beschriften
     addContinentLabel(svglabel, "Afrika", language, halbbreit*0.75, halbhoehe*0.9);
  
     // Beispiel: Asien auf Norwegisch beschriften
     addContinentLabel(svglabel, "Asien", language, halbbreit*1.1, halbhoehe*0.7);
  
     // Beispiel: Asien auf Norwegisch beschriften
     addContinentLabel(svglabel, "Europa", language, halbbreit*0.85, halbhoehe*0.61);
     // Beispiel: Asien auf Norwegisch beschriften
     addContinentLabel(svglabel, "Australien", language, halbbreit*1.28, halbhoehe*1.23);
     // Beispiel: Asien auf Norwegisch beschriften
     addContinentLabel(svglabel, "SuedAmerika", language, halbbreit*0.48, halbhoehe*1.07);

     addMarker(svgpath, "amundsen-marker", "black");
     addMarker(svgpath, "scott-marker", "white");
}

// === Event-Handler === //
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    redrawAll();
  }, 150);
});

// === Initialer Start === //
redrawAll();
