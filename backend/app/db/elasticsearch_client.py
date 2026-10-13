from elasticsearch import Elasticsearch
from app.core.settings import settings

# Global Elasticsearch client
es_client = Elasticsearch(settings.ELASTICSEARCH_URL)

def get_es():
    """Dependency for injecting the Elasticsearch client."""
    return es_client

def index_network_log(index_name: str, document: dict):
    """
    Pushes a raw PCAP/Network log document into Elasticsearch for the AI services to query.
    """
    try:
        res = es_client.index(index=index_name, document=document)
        return res
    except Exception as e:
        print(f"Error indexing to Elasticsearch: {e}")
        return None
