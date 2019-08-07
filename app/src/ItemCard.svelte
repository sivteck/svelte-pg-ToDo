<script>
  export let itemId;
  async function deleteItem(e) {
    let deleteItemId = e.target.getAttribute('itemid')
    let res = await fetch('http://localhost:3000/delete/' + deleteItemId)
    if (res.status === 200) {
      document.getElementById(deleteItemId).remove()
    }
  }
</script>

<style>
    .itemHead {
        display: inline-block;
    }
/*    .collapsible-extras {
        display: none;
    }
*/
    .notes {
    
    }
    div.itemC {
        padding: 20px;
        margin: 10px;
        border: 2px solid red;
        border-radius: 20px;
    }
    div.itemC:hover {
        background-color: yellow;
    }
</style>

<div class="itemC" id={itemId}>
  <slot name="itemId"> </slot>
  <div class="itemHead">
    <input class="status" type="checkbox">
  </div>
  <div class="itemHead">
    <h2 class="itemNameHeader" >
    <slot name="itemName">
      itemName
    </slot>
    </h2>
  </div>
  <br>
  <div class="collapsible-extras">
    <div class="itemNotes">
      <div class="notes"> <p class="item-notes"> 
      <slot name="itemNotes">
      itemNotes
      </slot>
      </p> </div>
    </div>
    <p> Priority: <slot name="itemPriority">itemPriority</slot> </p>
    <p> Label: <slot name="itemLabel">itemLabel</slot> </p>
    <button type="button" itemid={itemId} on:click={deleteItem}> Delete Item</button>
  </div>
</div>
