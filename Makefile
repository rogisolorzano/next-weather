# Run the tests, headless
run-e2e: start-e2e-app
	npm run cypress:run

# Open the UI
open-e2e: start-e2e-app
	npm run cypress:open

# Start a production-like build of the app
start-e2e-app:
	docker compose up -d

# Start the app with a force rebuild
start-e2e-app-build:
	docker compose up -d --build