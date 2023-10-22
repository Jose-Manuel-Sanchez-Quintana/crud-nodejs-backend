const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "users_crud"
});

app.post("/create", (req, res)=> {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const years = req.body.years;

    db.query('INSERT INTO users(name, age, country, position, years) VALUES(?,?,?,?,?)',[name,age,country,position,years],
    (err, result)=>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    }
    );
});

app.get("/users", (req, res)=> {
    db.query('SELECT * FROM users',
    (err, result)=>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    }
    );
});
app.put("/update", (req, res)=> {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const years = req.body.years;

    db.query('UPDATE users SET name=?, age=?, country=?, position=?, years=? WHERE id=?',[name,age,country,position,years,id],
    (err, result)=>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    }
    );
});
app.delete("/delete/:id", (req, res)=> {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id=?',id,
    (err, result)=>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    }
    );
});


app.listen(3001,()=>{
    console.log("Running on port 3001")
})