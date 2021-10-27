from pymongo import collection, mongo_client
import time
from locust import HttpUser, task, between

# Prueba de estres de mongo 

def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb://admin:teamsoa@168.62.39.210:27017/karaoke"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['karaoke']


class QuickstartUser(HttpUser):
    wait_time = between(5, 6)

    def on_start(self):
        self.dbname = get_database()
        self.userCollection = self.dbname["Users"]
        self.userElement =  {"username":"user10"}

    @task
    def hello_world(self):
        element = self.userCollection.find(self.userElement)[0]
        print(element)        
