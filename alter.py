import sqlite3
import hashlib

# Connect to the database
conn = sqlite3.connect('quiz.db')

# Create a cursor object
cur = conn.cursor()

# Execute the ALTER TABLE statement to rename the 'ID' column to 'old_ID'
cur.execute("ALTER TABLE questions RENAME COLUMN ANSWER TO answer")


# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

