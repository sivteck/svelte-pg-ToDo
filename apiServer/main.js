const express = require('express')
const model = require('./model.js')

const deleteItem = model.deleteItem
const insertItem = model.insertItem
const fetchItems = model.fetchItems
const updateField = model.updateField

const app = express()
const port = 3000

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    next()
})


app.get('/', (req, res) => res.send('hello world'))

app.get('/items', async function (req, res) {
  let items = await fetchItems()
  res.send(items)
})

app.get('/delete/:id', async function (req, res) {
  const id = req.params.id * 1
  await deleteItem(id)
  res.send(`deleted item ${id}`)
})

app.post('/insert', async function (req, res) {
  let itemId = await insertItem(req.body)
  console.log('hittting /insert')
  console.log(itemId)
  console.log(req.method)
  let itemIdObj = { 'itemid': itemId }
  res.send(itemIdObj)
})

app.post('/update', async function (req, res) {
  console.log(req.body)
  let itemId = req.body.itemid
  let fieldName = req.body.fieldName
  let updatedValue = req.body.updatedValue
  let succ = await updateField(itemId, fieldName, updatedValue)
  return succ
})

app.listen(port, () => console.log('listening on port 3000'))
