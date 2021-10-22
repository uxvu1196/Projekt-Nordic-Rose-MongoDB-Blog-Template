// PACKAGE.JSON: start-Bereich: man gibt heroku dem Befehl, dass er die Index.js immer automatisch ausführen sollte, statt das man im Terminal  manuell eingibt

const express = require('express')
const app = express()
// const axios = require('axios'); um die API zu fetchen/abholen
const mongoose = require('mongoose')
//Du musst Mongoose erstmal implementieren, damit man das benutzen. es ist Cascading und sollte vor blog kommen
const blog = require("./models/blog.js")
require('dotenv').config()
// const dbUri = `${process.env.MONGODB}` Befehl die Datenbank sollte benutzt werden
const dbUri = `mongodb+srv://m001-student:${process.env.MONGODB_PW}@sandbox.lvxjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//==================MIDDLEWARES=====================
//Das sind Methoden die wir Express hinzufügen, Methoden sind Funktionen die man von den Ordnern mit den ganzen Codes/function hier ins index.js importiert um sie dannzu benutzen 
app.use(express.static('public'))
// das ist dafür da dann man bein index.ejs nicht extra link public/assets klicken musst, sondern direkt assets/... schreiben kannst. Das ist ein Router
app.set('view engine', 'ejs')
// dass wir den view ordner benutzen und das wir ejs benutzen, ohne dem Funktioniert die Seite nicht, 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//alles was du in express schreibst wird in json umgewandelt

const port = process.env.PORT || 3050
//3000 bis 18.000
// ||oder  

//=====================BROWSE THE SERVER WITH MONGOOSE===========================

mongoose.connect(dbUri, () => {
    console.log('Database is connected')
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`)
    })
})

//es wird gerendert / die Seite wird dann angezeigt / bzw. URL-Link
//=====================ROUTING===================================================
app.get('/', (req, res) => {
    blog.find()
        .then(results => {
            console.log(results)
            res.render('pages/index.ejs', { results })
        })
        .catch(err => console.log(err))
})
app.get('/detail/:id', (req, res) => {
    blog.find()
        .then(results => {
            console.log(results)
            res.render('pages/detail.ejs', { results })
        })
        .catch(err => console.log(err))
})
app.get('/add', (req, res) => {
    blog.find()
        .then(results => {
            console.log(results)
            res.render('pages/add.ejs', { results })
        })
        .catch(err => console.log(err))

})

//=====================CRUD======================================================
app.post('/new', (req, res) => { //POST METHOD
    console.log(req.body)
    let newblog = new blog(req.body)
    newblog.save()
        .then(result => res.redirect(`/add`))
        .catch(err => console.log(err))
})
