// Globale Steuerung
let currentSimulationMode = "EXCrewExpedition";
let xScale, xAxisG, simulation;

// Hauptfunktionen
function createExkurseMannschaftIntro() {
  const excursMannschaft = document.getElementById("excursMannschaft");

  const headline = document.createElement("p");
  headline.classList.add("excursheadline");
  headline.textContent = "Wie sind die beiden Mannschaften aufgestellt?";
  excursMannschaft.appendChild(headline);

  const introDiv = document.createElement("div");
  introDiv.classList.add("excursIntroText");
  introDiv.textContent = "Dies ist ein Einleitungstext zum Exkurs...";
  excursMannschaft.appendChild(introDiv);

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("excursButtonWrapper");

  const button1 = document.createElement("button");
  button1.classList.add("excursButton", "excursButton1");
  button1.textContent = "Mannschaften vergleichen";
  button1.id = "ExCrewBtn1";

  const button2 = document.createElement("button");
  button2.classList.add("excursButton", "excursButton2");
  button2.textContent = "Exkurs überspringen";
  button2.id = "ExCrewBtn2";

  buttonWrapper.appendChild(button1);
  buttonWrapper.appendChild(button2);
  excursMannschaft.appendChild(buttonWrapper);

  button1.addEventListener("click", () => {
    document.querySelector('.excursContainer').style.display = 'block';
    document.body.style.overflow = "hidden";
  });
}

function createExkurseMannschaftContent() {
  const excursContainer = document.getElementById("excursContainer");

  // Entfernt nur alte Texte und Buttons, nicht das SVG
  const elementsToRemove = excursContainer.querySelectorAll(
    ".ExCrewButtonWrapper, .excursCloseButton, #exCrewText"
  );
  elementsToRemove.forEach(el => el.remove());

  const closeButton = document.createElement("button");
  closeButton.textContent = "✕";
  closeButton.classList.add("excursCloseButton");
  closeButton.id = "ExCrewClose";
  excursContainer.appendChild(closeButton);

  closeButton.addEventListener("click", () => {
    excursContainer.style.display = "none";
    document.body.style.overflow = "auto";
  });

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("ExCrewButtonWrapper");

  const buttons = [
    { id: "EXCrewExpedition", text: "Expedition", default: true },
    { id: "EXCrewEerfahrung", text: "Polar-Erfahrung" },
    { id: "EXCrewDienst", text: "Dienst" },
    { id: "EXCrewHerkunft", text: "Herkunft" },
    { id: "EXCrewAlter", text: "Alter" },
  ];

  buttons.forEach(btn => {
    const button = document.createElement("button");
    button.classList.add("ExCrewButton");
    if (btn.default) button.classList.add("active");
    button.id = btn.id;
    button.textContent = btn.text;
    buttonWrapper.appendChild(button);
  });

  excursContainer.appendChild(buttonWrapper);

  const textDiv = document.createElement("div");
  textDiv.id = "exCrewText";
  textDiv.textContent = "Text für Expeditionen...";
  excursContainer.appendChild(textDiv);

  document.querySelectorAll(".ExCrewButton").forEach(button => {
    button.addEventListener("click", (e) => {
      document.querySelectorAll(".ExCrewButton").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      currentSimulationMode = e.target.id;

      const texts = {
        EXCrewExpedition: "Text für Expeditionen...",
        EXCrewEerfahrung: "Text für Erfahrung...",
        EXCrewDienst: "Text für Dienst...",
        EXCrewHerkunft: "Text für Herkunft...",
        EXCrewAlter: "Text für Alter..."
      };
      textDiv.textContent = texts[e.target.id] || "";
      updateSimulation(currentSimulationMode);
    });
  });

  createExkurseMannschaftGraphic(); // Wichtig: auch hier neu aufbauen
}

