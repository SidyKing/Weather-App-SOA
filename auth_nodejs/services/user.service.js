const db = require("./../models");
const User = db.user;
const jwt = require('../providers/jwt')
const bcrypt = require("bcrypt");
const http = require('http');
module.exports = {

    async login(req, res) {
        User.findOne({
            where: {
                login: req.body.login
            }
        })
            .then(async user => {
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                var passwordIsValid = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        token: null,
                        message: "Invalid Password!"
                    });
                }
                User.findOne({ where: { id: user.id } })
                    .then(user => {
                        const payload = { id: user.id, login: user.login }
                        const result = jwt.sign(payload);
                        return res.send(result);
                    })
                    .catch(error => {
                        res.status(500).json(error)
                    });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    },
    async register(req, res) {
        const saltRounds = 10;
        const { password, login } = req.body;
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        User.create({
            login: login,
            password: hashedPwd,
        })
            .then(User => {
                res.status(201).json(User);
            })
            .catch(error => {
                res.status(500).json(error)
            });
    },
    async modifPassword(req, res) {
        const idUser = req.params.id;
        const saltRounds = 10;
        const datas = {
            password: await bcrypt.hash(req.body.password, saltRounds)
        }
        User.update(datas, { where: { id: idUser } })
            .then(User => {
                res.status(201).json(User);
            })
            .catch(error => {
                res.status(500).json(error)
            });
    },

    getAllUser(req, res) {
        User.findAll({
            include: [{
                all: true, nested: true
            }]
        })
            .then(User => {
                res.status(200).json(User)
            })
            .catch(error => {
                res.status(500).json(error)
            });
    },

    getUserById(req, res) {
        const idUser = req.params.id;
        User.findOne({
            include: [{
                all: true, nested: true
            }],
            where: { id: idUser }
        })
            .then(User => {
                res.status(200).json(User)
            })
            .catch(error => {
                res.status(500).json(error)
            });
    },

    deleteUser(req, res) {
        const idUser = req.params.id;
        User.destroy({ where: { id: idUser } })
            .then(() => {
                res.status(200).json({ status: 'success', message: 'User supprimé' })
            })
            .catch(err => { res.status(500).json({ status: 'error', message: JSON.stringify(err) }) });

    },
    getMeteoByRegion(req, rest) {
        const region = req.body.region;
        //data to send in JSON format
        const data = JSON.stringify({
            region: region
        });
        //url, method type, headers like content-type and data to send
        const options = {
            host: "localhost",
            port: 8083,
            path: "/api/meteo/region",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length,
            },
        };
        req = http.request(options, (res) => {
            //status code of the request sent
            console.log("statusCode: ", res.statusCode);
            let result = "";
            // A chunk of data has been recieved. Append it with the previously retrieved chunk of data
            res.on("data", (chunk) => {
                result += chunk;
            });
            //The whole response has been received. Display it into the console.
            res.on("end", () => {
                rest.status(200).json(JSON.parse(result));
            });
        });
        //error if any problem with the request
        req.on("error", (err) => {
            console.log("Error: " + err.message);
        });
        //write data to request body
        req.write(data);
        //to signify the end of the request - even if there is no data being written to the request body.
        req.end();
    },
    getMeteo(req, res) {

        const url = 'http://localhost:8083/api/meteo';
        http.get(url, (resp) => {
            let data = "";
            // A chunk of data has been recieved. Append it with the previously retrieved chunk of data
            resp.on("data", (chunk) => {
                data += chunk;
            });
            // when the whole response is received, parse the result and Print it in the console
            resp.on("end", () => {
                res.status(200).json(JSON.parse(data));
            });
        })
            .on("error", (err) => {
                console.log("Error: " + err.message);

            });
    },
    getMeteoByDate(req, rest) {
        const date = req.body.date;
        //data to send in JSON format
        const data = JSON.stringify({
            date: date
        });
        //url, method type, headers like content-type and data to send
        const options = {
            host: "localhost",
            port: 8083,
            path: "/api/meteo/date",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length,
            },
        };
        req = http.request(options, (res) => {
            //status code of the request sent
            console.log("statusCode: ", res.statusCode);
            let result = "";
            // A chunk of data has been recieved. Append it with the previously retrieved chunk of data
            res.on("data", (chunk) => {
                result += chunk;
            });
            //The whole response has been received. Display it into the console.
            res.on("end", () => {
                rest.status(200).json(JSON.parse(result));
            });
        });
        //error if any problem with the request
        req.on("error", (err) => {
            console.log("Error: " + err.message);
        });
        //write data to request body
        req.write(data);
        //to signify the end of the request - even if there is no data being written to the request body.
        req.end();
    },
}