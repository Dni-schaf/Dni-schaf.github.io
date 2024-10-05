        // karte erzeugen
        const svgmap = d3.select("#map").append("svg")
        .attr("width", 900)
        .attr("height", 700);

        const svgpath = d3.select("#path").append("svg")
        .attr("width", 900)
        .attr("height", 700);

        const svggrid = d3.select("#grid").append("svg")
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
 
   svgmap.append("g")
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
 }; 
 
 drawIce();
 d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json", drawMap);
 