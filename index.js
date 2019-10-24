const express = require('express')
const bodyParser = require('body-parser')

const dotenv = require('dotenv').config()
const app = express()
const mysql = require('mysql')

var connection = null;
var connectionGET = null;
var connectionPUT = null;
var connectionDELETE = null;

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Praktikum Minggu 5'))

// app.get('/songs', function (req, res) {
//     if (connection == null) {
//         connection = mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME
//         });

//         connection.connect()
//     }

//     connection.query('SELECT * FROM songs', function (err, rows, fields) {
//         if (err) throw err
//         res.send(rows)
//     })
// })

app.get('/songs/:songID', function (req,res) {
    if (connection == null) {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    connection.connect()

    connection.query('SELECT * FROM songs where kode_lagu = ' + req.params.songID, function (err, rows, fields) {
        if (err) throw err;
        if (rows.length >= 1) res.send(rows[0]);
        else res.status(404).send({
            "message": "The item does not exist"
        })
    })
})

app.post('/songs', function (req, res) {
    var errors = [];

    if (req.body.kode_lagu.trim() == "") {
        errors.push({
            "message": "Kode Lagu should not be empty",
            "code": 1,
            "field": "kode_lagu"
        });
    }

    if (req.body.judul_lagu.trim() == "") {
        errors.push({
            "message": "Judul Lagu should not be empty",
            "code": 2,
            "field": "judul_lagu"
        });
    }

    if (isNaN(req.body.tahun_rilis)) {
        errors.push({
            "message": "Tahun Rilis should be a number",
            "code": 3,
            "field": "tahun_rilis"
        });
    }

    if (req.body.tahun_rilis < 0 || req.body.tahun_rilis > 2020) {
        errors.push({
            "message": "Tahun Rilis should be a positive number",
            "code": 4,
            "field": "tahun_rilis"
        });
    }

    if (errors.length == 0) {
        if (connection == null) {
            connection = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
        }
    
        connection.connect()
    
        connection.query("INSERT INTO songs (kode_lagu, judul_lagu, nama_album, tahun_rilis, genre, durasi, nama_penyanyi, nama_pengarang) VALUES ('" 
        + req.body.kode_lagu + "','" 
        + req.body.judul_lagu + "','" 
        + req.body.nama_album + "','" 
        + req.body.tahun_rilis + "','" 
        + req.body.genre + "','" 
        + req.body.durasi + "','" 
        + req.body.nama_penyanyi + "','" 
        + req.body.nama_pengarang + "')", function (err, rows, fields) {
            if (err) {
                res.status(500).send({
                    "message": "Something is broken"
                })
            } else {
                res.status(201).send({
                    "message": "The item was created successfully"
                })
            }
        })
    } else {
        res.status(400).send({
            "message": "Validation errors in your request",
            "errors": errors
        });
    }
})

app.put('/songs/:songID', function (req, res) {
    var errors = [];

    if (req.body.kode_lagu.trim() == "") {
        errors.push({
            "message": "Kode Lagu should not be empty",
            "code": 1,
            "field": "kode_lagu"
        });
    }

    if (req.body.judul_lagu.trim() == "") {
        errors.push({
            "message": "Judul Lagu should not be empty",
            "code": 2,
            "field": "judul_lagu"
        });
    }

    if (isNaN(req.body.tahun_rilis)) {
        errors.push({
            "message": "Tahun Rilis should be a number",
            "code": 3,
            "field": "tahun_rilis"
        });
    }

    if (req.body.tahun_rilis < 0 || req.body.tahun_rilis > 2020) {
        errors.push({
            "message": "Tahun Rilis should be a positive number",
            "code": 4,
            "field": "tahun_rilis"
        });
    }

    if (errors.length == 0) {
        if (connectionGET == null) {
            connectionGET = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
        }
    
        connectionGET.connect()

        if (connectionPUT == null) {
            connectionPUT = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });

            connectionPUT.connect()

            connectionGET.query('SELECT kode_lagu FROM songs where kode_lagu = ' + req.params.songID, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                        "message": "Something is broken"
                    });
                } else {
                    connectionPUT.query("UPDATE songs SET judul_lagu ='" + req.body.judul_lagu 
                    + "', nama_album='" + req.body.nama_album
                    + "', tahun_rilis='" + req.body.tahun_rilis 
                    + "', genre='" + req.body.genre 
                    + "', durasi='" + req.body.durasi 
                    + "', nama_penyanyi='" + req.body.nama_penyanyi 
                    + "', nama_pengarang='" + req.body.nama_pengarang + "' WHERE kode_lagu = " + req.params.songID, function (err, rows, fields) {
                        if (err) res.status(500).send({
                            "message": "Something is broken"
                        });
                        else {
                            res.status(200).send({
                                "kode_lagu": req.params.songID,
                                "judul_lagu" : req.body.judul_lagu,
                                "nama_album": req.body.nama_album,
                                "tahun_rilis": req.body.tahun_rilis,
                                "genre": req.body.genre,
                                "durasi": req.body.durasi,
                                "nama_penyanyi": req.body.nama_penyanyi,
                                "nama_pengarang": req.body.nama_pengarang
                            });
                        }
                    })
                }
            })
        }
    } else {
        res.status(400).send({
            "message": "Validation errors in your request",
            "errors": errors
        });
    }
})

