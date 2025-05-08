function createExkurseMannschaftIntro () {
  // Excurs headline erstellen und einfügen
  const excursMannschaft = document.getElementById("excursMannschaft");

  const headline = document.createElement("p");
  headline.classList.add("excursheadline");
  headline.textContent = "Wie sind die beiden Mannschaften aufgestellt?"; // <-- Optionaler Text
  excursMannschaft.appendChild(headline);

  // Introtext erstellen und einfügen
  const introDiv = document.createElement("div");
  introDiv.classList.add("excursIntroText");
  introDiv.textContent = "Dies ist ein Einleitungstext zum Exkurs. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen.Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen.";

  excursMannschaft.appendChild(introDiv);

  // Container für die Buttons
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("excursButtonWrapper");

  // Button 1
  const button1 = document.createElement("button");
  button1.classList.add("excursButton", "excursButton1");
  button1.textContent = "Mannschaften vergleichen";
  button1.id = "ExMannschaft1";

  // Button 2
  const button2 = document.createElement("button");
  button2.classList.add("excursButton", "excursButton2");
  button2.textContent = "Exkurs überspringen";
  button2.id = "ExMannschaft2";


  // Buttons zum Wrapper hinzufügen
  buttonWrapper.appendChild(button1);
  buttonWrapper.appendChild(button2);

  // Button-Wrapper unter den Intro-Text setzen
  excursMannschaft.appendChild(buttonWrapper);

};




function createExkurseMannschaftContent(){

  //Excurs inneres gestalten
  const excursContainer = document.getElementById("excursContainer");

  // Schließen-Button erstellen
  const closeButton = document.createElement("button");
  closeButton.textContent = "✕";
  closeButton.classList.add("excursCloseButton");
  closeButton.id = "ExCrewClose";

  // Schließen-Button oben rechts einfügen
  excursContainer.appendChild(closeButton);

  // Container für die Buttons
  const ExCrewButtonWrapper = document.createElement("div");
  ExCrewButtonWrapper.classList.add("ExCrewButtonWrapper");

  // Button 1
  const button1 = document.createElement("button");
  button1.classList.add("ExCrewButton", "active");
  button1.textContent = "Expedition";
  button1.id = "EXCrewExpedition";

  // Button 2
  const button2 = document.createElement("button");
  button2.classList.add("ExCrewButton");
  button2.textContent = "Polar-Erfahrung";
  button2.id = "EXCrewEerfahrung";

    // Button 3
  const button3 = document.createElement("button");
  button3.classList.add("ExCrewButton");
  button3.textContent = "Dienst";
  button3.id = "EXCrewDienst";

  // Button 4
  const button4 = document.createElement("button");
  button4.classList.add("ExCrewButton");
  button4.textContent = "Herkunft";
  button4.id = "EXCrewHerkunft";

  // Button 5
  const button5 = document.createElement("button");
  button5.classList.add("ExCrewButton");
  button5.textContent = "Alter";
  button5.id = "EXCrewAlter";


  // Buttons zum Wrapper hinzufügen
  ExCrewButtonWrapper.appendChild(button1);
  ExCrewButtonWrapper.appendChild(button2);
  ExCrewButtonWrapper.appendChild(button3);
  ExCrewButtonWrapper.appendChild(button4);
  ExCrewButtonWrapper.appendChild(button5);
  

  // Button-Wrapper unter den Intro-Text setzen
  excursContainer.appendChild(ExCrewButtonWrapper);

  // Introtext erstellen und einfügen
  const textDiv = document.createElement("div");
  textDiv.id = "exCrewText";
  textDiv.textContent = "Dies ist ein Text für Expeditionen, Dies ist ein Text für Expeditionen. Dies ist ein Text für Expeditionen. Dies ist ein Text für Expeditionen. Dies ist ein Text für Expeditionen. Dies ist ein Text für Expeditionen. Dies ist ein Text für Expeditionen. Dies ist ein Text für Expeditionen.";

  excursContainer.appendChild(textDiv);



}

createExkurseMannschaftIntro ();
createExkurseMannschaftContent();



const ExCrewBtn1 = document.getElementById("ExMannschaft1");
const ExCrewBtn2 = document.getElementById("ExMannschaft2");
const closeButton = document.getElementById("ExCrewClose");
const EXCrewExpedition = document.getElementById("EXCrewExpedition");
const EXCrewEerfahrung = document.getElementById("EXCrewEerfahrung");
const EXCrewDienst = document.getElementById("EXCrewDienst");
const EXCrewHerkunft = document.getElementById("EXCrewHerkunft");
const EXCrewAlter = document.getElementById("EXCrewAlter");

