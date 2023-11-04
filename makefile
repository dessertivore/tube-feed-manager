install:
	poetry install

lint:
	-poetry run ruff .
	-poetry run black .
	-poetry run mypy --strict --explicit-package-bases .

test:
	poetry run pytest .

backend:
	poetry run uvicorn main:app --reload 

.PHONY: frontend
frontend: 
	cd frontend/ && npm run start


database:
	docker build -t my_database .
	docker run -p 5432:5432 my_database
	

