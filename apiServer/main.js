const express = require('express')
const model = require('./model.js')

const deleteItem = model.deleteItem
const insertItem = model.insertItem
const fetchItems = model.fetchItems

const app = express()
const port = 3000
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
   if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    } next()
})


app.use(express.json())


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
  console.log(await req.body)
  console.log(itemId)
  console.log(req.method)
  let itemIdObj = { 'itemId': itemId }
  res.send(itemIdObj)
})

app.listen(port, () => console.log('listening on port 3000'))
