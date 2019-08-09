<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  async function handleSubmit (e) {
    let name = document.getElementById('item-name').value
    let item = { name: name }
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(item) }
    console.log(reqBody)
    let res = await fetch('http://localhost:3000/insert', reqBody)
    let resJSON = await res.json()
    item = Object.assign({ label: 'null', priority: 'Low', notes: 'null' }, item)
    dispatch('message', Object.assign(resJSON, item))
  }
</script>

<style>
    .itemA {
        display: inline-block;
    }

    div.itemA {
        padding-top: 30px;
        max-width: 500px;
        /* border: 2px solid gray;
        border-radius: 20px; */
    }

    input {
        min-width: 500px;
        min-height: 40px;
        font-size: 20px;
        border-width: thin;
        border-left: 5px solid gray;
        border-right: 2px solid gray;
        border-bottom: 2px solid gray;
        border-radius: 5px;
        margin-left: -5px;
    }
</style>

<div class="itemV">
  <form id="ItemForm" on:submit|preventDefault={handleSubmit}>
    <div class="itemA">
      <input id="item-name" type="text" placeholder="Item Name">
    </div>
  </form>
</div>
