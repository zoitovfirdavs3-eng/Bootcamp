const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
const {ClientError, ServerError, globalError} = require("shokhijakhon-error-handler")

const app = express();
const PORT = 4000;

const filePath = (filename) => path.join(process.cwd(), "db", filename);

app.use(express.json());
app.use(cors());


const readData = (filename) => {
    try {
        const data = fs.readFileSync(filePath(filename), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; 
    }
};

const writeData = (filename, data) => {
    fs.writeFileSync(filePath(filename), JSON.stringify(data, null, 2), 'utf8');
};

app.post("/api/auth/register", (req, res) => {
    let newUser = req.body;
    
    const users = readData("users.json");
    const findUser = users.find((user) => user.email == user.email);
    if(findUser){
        return res.status(404).json({message: "User already exists !"})
    }
    newUser = {
        id: users.length ? users.at(-1).id+1: 1,
        ...newUser
    };
    users.push(newUser)
    writeData("users.json", users);
    const accessToken = jwt.sign({user_id: newUser.id}, "jwtSecret");
    return res.json({message: "User successfully registered !", status: 201, accessToken});
});

app.post("/api/auth/login", (req, res) => {
    const user = req.body;

    const users = readData("users.json");

    const findUser = users.find((user) => user.email == user.email);
    if(!findUser){
        return res.status(404).json({message: "User not found !"})
    }
        if(findUser.password != user.password){
            return res.status(404).json({message: "User not found !"})
        }
        const accessToken = jwt.sign({user_id: user.id}, "jwtSecret");
        return res.json({messsage: "User successfully logged in !", status: 200, accessToken})
});

app.use((req, res, next) => {
    try{
        const auth = req.headers.authorization;
        if(!auth) throw new ClientError('Unauthorized', 401);
        const [authType, token] = auth.split(" ")
        if(authType != 'Bearer' || !token) throw new ClientError('Unauthorized', 401);
        const parseToken = jwt.verify(token, "jwtSecret");
        req.user = parseToken

        return next()
    }catch(err){
        return globalError(err, res);
    }
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} portida ishlamoqda...`);
});