const express = require('express');
const app = express();
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');
 
const client = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : '2253',
    database : 'mydb'
});


app.use(express.static(__dirname +'/public'));
const mainPage = fs.readFileSync('./views/index.ejs', 'utf8');
 
app.get('/', (req, res) => {
    var page = ejs.render(mainPage, {
        title: "Temporary Title",
    });
    res.send(page);
});


Query1 = 'SELECT COUNT(Districtname) / (SELECT COUNT(Districtname) FROM cctv) *100 from school WHERE Districtname = "강남구" or Districtname = "중랑구";'

// 쿼리문 
Query= "SELECT * from cctv;"
app.get('/getdata?', (req, res) => {
    client.query(Query, function(err, result, fields){
        if(err) throw err;
        // DB의 데이터를 받아와서 EJS에 전달 (.rende)
        // data : 각 데이터를 받아온다.
        // fields : 각 데이터의 해당 위치를 받아온다.
        else{
            var page = ejs.render(mainPage, {
                title: "Temporary Title",
                data: result,
            });
            res.send(page);
        }
    });
});







var port = 3000;
app.listen(port, () => {
  console.log('server on! http://localhost:'+port);
});