function createExkurseMannschaftGraphic() {
  const breite = window.innerWidth;
  const hoehe = breite * 0.699;
  const radius = breite * 0.01;

  const svg = d3.select('.mannschaft').html("")
    .append("svg")
    .attr("width", breite)
    .attr("height", hoehe)
    .attr("class", "svgbox");

  const axisGroup = svg.append("g").attr("class", "axis");
  const dataGroup = svg.append("g").attr("class", "box");

  xScale = d3.scaleLinear().domain([17, 54]).range([0, 0.98 * breite]);
  const xAxis = d3.axisBottom(xScale).tickSize(-hoehe / 2).ticks(16);

  xAxisG = axisGroup.append("g").call(xAxis)
    .attr("transform", `translate(0,${hoehe * 0.65})`);

  xAxisG.selectAll("text").attr("transform", `translate(0,${hoehe * 0.01})`).style("stroke", "#869BAE");
  xAxisG.selectAll(".domain").remove();
  xAxisG.selectAll("line").style("stroke-width", "0.1vw").style("stroke", "#869BAE");

  const kreise = dataGroup.selectAll(".kreise")
    .data(mannschaft)
    .enter()
    .append("circle")
    .attr("r", radius)
    .attr("id", d => d.name)
    .attr("class", d => `${d.schiff} kreisBG ${d.status}`);

  simulation = d3.forceSimulation(mannschaft)
    .force("x", forceXstart(breite))
    .force("y", forceYstart(hoehe))
    .force("collide", d3.forceCollide().radius(breite * 0.012))
    .on("tick", () => {
      kreise.attr("cx", d => d.x).attr("cy", d => d.y);
    });
}

function updateSimulation(mode) {
  const breite = window.innerWidth;
  const hoehe = breite * 0.699;
  const forceMap = {
    EXCrewExpedition: [forceXstart(breite), forceYstart(hoehe)],
    EXCrewEerfahrung: [forceXerfahrung(breite), forceYerfahrung(hoehe)],
    EXCrewDienst: [forceXberuf(breite), forceYberuf(hoehe)],
    EXCrewHerkunft: [forceXnation(breite), forceYnation(hoehe)],
    EXCrewAlter: [forceXalter(breite), forceYalter(hoehe)]
  };

  if (!simulation || !forceMap[mode]) return;

  simulation
    .force("x", forceMap[mode][0])
    .force("y", forceMap[mode][1])
    .alpha(1)
    .restart();
}

// Force Funktionen
const forceXstart = w => d3.forceX(d => d.schiff === "Fram" ? 0.7 * w : 0.3 * w).strength(0.05);
const forceYstart = h => d3.forceY(() => 0.5 * h).strength(0.1);
const forceXalter = w => d3.forceX(d => d3.scaleLinear().domain([17, 54]).range([0, 0.98 * w])(d.alter)).strength(1.5);
const forceYalter = h => d3.forceY(() => 0.6 * h).strength(0.05);
const forceXnation = w => d3.forceX(d => ({ NOR: 0.85, GB: 0.2, SWE: 0.58, RUS: 0.7, IRL: 0.3, CND: 0.41, AUS: 0.5, NZ: 0.5 }[d.nation] || 0.75) * w).strength(0.09);
const forceYnation = h => d3.forceY(d => ({ NOR: 0.5, GB: 0.58, SWE: 0.73, RUS: 0.25, IRL: 0.25, CND: 0.82, AUS: 0.53, NZ: 0.25 }[d.nation] || 0.84) * h).strength(0.09);
const forceXerfahrung = w => d3.forceX(d => ({ beide: 0.77, arktis: 0.65, antarktis: 0.75 }[d.erfahrung] || 0.25) * w).strength(0.09);
const forceYerfahrung = h => d3.forceY(d => ({ beide: 0.525, arktis: 0.3, antarktis: 0.8 }[d.erfahrung] || 0.5) * h).strength(0.09);
const forceXberuf = w => d3.forceX(d => ({ zivil: 0.7, wissenschaft: 0.45 }[d.beruf] || 0.18) * w).strength(0.09);
const forceYberuf = h => d3.forceY(d => ({ zivil: 0.7, wissenschaft: 0.3 }[d.beruf] || 0.7) * h).strength(0.09);

// Resize-Handling


// Initial
createExkurseMannschaftIntro();
createExkurseMannschaftContent();
