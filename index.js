const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controller.js')
const bodyParserErrorHandler = require('express-body-parser-error-handler')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8080

app.get('/', (req, res) => {
    res.status(200).send("Chua Wen Quan OTOT Task B")
})

app.use(bodyParserErrorHandler({
    onError: (err, req, res) => {
        res.status(400).send({status: "Error", message: "Invalid JSON format: " + err.message})
    }
}))

app.get('/menu', controller.getMenu)
   .get('/menu/:item_id', controller.getItemFromMenu)
   .post('/menu', controller.addItemToMenu)
   .put('/menu/:item_id', controller.updateItemInMenu)
   .delete('/menu/:item_id', controller.deleteItemFromMenu)
   .get('/*', controller.invalidPath)
   .post('/*', controller.invalidPath)
   .put('/*', controller.invalidPath)
   .delete('/*', controller.invalidPath)
   

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})