
import sqlite3

def insert_data(table_name, data, db):

    # Connect to database
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS questions(question, answer1, answer2, answer3, answer4, difficulty, topic, tags, source, image_path)")
    # Create placeholders for data values
    placeholders = ", ".join("?" * (len(data)+3))

    # Create SQL query
    query = f"INSERT INTO {table_name} (question, answer1, answer2, answer3, answer4, difficulty, topic, tags, source, image_path) VALUES ({placeholders})"

    # Execute query with data values
    c.execute(query, (data["question"], data['answers'][0], data['answers'][1],data['answers'][2], data['answers'][3], data["difficulty"], data["topic"], data["tags"], data["source"], data["image_path"]))

    # Commit changes and close connection
    db.commit()



