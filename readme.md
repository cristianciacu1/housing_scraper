### How to run the application
1. Frontend
`cd frontend && npm install && npm start`

2. Backend
`cd server && python3 manage.py runserver`

3. RabbitMQ
`cd server && rabbitmq-server start`

4. Celery
4.1 `celery -A server worker --loglevel=info`
4.2 `celery -A server beat --loglevel=info`

### Restart celery
`sudo celery multi restart worker -A server`