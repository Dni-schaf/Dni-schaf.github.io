        // karte erzeugen
        const svgmap = d3.select("#map").append("svg")
        .attr("width", 900)
        .attr("height", 700);

        const svgice = d3.select("#ice").append("svg")
        .attr("width", 900)
        .attr("height", 700);

        const svgpath = d3.select("#path").append("svg")
        .attr("width", 900)
        .attr("height", 700);

        const svggrid = d3.select("#grid").append("svg")
        .attr("width", 900)
        .attr("height", 700);

        const svglabel = d3.select("#label").append("svg")
        .attr("width", 900)
        .attr("height", 700);

        const projection = d3.geoAzimuthalEqualArea()
        .rotate([-70,0])
        .scale(170)
        .translate([450,360]);

        const path = d3.geoPath().projection(projection);

        const graticule = d3.geoGraticule()
        .step([10, 5]);

        //eis in die karte zeichnen
function drawIce(){
    d3.json("https://gist.githubusercontent.com/ScharffenBerg/5fb9342bb4abe86bec09230d90275197/raw/4bfb48ab30681e6ec441b0d8a2d7a5da6583900a/Shelf_Ice_Data.json", function(error, ice) {
   if (error) return console.error(error);
 
   svgice.append("g")
     .attr("class", "iceshelf")
     .selectAll("path")
     .data(ice.features)
     .enter().append("path")
     .attr('d', path)
     .attr("class", "ice"); 
   });  
 };
 
 //karte zeichnen
 function drawMap(err, world) {
    if (err) throw err
   
   //macht Umriss für die Farbe des Meers
   svgmap.append("path")
     .datum(graticule.outline)
     .attr("class", "foreground")
     .attr("d", path);
   
   //Kontinente erzeugen
   svgmap.append("g")
     .selectAll("path")
     .data(topojson.feature(world, world.objects.countries).features)
     .enter().append("path")
     .attr("d", path)
     .attr("class", "map");
  
   //Gitternetz erzeugen
   svggrid.append("path")
     .datum(graticule)
     .attr("class", "graticule")
     .attr("d", path); 


     // Äquatorlinie hinzufügen (entspricht einer Linie von links nach rechts in der Mitte der Karte)
     svggrid.append("line")
.attr("x1", 110)           // Start der Linie an der linken Seite der Karte (X-Koordinate)
.attr("y1", projection([0, 0])[1])  // Y-Koordinate für den Äquator (projiziert auf 0° Breite)
.attr("x2", 790)  // Ende der Linie an der rechten Seite der Karte
.attr("y2", projection([0, 0])[1])  // Y-Koordinate für den Äquator
.attr("stroke", "black")     // Farbe der Äquatorlinie
.attr("stroke-width", 1)     // Strichstärke, um die Linie dicker zu machen
.attr("class", "equator-line");


           // Die Stadtkoordinaten (Längengrad, Breitengrad)
           const cities = {
            "Oslo": { 
              "text_de": "Oslo", 
              "text_en": "Oslo", 
              "text_no": "Oslo", 
              "coordinates": [10.7522, 59.9139], 
              "kind": "city" 
            },
            "Cardiff": { 
              "text_de": "Cardiff", 
              "text_en": "Cardiff", 
              "text_no": "Cardiff", 
              "coordinates": [-3.1791, 51.4816], 
              "kind": "city" 
            },
            "Funchal": { 
              "text_de": "Funchal", 
              "text_en": "Funchal", 
              "text_no": "Funchal", 
              "coordinates": [-16.9186, 32.6669], 
              "kind": "city" 
            },
            "Trindade": { 
              "text_de": "Trindade", 
              "text_en": "Trindade", 
              "text_no": "Trindade", 
              "coordinates": [-29.817, -20.5012], 
              "kind": "city" 
            },
            "Kapstadt": { 
              "text_de": "Kapstadt", 
              "text_en": "Cape Town", 
              "text_no": "Cape Town", 
              "coordinates": [18.4241, -33.9249], 
              "kind": "city" 
            },
            "Kerguelen": { 
              "text_de": "Kerguelen", 
              "text_en": "Kerguelen", 
              "text_no": "Kerguelen", 
              "coordinates": [70.2167, -49.352], 
              "kind": "city" 
            },
            "Melbourne": { 
              "text_de": "Melbourne", 
              "text_en": "Melbourne", 
              "text_no": "Melbourne", 
              "coordinates": [144.9631, -37.8136], 
              "kind": "city" 
            },
            "Lyttelton": { 
              "text_de": "Lyttelton", 
              "text_en": "Lyttelton", 
              "text_no": "Lyttelton", 
              "coordinates": [172.7209, -43.601], 
              "kind": "city" 
            },
            "Aequator": { 
              "text_de": "Äquator", 
              "text_en": "Equator", 
              "text_no": "ekvator", 
              "coordinates": [165, 0], 
              "kind": "city" 
            }
          };
          

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
              .attr("class", "city-circle" + " " + city.text_de);

              svglabel.append("text")
              .attr("x", projection(city.coordinates)[0])  // Längengrad zu x-Pixel-Koordinate
              .attr("y", projection(city.coordinates)[1])  // Breitengrad zu y-Pixel-Koordinate
              .text(getCityName(city, language))    // Den Namen in der aktuellen Sprache verwenden
              .attr("class", city.kind + " " + city.text_de)   // CSS-Klasse basierend auf "kind"
              .attr("dx", "0.8em")
              .attr("dy", "0.25em");                      // Text leicht nach oben verschieben
          });
 
 
 const oceanLabels = {
  Atlantik: {
    text_de: ["Atlantischer", "Ozean"],
    text_en: ["African", "Continent"],
    text_no: ["Afrikansk", "Kontinent"]
  },
  Pazifik: {
    text_de: ["Pazifischer", "Ozean"],
    text_en: ["European", "Continent"],
    text_no: ["Europeisk", "Kontinent"]
  },
  Indischerozean: {
    text_de: ["Indischer", "Ozean"],
    text_en: ["Asian", "Continent"],
    text_no: ["Asiatisk", "Kontinent"]
  }
};

 
 function addContinentLabel(svglabel, continent, lang, x, y) {
  const labelData = oceanLabels[continent];

  if (!labelData) {
    console.error("Kontinent nicht gefunden:", continent);
    return;
  }

  const textLines = labelData[`text_${lang}`];
  
  if (!textLines) {
    console.error("Sprache nicht unterstützt:", lang);
    return;
  }

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



// Beispiel: Afrika auf Deutsch beschriften
addContinentLabel(svglabel, "Atlantik", "de", 259, 167);

// Beispiel: Europa auf Englisch beschriften
addContinentLabel(svglabel, "Pazifik", "de", 694, 268);

// Beispiel: Asien auf Norwegisch beschriften
addContinentLabel(svglabel, "Indischerozean", "de", 473, 394);

    // Beispiel für den Atlantischen Ozean (Pfad muss an den Ort angepasst werden)
    const antarcticPathData = "M492.3,611.44c33.51-1.72,83.78-15.9,100.97-42.54"; // Beispiel für eine geschwungene Linie

    // Pfad für den Text erstellen (wird unsichtbar, nur zur Textführung)
    svglabel.append("path")
      .attr("id", "AntarcticPath")
      .attr("d", antarcticPathData)
      .attr("class", "ocean-path") // Unsichtbarer Pfad für den Text
      .attr("transform", "translate(-40, 38)"); 

    // Text entlang des Pfades platzieren
    svglabel.append("text")
      .attr("class", "ocean-label")
      .append("textPath")
      .attr("href", "#AntarcticPath")  // Verbindet den Text mit dem Pfad
      .attr("startOffset", "0%")    // Startet in der Mitte des Pfades
      .attr("class", "antarctica") 
      .text("Antarktis");   // Beschriftung des Ozeans

        
}; 
 
 drawIce();
 d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json", drawMap);

 