install:
	poetry install

lint:
	-poetry run ruff .
	-poetry run black .
	-poetry run mypy --strict --explicit-package-bases .

test:
	poetry run pytest .

.PHONY: backend
backend:
	cd backend/ && poetry run uvicorn services:app --reload 

.PHONY: frontend
frontend: 
	cd frontend/ && npm run start

.PHONY: database
database:
	cd database/ && docker build -t database .
	cd database/ && docker run -p 5432:5432 database


