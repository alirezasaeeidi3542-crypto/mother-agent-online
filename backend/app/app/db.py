import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    conn = psycopg2.connect(
        host="YOUR_DB_HOST",
        database="YOUR_DB_NAME",
        user="YOUR_DB_USER",
        password="YOUR_DB_PASSWORD"
    )
    return conn
