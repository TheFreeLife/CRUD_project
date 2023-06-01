const express = require('express');
const morgan = require("morgan");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();

const app = express();

//db 연결-------------------------------------------------------
let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('connected database');
});
//--------------------------------------------------------------


db.run("INSERT INTO test_table (name) VALUES ('JOHN');");


//db 해제-------------------------------------------------------
db.close((err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log("close database");
});
//--------------------------------------------------------------

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, "public")));

//URL별 처리---------------------------------------------------
app.get('/', (req, res) => {
    return res.render('index', {title:"제목"});
});

app.get('/create', (req, res) => {
    return res.render('index', {title:"제목"});
});

app.get('/delete', (req, res) => {
    return res.render('index', {title:"제목"});
});

app.get('/search', (req, res) => {
    return res.render('index', {title:"제목"});
});
//--------------------------------------------------------------

app.listen(3000, ()=> {
    console.log("server on");
});

