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
	poetry run uvicorn services:app --reload 

.PHONY: frontend
frontend: 
	npm run start

.PHONY: database
database:
	docker build -t database .
	docker run -p 5432:5432 database
	

