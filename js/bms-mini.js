/* Mini BuyMySpot map↔list sync demo */
(function () {
  const SPOTS = [
    { id: 1, addr: "820 Fuller", price: "$100/mo", x: 28, y: 42 },
    { id: 2, addr: "Green Lot (Regular)", price: "$150/mo", x: 55, y: 58 },
    { id: 3, addr: "520 S. Ashley", price: "$190/mo", x: 40, y: 70 },
    { id: 4, addr: "Near Stadium", price: "$220/mo", x: 62, y: 78 },
  ];

  function mount(root) {
    if (!root) return;
    let active = 1;
    root.innerHTML = `
      <div class="bms-mini-ui">
        <div class="bms-mini-list">
          <div class="hd">${SPOTS.length} spots · Ann Arbor</div>
          <div data-list></div>
        </div>
        <div class="bms-mini-map" data-map></div>
      </div>
      <p class="bms-mini-note">Interactive sketch — click a listing or pin (mirrors find-a-spot sync)</p>
    `;
    const list = root.querySelector("[data-list]");
    const map = root.querySelector("[data-map]");

    function render() {
      list.innerHTML = "";
      map.innerHTML = "";
      SPOTS.forEach((s) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = s.id === active ? "on" : "";
        btn.innerHTML = `<span class="addr">${s.addr}</span><span class="price">${s.price}</span>`;
        btn.addEventListener("click", () => { active = s.id; render(); });
        list.appendChild(btn);

        const pin = document.createElement("button");
        pin.type = "button";
        pin.className = "bms-pin" + (s.id === active ? " on" : "");
        pin.style.left = s.x + "%";
        pin.style.top = s.y + "%";
        pin.textContent = "P";
        pin.title = s.addr;
        pin.addEventListener("click", () => { active = s.id; render(); });
        map.appendChild(pin);
      });
    }
    render();
  }

  document.querySelectorAll("[data-bms-mini]").forEach(mount);
})();
