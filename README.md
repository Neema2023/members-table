# Abanyamuryango — Members Table

**Authors:** [Your Name], [Partner Name]

## Run
npm install
npm run dev

## Approach
- Server-side pagination, sorting, search, filter via DummyJSON
- URL-synced state (`?page=&sortBy=&order=&q=&gender=&pageSize=`)
- Debounced search (400ms)
- Responsive strategy: horizontal scroll + sticky name column + hide email/phone below md/lg
  (justification: one DOM, accessible, scannable identity columns preserved)

## Screenshots
- Desktop: ![](./screenshots/desktop.png)
- Mobile 360px: ![](./screenshots/mobile.png)
- Empty state: ![](./screenshots/empty.png)
- Error state (offline): ![](./screenshots/error.png)

## API limitation note
Search (`/users/search`) and filter (`/users/filter`) cannot combine in DummyJSON.
A real backend should expose one `/users` endpoint with all query params — see `api/users.js` for how we'd negotiate this.