// EXCURS ÖFFNEN


ExCrewBtn1.addEventListener("click", () => {
    console.log("klick");
    document.querySelector('.excursContainer').style.display = 'block';
    document.body.style.overflow = "hidden";
  });

const allButtons = document.querySelectorAll(".ExCrewButton");
function handleButtonClick(e, text) {
  // Aktive Klasse von allen entfernen
  allButtons.forEach(btn => btn.classList.remove("active"));

  // Aktive Klasse auf aktuellen Button setzen
  e.target.classList.add("active");

  // Text ändern
  document.getElementById("exCrewText").textContent = text;
}

// Klick-Event: Container ausblenden
closeButton.addEventListener("click", () => {
    excursContainer.style.display = "none";
    document.body.style.overflow = "auto";
});

EXCrewExpedition.addEventListener("click", (e) => {
  handleButtonClick(e, "Dies ist ein Text für Expeditionen...");
});

EXCrewEerfahrung.addEventListener("click", (e) => {
  handleButtonClick(e, "Dies ist ein Text für Erfahrung...");
});

EXCrewDienst.addEventListener("click", (e) => {
  handleButtonClick(e, "Dies ist ein Text für Dienst...");
});

EXCrewHerkunft.addEventListener("click", (e) => {
  handleButtonClick(e, "Dies ist ein Text für Herkunft...");
});

EXCrewAlter.addEventListener("click", (e) => {
  handleButtonClick(e, "Dies ist ein Text für Alter...");
});


//erzeuge infografik
// erzeugen der kreise
const breite = window.innerWidth;
const hoehe = breite * 0.699;
const radius = breite * 0.01;


const collideforce = d3.forceCollide().radius(function(d) {
  return breite * 0.012; // entspricht etwa 1vw
});


const canvas = d3.select('.mannschaft')
		.append("svg")
		.attr("height", hoehe)
		.attr("width", breite)
		.attr('class', 'svgbox')
		.append("g")
		.attr('class', 'axis');

const databox = d3.selectAll('.svgbox')
		.append("g")
		.attr('class', 'box');

const alterchart = databox.selectAll(".box")
		.data(mannschaft)
		.enter()
		.append("g")
		.attr('class', 'kreise');

const manschaftskreise = d3.selectAll(".kreise")
    .append("circle")
    .data(mannschaft)
    .attr("r", radius)
    .attr('id', d => d.name )
    .attr('class', d => d.schiff)
    .classed("kreisBG", true);
  

manschaftskreise.each(function(d) {
  this.classList.add(d.status);
});

const xValue = function(d) {
	return d.alter;
	};
			
const xScale = d3.scaleLinear()
    .domain([17, 54])
    .range([0, 0.98*breite]);



// Achsen für den Alterchart 
const xAxis = d3.axisBottom(xScale)
	.tickSize(-hoehe/2)
	.ticks(16);

const xAxisG = d3.select('.axis').append('g').call(xAxis)
	.attr('transform',`translate(0,${hoehe*0.65})`);

xAxisG.selectAll("text")
    .attr("transform", `translate(0,${hoehe*0.01})`)
    .style('stroke', '#869BAE');
		
xAxisG.selectAll('.domain').remove();
xAxisG.selectAll('line')
  .style('stroke-width', '0.1vw')
  .style('stroke', '#869BAE');




