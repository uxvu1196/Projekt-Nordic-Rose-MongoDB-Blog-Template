const mongoose = require('mongoose');
// durch mongoose weiß es, dass es auf der Datenbank ist das Schmea, schau bei Atlas MongoDB nach
const Schema = mongoose.Schema;
//const {Schema}=mongoose

const blogSchema = new Schema({
    // Diese id wird von Mogno automatisch selber beim Collection in Datebase Deployment vergeben, sie ist unique 
    _id: {
        type: Number,
        required: true,
    },
    // Da kann man eine ID vergeben
    id: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    published_at: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    author_bild: {
        type: String,
        required: true,
    }

    //required:true heißt dass der Feld unbedingt eine Eingabe erfordert und nicht leer bleiben kann wie bei false 

}, { timestamps: true })
//Um zu kontrollieren wann es der Datenbank hinzugefügt worden ist oder geupdatet worden ist. 

// Model based on the Schema
//=> pluralize : GalleryDb => GalleryDbs
const blog = mongoose.model('nordicRoseDB', blogSchema)

//Bei nordicRoseDB kann man einfach ein Namen vergeben und da wird automatisch ein Ordner in dem Collections erstellt

module.exports = blog
//man exportieret die Datei