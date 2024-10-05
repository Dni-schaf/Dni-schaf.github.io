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


drawPath(Scott, datecountScott);
drawPath(Amundsen, datecountAmundsen);


// enthält die Längen der Pfadabschnitte zwischen zwei Datumsangaben   
let totalLengthScott = fillLength(datecountScott, "Scott");
let totalLengthAmundsen = fillLength(datecountAmundsen, "Amundsen");
 
hidelines(datecountScott, "Scott", totalLengthScott); 
hidelines(datecountAmundsen, "Amundsen", totalLengthAmundsen);

