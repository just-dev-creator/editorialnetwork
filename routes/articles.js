const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const jwt = require('jsonwebtoken')
const users = require('../users.json')

module.exports = router
router.get("/new", ((req, res) => {
    res.render('articles/new', {article : new Article})
}))
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({
        slug: req.params.slug
    })
    if (article == null) res.redirect('/')
    res.render('articles/show', {
        article: article
    })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveAndRedirect('new'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
} )

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveAndRedirect('edit'))
router.post('/verify', async (req, res) => {
    if (req.cookies['session']) {
        cookie = req.cookies['session']
        jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET,{},async (err, decoded) => {
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
    }
    if (isValidUser(req.body.username, req.body.password)) {
        const jsonwebtoken = jwt.sign({
            username: req.body.username
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
        res.render('login', {
            isError: true
        })
    }
})
router.post('/verify/:id', async (req, res) => {
    let article = await Article.findById(req.params.id)
    article.isAccepted = true
    try {
        article = await article.save(function (err, article) {
            if (err) console.error(err)
        })
        console.log(article.isVerified)
        res.redirect("/articles/" + article.slug)
    } catch (e) {
        res.redirect("/")
    }
})

function saveAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render( `articles/${path}`, {
                article: article
            })
        }
    }
}
function isValidUser(username, password) {
    isValid = false
    for (user in users) {
        if (user === username && users[user] === password) {
            isValid = true
            break
        }
    }
    return isValid
}
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
