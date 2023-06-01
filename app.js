const express = require('express');
const morgan = require("morgan");
const path = require("path");
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    return res.render('index', {title:"제목"});
});

app.listen(3000, ()=> {
    console.log("server on");
})

