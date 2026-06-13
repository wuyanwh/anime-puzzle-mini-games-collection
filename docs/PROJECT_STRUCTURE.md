# Project Structure

## Frontend

`frontend/` contains browser-side game code. For Endfield, the main source entry is `frontend/games/endfield/index.js`, with UI and interaction classes in `components/`, display-only configs in `configs/`, and shared helpers in `utils/`.

The page currently loads `frontend/games/endfield/index.bundle.js` so the project can still run without a build step.

## Backend

`backend/` contains domain data and services. Endfield levels live in `backend/games/endfield/levels/`, and `backend/games/endfield/services/LevelService.js` owns level loading, totals, and previous/next navigation.

## Legacy

`legacy/original-src/` preserves the pre-refactor source tree. It is kept for reference only; active code should be added under `frontend/` or `backend/`.
