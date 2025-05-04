let ExkursTop = 0;
const excurs = document.getElementById("excurs");

window.onload = () => {
  const element = document.getElementById("excursMannschaft");
  if (!element) {
    console.error("Element mit ID 'excursMannschaft' nicht gefunden.");
    return;
  }

  ExkursTop = getOffsetTopRelativeToBody(element);
  console.log("Offset relativ zum Body:", ExkursTop);

  // Hier kannst du mit ExkursTop weiterarbeiten, z.B. scrollen:
  // window.scrollTo({ top: ExkursTop, behavior: "smooth" });
};

function getOffsetTopRelativeToBody(el) {
  let offset = 0;
  while (el) {
    offset += el.offsetTop;
    el = el.offsetParent;
  }
  return offset;
}

    
document.getElementById("button2").addEventListener("click", function () {


    // 1. Aktuelle Scrollposition speichern
    const scrollY = window.scrollY;

    // 2. Fixierung entfernen und an Position halten
   
    excurs.style.zIndex = "1"; // Damit es unter die Comicbilder rutscht
    excurs.style.pointerEvents = "none"; // Optional, falls es nicht mehr klickbar sein soll

    // 3. Eine Fensterhöhe weiterscrollen
    //window.scrollBy({
      //  top: window.innerHeight,
      //  behavior: "smooth"
    //});
});