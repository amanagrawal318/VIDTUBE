## Connected the MongoDB Database

1. **Created the Express server**  
   Set up an Express server for handling API requests.

2. **Added necessary packages**  
   Installed `cors` and `dotenv` packages. Configured environment variables in the `.env` file.

3. **Created the Database and connected to MongoDB**  
   Initialized a new database and established a connection to MongoDB and server will start when DB is connected sUccesfully

### Steps to Connect the Database

- Use **MongoDB Atlas** and copy the connection URL from the "Connect" section.
- Add the URL to the `.env` file under a suitable variable name.
- Ensure to:
  - Update the **UserID** and **Password** in the connection string.
  - Remove any trailing `/` at the end of the URL.
