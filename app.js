const express = require('express');
const morgan = require("morgan");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();

//db 연결-------------------------------------------------------
let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('connected database');
});
//--------------------------------------------------------------


//db 해제-------------------------------------------------------
// db.close((err) => {
//     if(err) {
//         return console.error(err.message);
//     }
//     console.log("close database");
// });
//--------------------------------------------------------------


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//URL별 처리---------------------------------------------------
app.get('/', (req, res) => {
    db.all(`SELECT * FROM post`, [], (err, rows) => {
        if (err) {
            throw err;
        }
            console.log(rows);
            res.render('index', {post_list:rows});
    });
});

app.get('/create', (req, res) => {
    return res.render('post_create', {title:"제목"});
});

app.post('/create', (req, res) => {
    console.log("HIHI");
    db.run(`INSERT INTO post (title, detail) VALUES ('${req.body.title}', '${req.body.detail}');`);
    return res.redirect('/');
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

