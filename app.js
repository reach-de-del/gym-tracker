/* Hoops Tracker: weekly workout checklist with rest timers.
   Edit the PLAN object below to change exercises, sets, reps or rest times.
   rest = seconds of rest after each set (0 = no timer). */

const WARMUP = {
  n: "Warm-up (8 min)", sets: 1, rest: 0,
  reps: "Light jog or jump rope, leg swings, hip openers, glute bridges, ankle hops"
};

const PLAN = {
  mon: {
    name: "Monday", short: "Mon", focus: "Lower body · Strength",
    exercises: [
      WARMUP,
      { n: "Box jumps", sets: 3, reps: "4 reps", rest: 90, note: "Power first, while fresh. Land soft." },
      { n: "Back or goblet squat", sets: 4, reps: "5 reps", rest: 150 },
      { n: "Romanian deadlift", sets: 3, reps: "8 reps", rest: 120 },
      { n: "Bulgarian split squat", sets: 3, reps: "8 each leg", rest: 90 },
      { n: "Single-leg calf raise", sets: 3, reps: "12 reps", rest: 60 },
      { n: "Nordic hamstring curl (or machine curl)", sets: 3, reps: "6 reps", rest: 90 }
    ]
  },
  tue: {
    name: "Tuesday", short: "Tue", focus: "Upper body · Push and pull",
    exercises: [
      WARMUP,
      { n: "Bench press or dumbbell bench", sets: 4, reps: "6 reps", rest: 120 },
      { n: "Pull-ups (or lat pulldown)", sets: 4, reps: "6-8 reps", rest: 120 },
      { n: "Standing overhead press", sets: 3, reps: "8 reps", rest: 90 },
      { n: "Single-arm dumbbell row", sets: 3, reps: "10 each arm", rest: 75 },
      { n: "Face pulls", sets: 3, reps: "15 reps", rest: 60 },
      { n: "Pallof press", sets: 3, reps: "10 each side", rest: 60, note: "Core anti-rotation." }
    ]
  },
  wed: {
    name: "Wednesday", short: "Wed", focus: "Lower body · Power and balance",
    exercises: [
      WARMUP,
      { n: "Broad jumps or single-leg hops", sets: 3, reps: "5 reps", rest: 90 },
      { n: "Front squat or trap bar deadlift", sets: 4, reps: "5 reps", rest: 150 },
      { n: "Hip thrust", sets: 3, reps: "8 reps", rest: 90 },
      { n: "Walking lunges or step-ups", sets: 3, reps: "10 each leg", rest: 75 },
      { n: "Single-leg RDL", sets: 3, reps: "8 each leg", rest: 75, note: "Balance work. Go slow." },
      { n: "Lateral lunges", sets: 3, reps: "8 each side", rest: 60 },
      { n: "Tibialis raises", sets: 2, reps: "15 reps", rest: 45, note: "Shin and ankle health." }
    ]
  },
  thu: {
    name: "Thursday", short: "Thu", focus: "Upper body · Volume and stability",
    exercises: [
      WARMUP,
      { n: "Incline dumbbell press", sets: 4, reps: "8 reps", rest: 90 },
      { n: "Chin-ups or neutral-grip pulldown", sets: 4, reps: "8 reps", rest: 90 },
      { n: "Landmine or half-kneeling press", sets: 3, reps: "8 each arm", rest: 75 },
      { n: "Seated cable row", sets: 3, reps: "10 reps", rest: 75 },
      { n: "Push-up variations", sets: 2, reps: "max reps, clean form", rest: 60 },
      { n: "Farmer carries", sets: 3, reps: "30 m", rest: 60 },
      { n: "Plank or dead bug", sets: 3, reps: "30-40 s", rest: 45 }
    ]
  },
  fri: {
    name: "Friday", short: "Fri", focus: "Speed, agility and conditioning",
    exercises: [
      WARMUP,
      { n: "Sprints", sets: 6, reps: "20 m, max effort", rest: 75, note: "Full recovery between each sprint." },
      { n: "Defensive slides and closeouts", sets: 5, reps: "15 s each", rest: 45 },
      { n: "Cone or ladder agility drills", sets: 1, reps: "15 min total", rest: 0 },
      { n: "Conditioning intervals", sets: 10, reps: "30 s hard, 30 s easy", rest: 0, note: "Bike, shuttle runs or full-court sprints." },
      { n: "Light core finisher", sets: 1, reps: "5-10 min", rest: 0 }
    ]
  },
  sat: {
    name: "Saturday", short: "Sat", focus: "Full rest",
    exercises: [
      { n: "Sleep 8+ hours", sets: 1, reps: "Recovery is when you get stronger", rest: 0 },
      { n: "Hit your protein target", sets: 1, reps: "About 90-110 g for the day", rest: 0 },
      { n: "Stay off your feet", sets: 1, reps: "No training today", rest: 0 }
    ]
  },
  sun: {
    name: "Sunday", short: "Sun", focus: "Active rest",
    exercises: [
      { n: "Easy walk, cycle or swim", sets: 1, reps: "30-40 min, low effort", rest: 0 },
      { n: "Mobility", sets: 1, reps: "10-15 min: hips, ankles, thoracic spine", rest: 0 },
      { n: "Light shooting (optional)", sets: 1, reps: "Easy form work only", rest: 0 }
    ]
  }
};

const ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const STORE_KEY = "hoops-tracker-v1";

/* ---------- date helpers ---------- */
function pad(n) { return String(n).padStart(2, "0"); }
function isoDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function weekKey(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // back to Monday
  return isoDate(d);
}
function todayId() { return ORDER[(new Date().getDay() + 6) % 7]; }
function fmt(sec) {
  sec = Math.max(0, Math.round(sec));
  return Math.floor(sec / 60) + ":" + pad(sec % 60);
}

/* ---------- state ---------- */
let state = { week: weekKey(new Date()), done: {}, history: {} };

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY));
    if (raw && typeof raw === "object") {
      state = {
        week: raw.week || state.week,
        done: raw.done && typeof raw.done === "object" ? raw.done : {},
        history: raw.history && typeof raw.history === "object" ? raw.history : {}
      };
    }
  } catch (e) { /* ignore corrupt data */ }
  rollOver();
}

function rollOver() {
  const cur = weekKey(new Date());
  if (state.week !== cur) {
    state.history[state.week] = weekPct();
    const keys = Object.keys(state.history).sort();
    while (keys.length > 12) delete state.history[keys.shift()];
    state.week = cur;
    state.done = {};
    save();
  }
}

/* ---------- progress maths ---------- */
function dayTotals(id) {
  let total = 0, done = 0;
  PLAN[id].exercises.forEach((ex, ei) => {
    for (let s = 0; s < ex.sets; s++) {
      total++;
      if (state.done[id + "-" + ei + "-" + s]) done++;
    }
  });
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function weekPct() {
  let total = 0, done = 0;
  ORDER.forEach(id => { const t = dayTotals(id); total += t.total; done += t.done; });
  return total ? Math.round((done / total) * 100) : 0;
}

function exerciseDone(id, ei) {
  const ex = PLAN[id].exercises[ei];
  for (let s = 0; s < ex.sets; s++) if (!state.done[id + "-" + ei + "-" + s]) return false;
  return true;
}

/* ---------- rendering ---------- */
let selected = todayId();
const $ = sel => document.querySelector(sel);

function renderTabs() {
  const today = todayId();
  $("#tabs").innerHTML = ORDER.map(id => {
    const t = dayTotals(id);
    const cls = ["tab", id === selected ? "sel" : "", id === today ? "today" : "", t.pct === 100 ? "complete" : ""].join(" ").trim();
    return '<button type="button" class="' + cls + '" data-day="' + id + '" aria-label="' + PLAN[id].name + ", " + t.pct + '% done">' +
      '<span class="d">' + PLAN[id].short + '</span><span class="m"><i style="width:' + t.pct + '%"></i></span></button>';
  }).join("");
}

function renderWeek() {
  const wp = weekPct();
  const daysDone = ORDER.filter(id => dayTotals(id).pct === 100).length;
  $("#weekPct").textContent = wp + "%";
  const bar = $("#weekBar");
  bar.style.width = wp + "%";
  bar.className = wp === 100 ? "full" : "";
  const prev = Object.keys(state.history).sort().pop();
  $("#weekNote").textContent = daysDone + " of 7 days complete" +
    (prev !== undefined ? " · last week: " + state.history[prev] + "%" : "");
}

function renderDay() {
  const d = PLAN[selected];
  const t = dayTotals(selected);
  const full = t.pct === 100;
  let html =
    '<section class="dayhead"><div><h2>' + d.name + '</h2><p>' + d.focus + '</p></div>' +
    '<div class="pct' + (full ? " full" : "") + '">' + t.pct + '%</div></section>' +
    '<div class="bar big' + (full ? " full" : "") + '"><span style="width:' + t.pct + '%"></span></div>' +
    '<p class="muted" style="margin-top:6px">' + t.done + ' of ' + t.total + ' sets done</p>';

  if (full) {
    html += '<div class="banner">✅ ' + d.name + ' complete. Nice work.</div>';
  }

  d.exercises.forEach((ex, ei) => {
    const complete = exerciseDone(selected, ei);
    let sets = "";
    for (let s = 0; s < ex.sets; s++) {
      const key = selected + "-" + ei + "-" + s;
      const on = !!state.done[key];
      const single = ex.sets === 1;
      sets += '<button type="button" class="set' + (single ? " wide" : "") + '" data-key="' + key +
        '" data-rest="' + ex.rest + '" data-name="' + ex.n.replace(/"/g, "&quot;") + '" aria-pressed="' + on + '">' +
        (single ? (on ? "✓ Done" : "Mark done") : (on ? "✓" : s + 1)) + "</button>";
    }
    const meta = ex.sets > 1 ? ex.sets + " × " + ex.reps : ex.reps;
    html += '<article class="card' + (complete ? " done" : "") + '">' +
      '<div class="card-head"><h3>' + ex.n + '</h3>' +
      (ex.rest > 0 ? '<span class="meta">rest ' + fmt(ex.rest) + '</span>' : "") + '</div>' +
      '<p class="note">' + (ex.sets > 1 ? meta : (ex.sets === 1 && ex.rest === 0 ? ex.reps : meta)) + '</p>' +
      (ex.note ? '<p class="note">' + ex.note + '</p>' : "") +
      '<div class="sets">' + sets + '</div></article>';
  });

  html += '<div style="margin-top:14px"><button type="button" class="ghost" id="resetDay">Reset ' + d.name + '</button></div>';
  $("#app").innerHTML = html;
}

function render() {
  renderTabs();
  renderWeek();
  renderDay();
}

/* ---------- rest timer ---------- */
const T = { end: 0, total: 0, iv: null, label: "", active: false };
let audioCtx = null;
let wakeLock = null;
const baseTitle = document.title;

function unlockAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
  } catch (e) { /* no audio */ }
}