app.delete('/songs/:songID', function (req, res) {
    if (connectionGET == null) {
        connectionGET = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    connectionGET.connect()

    if (connectionDELETE == null) {
        connectionDELETE = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        connectionDELETE.connect()

        connectionGET.query('SELECT kode_lagu FROM songs where kode_lagu = ' + req.params.songID, function (err, rows, fields) {
            if (err) {
                res.status(500).send({
                    "message": "Something is broken"
                });
            } else {
                connectionDELETE.query("DELETE FROM songs WHERE kode_lagu = " + req.params.songID, function (err, rows, fields) {
                    if (err) res.status(500).send({
                        "message": "Something is broken"
                    });
                    else {
                        res.status(204).send({
                            "message": "The item was deleted successfully"
                        });
                    }
                })
            }
        })
    }
})

// app.get('/songs', function (req, res) {
//     var keyword = req.query.query

//     if (connection == null) {
//         connection = mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME
//         });

//         connection.connect()
//     }

//     connection.query("SELECT judul_lagu, nama_album, nama_penyanyi, nama_pengarang FROM songs WHERE judul_lagu LIKE '%" + keyword 
//     + "%' OR nama_album LIKE '%" + keyword + "%' OR nama_penyanyi LIKE '%" + keyword + "%' OR nama_pengarang LIKE '%" + keyword + "%'", function (err, rows, fields) {
//         if (err) throw err
//         res.send(rows)
//     })
// })

// app.get('/songs', function (req, res) {
//     var keyword = req.query.sort

//     if (keyword == "album") {
//         if (connection == null) {
//             connection = mysql.createConnection({
//                 host: process.env.DB_HOST,
//                 user: process.env.DB_USER,
//                 password: process.env.DB_PASSWORD,
//                 database: process.env.DB_NAME
//             });
    
//             connection.connect()
//         }
    
//         connection.query("SELECT * FROM songs ORDER BY nama_album;", function (err, rows, fields) {
//             if (err) throw err
//             res.send(rows)
//         })
//     }

//     if (keyword == "-year") {
//         if (connection == null) {
//             connection = mysql.createConnection({
//                 host: process.env.DB_HOST,
//                 user: process.env.DB_USER,
//                 password: process.env.DB_PASSWORD,
//                 database: process.env.DB_NAME
//             });
    
//             connection.connect()
//         }
    
//         connection.query("SELECT * FROM songs ORDER BY tahun_rilis DESC;", function (err, rows, fields) {
//             if (err) throw err
//             res.send(rows)
//         })
//     }
// })

app.get('/songs', function (req, res) {
    var keywordPage = req.query.page
    var keywordLimit = req.query.limit

    var offset = (keywordPage - 1) * keywordLimit;

    if (connection == null) {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        connection.connect()
    }

    connection.query("SELECT * FROM songs LIMIT " + offset + "," + keywordLimit, function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.listen(3000, () => console.log('Server Run...'))