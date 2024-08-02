import mysql.connector

def connect_to_database():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="generated-video-flask"
        )
        print("Connecté à la base de données MySQL")
        return conn
    except mysql.connector.Error as err:
        print("Erreur de connexion à la base de données MySQL:", err)
        return None
