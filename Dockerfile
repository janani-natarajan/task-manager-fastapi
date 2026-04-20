FROM python:3.10

WORKDIR /app

COPY . /app

RUN pip install fastapi uvicorn sqlalchemy python-jose passlib[bcrypt]

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]