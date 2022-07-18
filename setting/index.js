const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');
const app = express();
// DB의 정보를 config파일에 저장 하여 사용 
const db_config = require('./config/db-config.json');
// HTML > 서버로 데이터 받아오기 위하여 사용 
const bodyParser = require('body-parser');
const { title } = require('process');
app.use(bodyParser.urlencoded({extended : true}));
var user_data =[];



 
// DB연결 
const client = mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password : db_config.password,
    database : db_config.database
});

// 미들웨어 사용
app.use(express.static(__dirname +'/public'));
const mainPage = fs.readFileSync('./views/index.ejs', 'utf8');
 
app.get('/', (req, res) => {
    var page = ejs.render(mainPage, {
        title: "Temporary Title",
    });
    res.send(page);
});

// HTML에서 보낸 값을 받아와서 user_data에 저장 
app.post('/test', function(req, res){
    // console.log(req.body.date);
    var user = req.body.date;
    var user1 = req.body.title;
    user_data[0] = user;
    user_data[1] = user1;
    // console.log(user_data[0], user_data[1]);
    const Query= "SELECT * from " + user_data[0] + ";";
    user_data[2] = Query;
    console.log(user_data[0]);
    console.log(user_data[1]);
    console.log(user_data[2]);
});


// DB query
Query1 = 'SELECT COUNT(Districtname) / (SELECT COUNT(Districtname) FROM cctv) *100 from school WHERE Districtname = "강남구" or Districtname = "중랑구";'
// DB query


app.get('/getdata?', (req, res) => {
    client.query(user_data[2], function(err, result, fields){
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





// port번호의 localhost로 실행 
var port = 3000;
app.listen(port, () => {
  console.log('server on! http://localhost:'+port);
});