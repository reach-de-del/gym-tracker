# 🏀 Hoops Tracker

A no-build, mobile-friendly workout tracker for a basketball strength, speed and endurance plan.

- Tap a set to tick it off. A **rest timer** starts automatically with the right rest time for that exercise.
- A **progress bar** per day (and for the whole week) fills as you complete sets. Days turn green when finished.
- Timer has +15 s / -15 s / Skip, quick presets (0:30 to 3:00), a beep and vibration when rest is over.
- Progress is saved in your browser and resets automatically each Monday.
- Works offline and can be added to your phone's home screen.

## Weekly plan

| Day | Focus |
|---|---|
| Mon | Lower body · Strength |
| Tue | Upper body · Push and pull |
| Wed | Lower body · Power and balance |
| Thu | Upper body · Volume and stability |
| Fri | Speed, agility and conditioning |
| Sat | Full rest |
| Sun | Active rest |

## Put it online with GitHub Pages

1. Create a new repository on GitHub (for example `hoops-tracker`).
2. Upload all files from this folder to the repository root (`index.html`, `style.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `README.md`).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then save.
5. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

Command line version:

```bash
git init
git add .
git commit -m "Add Hoops Tracker"
git branch -M main
git remote add origin https://github.com/<your-username>/hoops-tracker.git
git push -u origin main
```

## Run it locally

Just open `index.html` in a browser, or serve the folder (needed for the offline mode and home-screen install):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Change the plan

Open `app.js` and edit the `PLAN` object at the top. Each exercise looks like this:

```js
{ n: "Back or goblet squat", sets: 4, reps: "5 reps", rest: 150, note: "optional tip" }
```

`rest` is in seconds. Use `0` for items that don't need a rest timer.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `style.css` | Styling |
| `app.js` | Plan data, tracking, progress bars, rest timer |
| `sw.js` | Offline cache |
| `manifest.webmanifest` | Home-screen install details |
