npm init -y
npm install express mysql2 body-parser cors dotenv

# Create a new file named .env and add the following code to it
```
DB_HOST=localhost
DB_USER=yourusername
DB_PASS=yourpassword
DB_NAME=yourdatabasename
PORT=5000
```


# start the server
```
node server.js
```