# windows-app-bc

# Express TypeScript Server

## How to Run

1. Install dependencies: `npm install`
2. Compile TypeScript: `npx tsc`
3. Start the server: `node dist/server.js`

## API Endpoints

- `GET /ping`: Returns `true`
- `POST /submit`: Submits a form (parameters: `name`, `email`, `phone`, `github_link`, `stopwatch_time`)
- `GET /read?index=<index>`: Retrieves a submission by index
