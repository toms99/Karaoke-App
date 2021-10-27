from pymongo import collection, mongo_client
import time


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
    
def test(collection, testElement, findElement):
    i = 0
    while True:
        collection.insert_many([testElement.copy() for j in range(100000)])
        collection.insert_one(findElement.copy())
        start_time = time.time()
        element = collection.find(findElement)[0]
        diff = time.time() - start_time
        print("Seconds "+ '%.10f' % diff)
        if time.time() - start_time >=1:
            print("End on iteration: " + str(i))
            break
        print(i)
        i+=1
        collection.delete_one(findElement)

# Get the database
dbname = get_database()
userCollection = dbname["usersTest"]
testUser = {"username": "aaassssddd", "password":"ssdsdsdsd"}
#test(userCollection, testUser, {"target":"yes"})

songsCollection = dbname["songsTest"]
testSong = {"Nombre": "dfdfd", "Artista":"sdafdsf", "Album": "Album", "owner":"public", "url":"dsfsdfasfsdafsdfasdfasdfasdfasfadfasdfasfadsfasdfasdfsadfasdfdsfsdfasfsdafsdfasdfasdfasdfasfadfasdfasfadsfasdfasdfsadfasdf","letra":"dsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsafdsfadsfdsafsadfasdfasdfdsafdsafadsfdsafasdfsadfsdafdsafasfsadfsdafdsafasfasdfsdafdsaf"}
test(songsCollection, testSong, {"test":"test"})
