# SkyCast Weather

A premium weather dashboard built with React 19, TypeScript, Tailwind CSS, and the OpenWeatherMap API. Features adaptive atmospheric backgrounds, glassmorphism UI, and a fully race-condition-free data layer.

<img width="5760" height="3240" alt="SkyCast — Clear weather" src="https://github.com/user-attachments/assets/80ec3cf9-1eb9-4c8e-b580-cddddce4442d" />

<img width="5760" height="3240" alt="SkyCast — Rainy weather" src="https://github.com/user-attachments/assets/a9e4eef2-da52-487f-a68e-cd78ca7b0192" />

<img width="5760" height="3240" alt="SkyCast — Cloudy weather" src="https://github.com/user-attachments/assets/a1fe399f-0c17-4c5a-9e68-28eb08f98460" />

---

## Features

**Weather Data**
- Real-time conditions: temperature, feels-like, high/low, description
- Today's highlights: wind speed & direction, humidity, visibility, pressure, sunrise & sunset
- 5-day forecast filtered to midday readings for accuracy

**Search & Location**
- City search with instant results
- One-tap geolocation via the browser Geolocation API
- Celsius / Fahrenheit toggle that instantly re-fetches in the new unit

**UI & Performance**
- Adaptive gradient background that transitions smoothly per weather condition
- Glassmorphism cards with `backdrop-blur` and layered transparency
- Layout skeleton shown during loading — no layout shift when data arrives
- Dismissable error messages with specific copy per failure type (404, 401, 429, network)
- All components wrapped in `React.memo` — zero unnecessary re-renders

**Architecture**
- Race-condition-free fetching via `axios.CancelToken` — rapid searches never produce stale results
- All fetch logic isolated in a single `useWeather` custom hook
- `Intl.DateTimeFormat` instances created once at module level, not per render
- `useMemo` on every computed value; `useCallback` on every handler

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS (via CDN in dev, Vite build for prod) |
| HTTP | Axios with CancelToken |
| Icons | Lucide React |
| Build | Vite 6 |
| Deploy | GitHub Pages via `gh-pages` |
| Data | OpenWeatherMap API v2.5 |

---

## Project Structure

```
src/
├── hooks/
│   └── useWeather.ts          # All fetch logic, cancellation, unit state
├── services/
│   └── weatherService.ts      # Axios client, typed error handling
├── components/
│   ├── SearchBar.tsx           # Uncontrolled input (useRef), unit toggle
│   ├── CurrentWeather.tsx      # Temp, condition, high/low
│   ├── Highlights.tsx          # Wind, humidity, visibility, pressure, sun times
│   ├── Forecast.tsx            # 5-day strip with memoised filter
│   ├── Skeleton.tsx            # Layout placeholder matching exact grid
│   ├── ErrorMessage.tsx        # Dismissable error banner
│   ├── WeatherIcon.tsx         # Condition → Lucide icon map
│   └── Loader.tsx              # Minimal spinner fallback
├── types.ts                    # WeatherData, ForecastData, TempUnit
├── constants.ts                # API key (env var), base URL, default city
├── vite-env.d.ts               # ImportMetaEnv declaration for VITE_ vars
└── App.tsx                     # Shell — layout, background, state wiring
```

### `useWeather` hook

The central piece of the architecture. Exposes a clean interface and keeps `App.tsx` logic-free:

```ts
const {
  weather,        // WeatherData | null
  forecast,       // ForecastData | null
  loading,        // boolean
  error,          // string | null
  unit,           // 'metric' | 'imperial'
  searchByCity,   // (city: string) => void
  searchByCoords, // (lat: number, lon: number) => void
  toggleUnit,     // () => void  — re-fetches current location in new unit
  clearError,     // () => void
} = useWeather();
```

Every call to `searchByCity` or `searchByCoords` cancels the previous in-flight request before issuing a new one, so typing quickly or switching units never produces a race condition.

---

## Getting Started

**Prerequisites:** Node.js 18+, a free [OpenWeatherMap API key](https://openweathermap.org/api)

```bash
# 1. Clone
git clone https://github.com/adiletbtrv/SkyCast-Weather.git
cd SkyCast-Weather

# 2. Install dependencies
npm install

# 3. Add your API key
cp .env.example .env
# Edit .env → set VITE_OPENWEATHER_API_KEY=your_key_here

# 4. Run
npm run dev
```

Open `http://localhost:3000`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_OPENWEATHER_API_KEY` | No | Your OWM key. Falls back to a bundled demo key if unset. |

A demo key is bundled for convenience. For production use, always set your own key — the demo key is rate-limited and may be revoked.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and push to GitHub Pages |

---

## Adaptive Backgrounds

The background gradient transitions smoothly whenever the weather condition changes:

| Condition | Gradient |
|---|---|
| Clear | Amber → Orange → Rose |
| Clouds | Slate dark → Slate mid → Slate light |
| Rain | Deep blue → Blue → Slate |
| Thunderstorm | Indigo → Violet → Slate |
| Snow | Sky → Blue → Slate light |
| Drizzle | Blue → Cyan |
| Mist / Fog / Haze | Stone |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Author

Built by **Adilet Batyrov**

- GitHub: [github.com/adiletbtrv](https://github.com/adiletbtrv)
- LinkedIn: [linkedin.com/in/adilet-batyrov](https://www.linkedin.com/in/adilet-batyrov/)
- Live: [adiletbtrv.github.io/SkyCast-Weather](https://adiletbtrv.github.io/SkyCast-Weather/)