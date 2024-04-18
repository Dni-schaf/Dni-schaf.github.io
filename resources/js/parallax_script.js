let height = window.innerHeight;
console.log (height);

window.addEventListener('scroll', function() {
    const parallaxPanels = document.querySelectorAll('.parallax-panel');
    parallaxPanels.forEach(function(panel) {
      const scrollSpeed = parseFloat(panel.getAttribute('data-scroll-speed')); // Scrollgeschwindigkeit des Panels
      const marginTop = parseFloat(panel.style.marginTop) || 0; // Aktueller Margin-Top-Wert oder 0, falls nicht definiert
      const marginBottom = parseFloat(panel.style.marginBottom) || 0; // Aktueller Margin-Bottom-Wert oder 0, falls nicht definiert
      const panelOffset = panel.getBoundingClientRect().top; // Position des Panels relativ zum aktuellen Bildschirmbereich
      const scrollPosition = window.innerHeight - panelOffset; // Berechnung der Scrollposition relativ zum Panel
      
      const adjustment = scrollPosition * scrollSpeed; // Anpassung basierend auf der Scrollposition und der Scrollgeschwindigkeit
      const newadjustment = (panelOffset-height)/2;
      
      
      //console.log (panelOffset-height + "und" + newadjustment + "und" + marginTop );
      if (panelOffset-height <0) {
        panel.style.marginTop = (-500 - newadjustment) + 'px'; // Margin-Top-Wert erhöhen
        panel.style.marginBottom = (800 + newadjustment) + 'px'; // Margin-Bottom-Wert verringern
      } else 
      {         
        //panel.style.marginTop = (-500 + newadjustment) + 'px'; // Margin-Top-Wert erhöhen
        //panel.style.marginBottom = (500 - newadjustment) + 'px'; // Margin-Bottom-Wert verringern
    }


    });
  });

 /*
  window.addEventListener('scroll', function() {
    const parallaxTitle = document.querySelectorAll('.parallax-title');
    parallaxTitle.forEach(function(title) {

      const Top = parseFloat(title.style.top) || 0; 
      const titleOffset = title.getBoundingClientRect().top; // Position des Panels relativ zum aktuellen Bildschirmbereich
      console.log (titleOffset);
      title.style.top = (Top - height*0.001) + '%';



    });
  });

    */  