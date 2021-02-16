const express = require('express')
const app = express()
const mongoose = require('mongoose')
const articlesRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const jwt = require("jsonwebtoken");
const users = require('./users.json')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(require('cookie-parser')())
app.use('/articles', articlesRouter);


app.get('/', (async (req, res) => {
    const articles = await Article.find({
        "isAccepted": true
    }).sort({
        "createdAt": 'desc'
    })
    res.render('index', {
        articles: articles
    })
}))
app.get('/login', async (req, res) => {
    if (req.cookies['session']) {
        const cookie = req.cookies['session']
        jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, {}, async (err, decoded) => {
            if (err) {
                res.clearCookie('session')
                res.render('login', {
                    isError: true
                })
            } else {
                if (isValidUsername(decoded.username)) {
                    const jsonwebtoken = jwt.sign({
                        username: decoded.username
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "1h"
                    })
                    res.cookie('session', jsonwebtoken, {
                        maxAge: 900000,
                        httpOnly: true,
                        sameSite: "strict",
                        secure: true
                    })
                    const articles = await Article.find().sort({
                        "createdAt": 'desc'
                    })
                    res.render('articles/verify', {
                        articles: articles
                    })
                } else {
                    res.clearCookie('session')
                    res.render('login', {
                        isError: true
                    })
                }
            }
        })
    } else {
        res.render('login', {
            isError: false
        })
    }
})

app.listen(80)


function isValidUsername(username) {
    isValid = false
    for (user in users) {
        if (user === username) {
            isValid = true
            break
        }
    }
    return isValid
}