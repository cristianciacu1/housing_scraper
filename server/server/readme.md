### How to run:
1. cd frontend && npm install && npm start
2. cd backend && python3 manage.py runserver
3. cd server && celery -A server worker --loglevel=info
4. cd server && server % celery -A server beat --loglevel=info