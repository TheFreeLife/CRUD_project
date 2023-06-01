const express = require('express');
const morgan = require("morgan");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();

const app = express();

const db_controler = function(query_text) {
    //db 연결-------------------------------------------------------
    let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('connected database');
    });
    //--------------------------------------------------------------

    let sql = query_text;

    db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
    });

    //db 해제-------------------------------------------------------
    db.close((err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log("close database");
    });
    //--------------------------------------------------------------
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, "public")));

//URL별 처리---------------------------------------------------
app.get('/', (req, res) => {
    db_controler(`SELECT * FROM test_table`);
    return res.render('index', {title:"제목"});
});

app.get('/create', (req, res) => {
    return res.render('post_create', {title:"제목"});
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

