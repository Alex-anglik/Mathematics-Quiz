import sqlite3

# connect to the database
conn = sqlite3.connect('quiz.db')

# create a cursor object
cursor = conn.cursor()

# insert a new row into the users table
cursor.execute("INSERT INTO users (username, topics, grade) VALUES (?, ?, ?)",
               ('default', 'algebra', 'A'))

# commit the changes
conn.commit()

# close the connection
conn.close()
