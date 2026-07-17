/* Mini sequence playthrough for Sculpt case study */
(function () {
  const SEQUENCE = [
    { name: "Child's Pose", sec: 45, cue: "Settle the breath. Soften the hips back." },
    { name: "Cow / Cat", sec: 40, cue: "Wave the spine — inhale open, exhale round." },
    { name: "Downward Facing Dog", sec: 50, cue: "Press the floor away. Long spine." },
    { name: "Crescent Lunge", sec: 45, cue: "Square the hips. Reach through the crown." },
    { name: "Chair", sec: 35, cue: "Sit back into the heels. Core on." },
    { name: "Bridge", sec: 40, cue: "Press down to lift. Soften the jaw." },
    { name: "Final Rest", sec: 60, cue: "Let the work land. Nothing to do." },
  ];

  function mount(root) {
    if (!root) return;
    let i = 0;
    let playing = false;
    let remaining = SEQUENCE[0].sec;
    let timer = null;

    root.innerHTML = `
      <div class="seq-demo-title">Morning Flow — playthrough</div>
      <p class="seq-demo-sub">Mini demo of Sculpt’s timed class runner</p>
      <div class="seq-now">
        <div class="seq-pose-art" data-art>1</div>
        <div>
          <p class="seq-pose-name" data-name></p>
          <p class="seq-pose-meta" data-meta></p>
          <p class="seq-pose-meta" data-cue style="margin-top:0.35rem;text-transform:none;letter-spacing:0;font-family:var(--font-body);font-size:0.85rem;"></p>
        </div>
      </div>
      <div class="seq-progress"><span data-bar></span></div>
      <div class="seq-controls">
        <button type="button" class="primary" data-play>Play</button>
        <button type="button" data-next>Next pose</button>
        <button type="button" data-reset>Reset</button>
      </div>
      <ol class="seq-list" data-list></ol>
    `;

    const els = {
      art: root.querySelector("[data-art]"),
      name: root.querySelector("[data-name]"),
      meta: root.querySelector("[data-meta]"),
      cue: root.querySelector("[data-cue]"),
      bar: root.querySelector("[data-bar]"),
      list: root.querySelector("[data-list]"),
      play: root.querySelector("[data-play]"),
      next: root.querySelector("[data-next]"),
      reset: root.querySelector("[data-reset]"),
    };

    SEQUENCE.forEach((p, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="i">${idx + 1}</span><span>${p.name}</span><span>${p.sec}s</span>`;
      els.list.appendChild(li);
    });

    function render() {
      const p = SEQUENCE[i];
      els.art.textContent = String(i + 1);
      els.name.textContent = p.name;
      els.meta.textContent = `${remaining}s remaining · pose ${i + 1}/${SEQUENCE.length}`;
      els.cue.textContent = p.cue;
      const total = SEQUENCE.reduce((a, x) => a + x.sec, 0);
      const done = SEQUENCE.slice(0, i).reduce((a, x) => a + x.sec, 0) + (p.sec - remaining);
      els.bar.style.width = `${Math.min(100, (done / total) * 100)}%`;
      [...els.list.children].forEach((li, idx) => li.classList.toggle("active", idx === i));
      els.play.textContent = playing ? "Pause" : "Play";
    }

    function stop() {
      playing = false;
      if (timer) clearInterval(timer);
      timer = null;
      render();
    }

    function tick() {
      remaining -= 1;
      if (remaining <= 0) {
        if (i < SEQUENCE.length - 1) {
          i += 1;
          remaining = SEQUENCE[i].sec;
        } else {
          stop();
          remaining = 0;
        }
      }
      render();
    }

    els.play.addEventListener("click", () => {
      if (playing) {
        stop();
        return;
      }
      playing = true;
      timer = setInterval(tick, 1000);
      render();
    });
    els.next.addEventListener("click", () => {
      if (i < SEQUENCE.length - 1) {
        i += 1;
        remaining = SEQUENCE[i].sec;
        render();
      }
    });
    els.reset.addEventListener("click", () => {
      stop();
      i = 0;
      remaining = SEQUENCE[0].sec;
      render();
    });

    render();
  }

  document.querySelectorAll("[data-sequence-demo]").forEach(mount);
})();
