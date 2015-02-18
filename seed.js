var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("patients.db");

db.run("INSERT INTO patients (name,dob,email) VALUES (?,?), (?,?), (?,?), (?,?)", 
    'David', '10-20-1981', 'david@gmail.com',
    'Sharon', '10-04-1981', 'sharon@gmail.com',
    'Cheryl', '06-04-1981', 'cheryl@gmail.com',
    'Keith', '01-20-1979', 'keith@gmail.com'
    function(err){
        if (err) {
            throw err;
        }
    }
);

db.run("INSERT INTO doctors (name,dob) VALUES (?,?)", 
    'Chu', 'mrsChu@gmail.com'
    function(err){
        if (err) {
            throw err;
        }
    }
);

db.run("INSERT INTO board (issues) VALUES (?), (?), (?)", 
    'diabetes',
    'heart disease',
    'plantar fasciitis'
    function(err){
        if (err) {
            throw err;
        }
    }
);

db.run("INSERT INTO cards (name,likes,dislikes) VALUES (?,?,?), (?,?,?), (?,?,?), (?,?,?)", 
    'Insulin resistance', '10', '11',
    'Prediabetes', '111', '12', 
    'Losing weight', '78', '34',
    'New techniques for plantar fasciitis', '156', '4' 
    function(err){
        if (err) {
            throw err;
        }
    }
);

db.run