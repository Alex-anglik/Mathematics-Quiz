import sqlite3
import hashlib

# Connect to the database
conn = sqlite3.connect('quiz.db')

# Create a cursor object
cur = conn.cursor()


# Execute the ALTER TABLE statement to add a new 'ID' column with a text data type
cur.execute("UPDATE questions SET answer3='y= 4x - 2', ANSWER=2 WHERE ID=4")


# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

