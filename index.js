// PACKAGE.JSON: start-Bereich: man gibt heroku dem Befehl, dass er die Index.js immer automatisch ausführen sollte, statt das man im Terminal  manuell eingibt
// Run the app with the following command: nodemon index.js aktualisiert die Seite automatisch immer, während node nur einmal die Seite aktualisiert und dann anzeigt
const express = require('express')
const app = express()
// wir haben mit const express und app die Express Methoden hinzugefügt
// const axios = require('axios'); um die API zu fetchen/abholen
const mongoose = require('mongoose')
//mongoose musst du so nennen 
//Du musst Mongoose erstmal implementieren, damit man das benutzen kann. es ist Cascading und sollte vor blog kommen
const blog = require("./models/blog.js")
// Schau links auf models und dann blog.js nach, wir haben mir unseren Schema ins index hinzugefügt. blog muss man nicht so nennen
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
// domain ist localhost


//es wird gerendert= anzeigen / die Seite wird dann angezeigt / bzw. es wird ein URL-Link generiert 
//=====================ROUTING===================================================
app.get('/', (req, res) => {
    // app.get sind Methoden
    // req, res muss immer so heißen Anfrage und Antwort
    blog.find()
        // results kann man nennen wie man mag
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
            res.render('pages/detail.ejs', { results: results, content: results[req.params.id] })
            //hier hab ich den content her
            // :id ist ein param = parameter
        })
        .catch(err => console.log(err))
})
app.get('/add', (req, res) => {
    blog.find()
        .then(results => {
            console.log(results)
            blog.find().count()
                .then(response => {
                    res.render('pages/add.ejs', { results, response })
                })
            // res.render('pages/add.ejs',{results})
        })
        .catch(err => console.log(err))

})
//=====================CRUD======================================================
// create read update delete = CRUD
// in unserem Fall nur create und read


app.post('/new', (req, res) => { //POST METHOD
    console.log(req.body)
    let newblog = new blog(req.body)
    newblog.save()
        .then(result => res.redirect(`/add`))
        .catch(err => console.log(err))
})
// EJS ist ein Framework von Node.js
