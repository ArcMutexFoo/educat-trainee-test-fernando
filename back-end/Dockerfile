# Use an official Python image as the base
FROM python:3.12-slim

# Set environment variables to prevent Python from writing .pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

COPY . .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose port 8000 for the Django app
EXPOSE 8000


CMD [ "python", "backend/manage.py", "runserver"]