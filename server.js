const express = require('express')
const app = express()
const mongoose = require('mongoose')
const articlesRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(require('cookie-parser')())
app.use('/articles', articlesRouter);


app.get('/', (async (req, res) => {
    const articles = await Article.find().sort({
        "createdAt": 'desc'
    })
    res.render('index', {
        articles: articles
    })
}))
app.get('/login', (req, res) => {
    res.render('login', {
        isError: false
    })
})


module.exports = app;