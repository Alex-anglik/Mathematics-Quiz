import sqlite3

# Connect to the database
conn = sqlite3.connect('quiz.db')

# Create a cursor object
cur = conn.cursor()

# Execute the SELECT statement to fetch all rows from all tables
cur.execute("SELECT * FROM sqlite_master WHERE type='table'")

# Fetch all the rows from the result set
rows = cur.fetchall()

# Loop through the rows and print the contents of each table
for row in rows:
    table_name = row[1]
    print(f"Table: {table_name}")
    cur.execute(f"SELECT * FROM {table_name}")
    table_rows = cur.fetchall()
    for table_row in table_rows:
        print(table_row)

# Close the cursor and connection
cur.close()
conn.close()
