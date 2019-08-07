const { Client } = require('pg')

// async function queryEcho () {
//   await client.connect()
//   const res = await client.query('SELECT $1::text as message', ['Hellow world!'])
//   console.log(res.rows[0].message)
//   await client.end()
//   return res
// }

async function updateField(itemId, field, newValue) {
}

async function initDb () {
  const client = new Client()
  await client.connect()
  const res = await client.query(`
    CREATE TABLE IF NOT EXISTS items (
      itemId SERIAL PRIMARY KEY,
      name  VARCHAR,
      done VARCHAR,
      notes VARCHAR,
      priority VARCHAR,
      label VARCHAR
    );
    `)
  await client.end()
}

async function insertItem (item) {
  const client = new Client()
  await client.connect()
  const name = item.name || 'null'
  const done = item.done || 'false'
  const notes = item.notes || 'null'
  const priority = item.priority || 'Low'
  const label = item.label || 'null'
  const res = await client.query(`INSERT INTO items(name, done, notes, priority, label) VALUES($1, $2, $3, $4, $5) RETURNING itemId;`, [name, done, notes, priority, label])
  await client.end()
  return res.rows[0].itemid
}

async function fetchItems (itemId) {
  const client = new Client()
  await client.connect()
  const res = await client.query(`SELECT * FROM items`)
  await client.end()
  return res.rows
}

async function fetchDoneItems () {
  const client = new Client()
  await client.connect()
  const res = await client.query(`SELECT * FROM items where done = 'true'`)
  await client.end()
  return res.rows
}

async function deleteItem (itemId) {
  const client = new Client()
  await client.connect()
  const res = await client.query(`DELETE FROM items WHERE itemId = $1`, [itemId])
  await client.end()
}

const itemD = {
  name: 'item 1',
  done: 'true',
  notes: 'item 1 notes',
  priority: 'item 1 priority',
  label: 'item 1 label'
}

;(async function () {
  await initDb()
  await insertItem(itemD)
})()

exports.deleteItem = deleteItem
exports.insertItem = insertItem
exports.fetchItems = fetchItems

// queryEcho()
