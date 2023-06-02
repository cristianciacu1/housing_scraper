from celery import shared_task
from server.views import scrape_websites
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@shared_task
def scrape_task():
    try:
        scrape_websites(None)
        logger.info("Successfully retrieved data and persisted it into database.")
    except Exception as e:
        logger.info("An error occurred while scraping websites:", e)