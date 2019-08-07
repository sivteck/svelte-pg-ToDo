<script>
  async function handleSubmit (e) {
    let name = document.getElementById('item-name').value
    let item = { name: name }
    let headers = { 'Content-Type': 'application/json' }
    let reqBody = { header: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(item) }
    console.log(reqBody)
    let res = await fetch('http://localhost:3000/insert', reqBody)
    let resJSON = await res.json()
    console.log(resJSON)
  }

</script>

<style>
</style>

<div class="itemV">
  <form id="ItemForm" on:submit|preventDefault={handleSubmit}>
    <div class="itemA">
      <input id="item-name" type="text" placeholder="Item Name">
    </div>
    <div class="itemA">
      <button type="submit" id="newItem">+</button>
    </div>
  </form>
</div>
