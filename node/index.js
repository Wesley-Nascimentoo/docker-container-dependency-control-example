import express from 'express';

import mysql from 'mysql'

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000;

const config = {
    host: 'mysql_db',
    user: 'root',
    password: 'root',
    database: 'docker_study'
};

const connection = mysql.createConnection(config);



app.get('/', (req, res) => {;
    connection.query(`INSERT INTO (name) people VALUES (Wesley);`, )
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})