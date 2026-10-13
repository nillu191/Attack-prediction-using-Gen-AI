FROM python:3.11-slim

WORKDIR /app

# The worker needs backend requirements since it shares some Pydantic models maybe
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the worker code
COPY ./worker /app/worker

# Run Celery worker
CMD ["celery", "-A", "worker.tasks.celery_app", "worker", "--loglevel=info"]
