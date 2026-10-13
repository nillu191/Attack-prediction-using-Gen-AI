import json
import asyncio
from aiokafka import AIOKafkaProducer
from app.core.settings import settings

class KafkaStreamingClient:
    def __init__(self):
        self.producer = None

    async def start(self):
        self.producer = AIOKafkaProducer(
            bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
        await self.producer.start()

    async def stop(self):
        if self.producer:
            await self.producer.stop()

    async def publish_log(self, topic: str, message: dict):
        if not self.producer:
            await self.start()
        await self.producer.send_and_wait(topic, message)

kafka_client = KafkaStreamingClient()
