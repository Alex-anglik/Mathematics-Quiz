import sqlite3

# connect to the database (or create it if it doesn't exist)
conn = sqlite3.connect('quiz.db')

# create the "users" table
conn.execute('''
    CREATE TABLE users (
        username TEXT PRIMARY KEY,
        grade TEXT NOT NULL,
        topics TEXT NOT NULL
    )
''')

# commit the changes and close the connection
conn.commit()
conn.close()
