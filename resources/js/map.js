
const windowwidth = window.innerWidth;
const windowheight = window.innerHeight;

const scrollbox = document.getElementById("scrollbox");
scrollbox.style.height = (windowheight * 8) + "px";



// Karte erstellen
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


// wie viele Einträge sind im Datensatz
const datecountScott = Object.keys(Scott).length;
const datecountAmundsen = Object.keys(Amundsen).length;

// wie lang ist die dauer vom ersten bis zum letzten tag --> timestampdelta
//array in dem alle timestamps liegen

function fillTimestampArr (datecount, dataset){
  let timestempArr = [];
    for (let i=0; i<datecount; i++){
     timestempArr.push(dataset[i].timestamp);
    };
    return timestempArr;
};

let timestempArrScott = fillTimestampArr(datecountScott, Scott);
let timestempArrAmundsen = fillTimestampArr(datecountAmundsen, Amundsen);

// ermittel den ersten und den letzten tag des datensatzes
let MaxtimestampScott = Math.max(...timestempArrScott);
let MaxtimestampAmundsen = Math.max(...timestempArrAmundsen);

function getMaxtimestamp () {
  if (MaxtimestampScott > MaxtimestampAmundsen) {
    return MaxtimestampScott;
  }else{
    return MaxtimestampAmundsen;
  };
};

let Maxtimestamp = getMaxtimestamp();

let MintimestampScott = Math.min(...timestempArrScott);
let MintimestampAmundsen = Math.min(...timestempArrAmundsen);

function getMintimestamp () {
  if (MintimestampScott < MintimestampAmundsen) {
    return MintimestampScott;
  }else{
    return MintimestampAmundsen;
  };
};

let Mintimestamp = getMintimestamp();

let timestampdelta = (Maxtimestamp) - (Mintimestamp);

//Reisepfad zeichnen
function drawPath(dataset, datecount) {

//es wir je eine linie zwischen 2 tagen gezeichnet
    for (let i=0; i<datecount-1; i++){

      const lines = svgpath
        .append("line")
        .style("stroke-width", 2)
       // first point: first date
        .attr("x1", function (index) { 
          let longitude = projection([dataset[i].lng,dataset[i].lat]);
          return longitude[0];
        })
        .attr("y1", function (index) { 
          let latitude = projection([dataset[i].lng,dataset[i].lat]);
          return latitude[1];
        })
       // second point: second date
        .attr("x2", function (index) { 
          let longitude = projection([dataset[i+1].lng,dataset[i+1].lat]);
          return longitude[0];
        })
        .attr("y2", function (index) { 
          let latitude = projection([dataset[i+1].lng,dataset[i+1].lat]);
          return latitude[1];
        })
        .attr("id", function (index) {
          let setID = dataset[i+1].team + i
          return setID;
        })
        .attr("class", dataset[i].team);
    }; 
};


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

drawPath(Scott, datecountScott);
drawPath(Amundsen, datecountAmundsen);




// totalLenght ist Array mit den längen der Teilabschnitte, timeLength mit der Dauer der Abschnitte

function fillLength(datecount, team) {
   //Arrays werden befüllt
  let totalLength = [];
  for (let i=0; i<datecount-1; i++){
    let IDteam = team + i;
    let length = d3.select("#"+IDteam).node().getTotalLength();
    totalLength.push(length);
  };
  return totalLength;
};
  
let totalLengthScott = fillLength(datecountScott, "Scott");
let totalLengthAmundsen = fillLength(datecountAmundsen, "Amundsen");

  
function filltime(datecount, dataset) {
  //Arrays werden befüllt
  let timeLength = [];
  for (let i=0; i<datecount-1; i++){
    let time = dataset[i+1].timestamp - dataset[i].timestamp;
    timeLength.push(time);
  };
  return timeLength;
};

let timeLengthScott = filltime(datecountScott, Scott);
let timeLengthAmundsen = filltime(datecountAmundsen, Amundsen); 

 
//linien werden über dashoffset unsichtbar gemacht  
function hidelines (datecount, team, totalLength){
  for (let i=0; i<datecount-1; i++){
    let IDteam = team + i;
    d3.select("#"+IDteam).attr("stroke-dasharray", totalLength[i]);
    d3.select("#"+IDteam).attr("stroke-dashoffset", totalLength[i]);
  }; 
};
 
hidelines(datecountScott, "Scott", totalLengthScott); 
hidelines(datecountAmundsen, "Amundsen", totalLengthAmundsen);


//console.log(timestempArrScott);

//steuerung über scrollen
let currenttime;
let korrektur = 0;