// koordinaten für die Kräfte festlegen
var forceXnation = d3.forceX(function(d) {
  if(d.nation === "NOR") {
    return 0.85 * breite
    } 
  if(d.nation === "GB") {
    return 0.2 * breite
    }
  if(d.nation === "SWE") {
    return 0.58 * breite
    }
  if(d.nation === "RUS") {
    return 0.7 * breite
    }
  if(d.nation === "IRL") {
    return 0.3 * breite
    }
  if(d.nation === "CND") {
    return 0.41 * breite
    }
  if(d.nation === "AUS") {
    return 0.5 * breite
    }
  if(d.nation === "NZ") {
    return 0.5 * breite
    } else {
    return 0.75 * breite }
 }).strength(0.09);
 
 
 var forceYnation = d3.forceY(function(d) {
  if(d.nation === "NOR") {
    return 0.5 * hoehe
    } 
  if(d.nation === "GB") {
    return 0.58 * hoehe
    }
  if(d.nation === "SWE") {
    return 0.73 * hoehe
    }
  if(d.nation === "RUS") {
    return 0.25 * hoehe
    }
  if(d.nation === "IRL") {
    return 0.25 * hoehe
    }
  if(d.nation === "CND") {
    return 0.82 * hoehe
    }
  if(d.nation === "AUS") {
    return 0.53 * hoehe
    }
  if(d.nation === "NZ") {
    return 0.25 * hoehe
    } else {
    return 0.84 * hoehe}
 }).strength(0.09);
 
 
 var forceXerfahrung = d3.forceX(function(d) {
  if(d.erfahrung === "beide") {
    return 0.77 * breite
    }
  if(d.erfahrung === "arktis") {
    return 0.65 * breite
    }
  if(d.erfahrung === "antarktis") {
    return 0.75 * breite
    } else {
    return 0.25 * breite }
 }).strength(0.09);
 
 
 var forceYerfahrung = d3.forceY(function(d) {
  if(d.erfahrung === "beide") {
    return 0.525 * hoehe
    }
  if(d.erfahrung === "arktis") {
    return 0.3 * hoehe
    }
  if(d.erfahrung === "antarktis") {
    return 0.8 * hoehe
    } else {
    return 0.5 * hoehe}
 }).strength(0.09);
 
 var forceXberuf = d3.forceX(function(d) {
  if(d.beruf === "zivil") {
    return 0.7 * breite
    }
  if(d.beruf === "wissenschaft") {
    return 0.45 * breite
    } else {
    return 0.18 * breite }
 }).strength(0.09);
 
 
 var forceYberuf = d3.forceY(function(d) {
  if(d.beruf === "zivil") {
    return 0.7 * hoehe
    }
  if(d.beruf === "wissenschaft") {
    return 0.3 * hoehe
    } else {
    return 0.7 * hoehe}
 }).strength(0.09);
 
 
 var forceXstart = d3.forceX(function(d) {
  if(d.schiff === "Fram") {
    return 0.7 * breite
    } else {
    return 0.3 * breite }
 }).strength(0.05);
 
 
 var forceYstart = d3.forceY(function(d) {
    return 0.5 * hoehe
 }).strength(0.1);
 
 
 var forceXexpedition = d3.forceX(function(d) {
  if(d.schiff === "Fram") {
    return 0.7 * breite
    } else {
    return 0.3 * breite }
 }).strength(0.05);
 
 
 var forceYexpedition = d3.forceY(function(d) {
  if(d.ort === "Land") {
    return 0.4 * hoehe
    }
  else {
    return 0.8 * hoehe}
 }).strength(0.1);
 
 
 var forceXalter = d3.forceX(function(d) {
       return  xScale(xValue(d))
 }).strength(1.5);
 
 
 var forceYalter = d3.forceY(function(d) {
    return 0.6 * hoehe
 }).strength(0.05);

const simulation = d3.forceSimulation(mannschaft)
	.force("x", forceXstart)
	.force("y", forceYstart)
	.force("collide", collideforce);

simulation.nodes(mannschaft)
 .on("tick", ticked)

function ticked() {
   manschaftskreise
     .attr("cx", function(d) {
       return d.x
     })
     .attr("cy", function(d) {
       return d.y
     })
};

d3.select("#EXCrewExpedition").on('click', function() {
  simulation
    .force("x", forceXstart)
    .force("y", forceYstart)
    .force("collide", collideforce)
    .alphaTarget(0.1)
    .restart()		
});

d3.select("#EXCrewEerfahrung").on('click', function() {
  simulation
    .force("x", forceXerfahrung)
    .force("y", forceYerfahrung)
    .force("collide", collideforce)
    .alphaTarget(0.1)
    .restart()		
});

d3.select("#EXCrewDienst").on('click', function() {
  simulation
    .force("x", forceXberuf)
    .force("y", forceYberuf)
    .force("collide", collideforce)
    .alphaTarget(0.1)
    .restart()		
});

  d3.select("#EXCrewAlter").on('click', function(d) {
  simulation
    .force("x", forceXalter)
    .force("y", forceYalter)
    .force("collide", collideforce)		
    .alphaTarget(0.1)
    .restart()		
});

d3.select("#EXCrewHerkunft").on('click', function() {
  simulation
    .force("x", forceXnation)
    .force("y", forceYnation)
    .force("collide", collideforce)
    .alphaTarget(0.1)
    .restart()		
});