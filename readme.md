### How to run the application
1. Frontend
`cd frontend && npm install && npm start`

2. Backend
`cd backend && python3 manage.py runserver`

3. Celery
3.1 `celery -A server worker --loglevel=info`
3.2 `celery -A server beat --loglevel=info`

### Restart celery
`sudo celery multi restart worker -A server`