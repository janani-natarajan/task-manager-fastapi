FROM python:3.10

WORKDIR /app

COPY app /app

RUN pip install fastapi uvicorn sqlalchemy python-jose passlib[bcrypt]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]