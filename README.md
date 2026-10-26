# KPI Dashboard

A lightweight, static HTML/CSS/JavaScript demo of a real-time KPI dashboard, featuring a login screen and a dashboard page with live-updating charts.

## Features

- **Login page** (`index.html`) with an animated login form (demo credentials only, see Usage below).
- **Dashboard page** (`dashboard.html`) with a collapsible sidebar, top navigation bar, and a dropdown menu.
- **Real-time charts** — a line chart and a pie chart (via Chart.js, with the `chartjs-adapter-date-fns` plugin) that update live over a Socket.IO WebSocket connection to a remote demo data server.
- No build step or dependencies to install — just static HTML files that pull their libraries (Chart.js, Socket.IO, Font Awesome) from public CDNs.

## Tech Stack

- HTML / CSS / vanilla JavaScript
- [Chart.js](https://www.chartjs.org/) for charts
- [Socket.IO](https://socket.io/) client for real-time data
- Font Awesome for icons

## Getting Started

No installation is required since this is a static site.

1. Clone the repository:
   ```bash
   git clone https://github.com/daivikawasthi01/KPI-Dashboard.git
   cd KPI-Dashboard
   ```
2. Open `index.html` directly in a browser, or serve the folder with any static file server (e.g. `python3 -m http.server`).
3. Log in with the demo credentials `admin` / `password` to reach the dashboard.

> **Note:** This is a front-end demo/prototype. The login check is hard-coded client-side and is not secure, so don't use it as-is for real authentication. The live charts depend on a remote demo WebSocket server (`data.gdscnsut.com`) and may not update if that server is unavailable.