function setPathprogress(datecount, dataset, timestempArr, team, totalLength, timeLength, starttime){
   let scrollposition = document.documentElement.scrollTop - korrektur;      
   let currenttimestamp =(timestampdelta * (scrollposition ))/(windowheight*3);

   //console.log(scrollposition);
   
   currenttime = currenttimestamp+Mintimestamp;

   //alle linine entweder füllen oder unsichtbar durch offset
   for (let i=0; i<datecount; i++){
      let IDteam = team + i;
      let index;
     //console.log((currenttime+ " " +team));
     
      if (currenttime>=timestempArr[i+1]){
        
        d3.select("#"+IDteam).attr("stroke-dashoffset", 0);
      }else{
        d3.select("#"+IDteam).attr("stroke-dashoffset", totalLength[i]);
        //console.log("not");
      };

   //auswählen des abschnittest in dem wir grad mitten drin sind
      if (currenttime>timestempArr[i] && currenttime<timestempArr[i+1]) {
        
        index = i;
        // summiert die länger der vorherigen abschnitt
        let sum = 0;
        for (let k = 0; k < index; k++) {
          sum += timeLength[k];
        }
        //setzt länger des aktuellen abschnitt ins verhältnis zur relativen timestemp zeit und verändert das offset
        let dashoffset = totalLength[i]*(currenttimestamp-sum-(dataset[0].timestamp - Mintimestamp))/timeLength[i];
        d3.select("#"+team+i).attr("stroke-dashoffset", totalLength[i]-dashoffset);
      }else{
      };
  };  
};

const scrollboxdiv = document.getElementById("test");

let lastTwoScrollPositions = [0, 0]; // Array, um die letzten beiden Scroll-Positionen zu speichern
let scrollDifference = 0; // Variable, um die Differenz zu speichern
document.addEventListener("scroll", () => {
  let topoffset = document.documentElement.scrollTop;

  // Verschieben der letzten Position in das zweite Element und Aktualisierung der ersten Position
  lastTwoScrollPositions[1] = lastTwoScrollPositions[0];
  lastTwoScrollPositions[0] = topoffset;

  // Berechnung der Differenz
  scrollDifference = lastTwoScrollPositions[0] - lastTwoScrollPositions[1];

  // Ausgabe der Differenz in der Konsole (optional)
  //console.log("Scroll Difference:", scrollDifference);
});



// konvertiert timestamp zur Datum
function konverter(){
  let date = new Date(currenttime*1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let datum = document.getElementById("text");
  datum.innerHTML = day + ". " + month + ". " + year + "." + currenttime;
  
} ; 





const chapter3date = -1868986921.0084033;

window.addEventListener('scroll', function() {
        // Berechne den aktuellen Wert von currenttime basierend auf dem Scrollen
        
        
        if (currenttime >= chapter3date) {
          // Ändere die Position auf absolute und setze top auf die aktuelle Scrollposition + 100vh
          if (chapter3.style.position !== "absolute") {
            chapter3.style.position = "absolute";
            chapter3.style.top = (window.scrollY + window.innerHeight) + "px";



            
          }
        } else {
          // Ändere die Position zurück auf fixed
          if (chapter3.style.position !== "fixed") {
            chapter3.style.position = "fixed";
            chapter3.style.top = "110vh";
          }
        }
        
      });

const chapter1 = document.getElementById("chapter1");
const chapter3 = document.getElementById("chapter3");

let comictime = true;
let scrolltopstart = 0;
let scrolltopend = 0;
let elemnthight = 0;


      // IntersectionObserver für chapter3
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scrollboxdiv.style.backgroundColor = "red"; // Hintergrundfarbe ändern
            comictime = true;
            scrolltopstart = document.documentElement.scrollTop;
            let intersectingElementId = entry.target.id;
            let elmnt = document.getElementById(intersectingElementId);
            elemnthight = elmnt.offsetHeight;
            console.log(intersectingElementId +" heihgt:" + windowheight + "elementheight" + elemnthight);
            
            
  
          } else {
            scrollboxdiv.style.backgroundColor = "white"; // Hintergrundfarbe zurücksetzen
            comictime = false;
            scrolltopend = document.documentElement.scrollTop;
            if (scrolltopend > scrolltopstart) {
              let korrekturneu = scrolltopend - scrolltopstart;
              korrektur = korrektur + korrekturneu;
            }else{
              let korrekturneu = scrolltopstart - scrolltopend;
              korrektur = korrektur - korrekturneu;
            }
            
           //console.log("korrektur" + korrekturneu);

          }
        });
      }, { threshold: [0] });



      // chapter3-Element beobachten
      observer.observe(chapter1);
      observer.observe(chapter3);





window.addEventListener('scroll', function() {

  if( comictime==false){
  setPathprogress(datecountAmundsen, Amundsen, timestempArrAmundsen, "Amundsen", totalLengthAmundsen, timeLengthAmundsen, MintimestampAmundsen);
  setPathprogress(datecountScott, Scott, timestempArrScott, "Scott", totalLengthScott, timeLengthScott, MintimestampScott);
  konverter();
  } else {};
  
  
});