function beep() {
  try {
    if (!audioCtx) return;
    [0, 0.25, 0.5].forEach((delay, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = i === 2 ? 1175 : 880;
      const t0 = audioCtx.currentTime + delay;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.3, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.22);
    });
  } catch (e) { /* ignore */ }
  try { if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 300]); } catch (e) { /* ignore */ }
}

async function holdScreen() {
  try {
    if ("wakeLock" in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = null; });
    }
  } catch (e) { /* not allowed */ }
}

function releaseScreen() {
  try { if (wakeLock) { wakeLock.release(); wakeLock = null; } } catch (e) { /* ignore */ }
}

function showDock(mode) {
  const dock = $("#dock");
  dock.classList.toggle("running", mode === "running");
  dock.classList.toggle("finished", mode === "finished");
  $("#dockIdle").hidden = mode !== "idle";
  $("#dockActive").hidden = mode === "idle";
}

function startTimer(sec, label) {
  unlockAudio();
  clearInterval(T.iv);
  T.total = sec;
  T.end = Date.now() + sec * 1000;
  T.label = label || "Rest";
  T.active = true;
  $("#dockName").textContent = T.label;
  showDock("running");
  $("#tSkip").textContent = "Skip";
  T.iv = setInterval(tick, 250);
  tick();
  holdScreen();
}

function tick() {
  if (!T.active) return;
  const remaining = Math.max(0, Math.ceil((T.end - Date.now()) / 1000));
  $("#dockTime").textContent = fmt(remaining);
  $("#dockBar").style.width = (T.total > 0 ? Math.min(100, ((T.total - remaining) / T.total) * 100) : 100) + "%";
  document.title = fmt(remaining) + " · " + baseTitle;
  if (remaining <= 0) finishTimer();
}

function finishTimer() {
  clearInterval(T.iv);
  T.iv = null;
  T.active = false;
  $("#dockTime").textContent = "Go!";
  $("#dockName").textContent = "Rest over. Next set.";
  $("#dockBar").style.width = "100%";
  $("#tSkip").textContent = "Done";
  showDock("finished");
  document.title = baseTitle;
  releaseScreen();
  beep();
  T.finishedAt = setTimeout(() => { if (!T.active) resetDock(); }, 8000);
}

function resetDock() {
  clearInterval(T.iv);
  clearTimeout(T.finishedAt);
  T.iv = null;
  T.active = false;
  document.title = baseTitle;
  releaseScreen();
  showDock("idle");
}

function adjustTimer(delta) {
  if (!T.active) return;
  T.end += delta * 1000;
  T.total = Math.max(1, T.total + delta);
  tick();
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const tab = e.target.closest("[data-day]");
  if (tab) { selected = tab.dataset.day; render(); window.scrollTo({ top: 0 }); return; }

  const setBtn = e.target.closest(".set");
  if (setBtn) {
    unlockAudio();
    rollOver();
    const key = setBtn.dataset.key;
    const wasOn = !!state.done[key];
    if (wasOn) delete state.done[key]; else state.done[key] = true;
    save();
    const rest = parseInt(setBtn.dataset.rest, 10) || 0;
    const t = dayTotals(selected);
    render();
    if (!wasOn) {
      if (t.pct === 100) resetDock();
      else if (rest > 0) startTimer(rest, "Rest · " + setBtn.dataset.name);
    }
    return;
  }

  const start = e.target.closest("[data-start]");
  if (start) { startTimer(parseInt(start.dataset.start, 10), "Rest"); return; }

  if (e.target.id === "resetDay") {
    if (confirm("Clear all ticks for " + PLAN[selected].name + "?")) {
      Object.keys(state.done).forEach(k => { if (k.indexOf(selected + "-") === 0) delete state.done[k]; });
      save();
      render();
    }
    return;
  }

  if (e.target.id === "resetWeek") {
    if (confirm("Clear all ticks for this week?")) {
      state.done = {};
      save();
      resetDock();
      render();
    }
  }
});

$("#tMinus").addEventListener("click", () => adjustTimer(-15));
$("#tPlus").addEventListener("click", () => adjustTimer(15));
$("#tSkip").addEventListener("click", resetDock);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (T.active) { tick(); holdScreen(); }
    rollOver();
    render();
  }
});

/* ---------- start ---------- */
load();
render();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}
