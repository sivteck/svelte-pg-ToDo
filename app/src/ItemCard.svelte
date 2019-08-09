<script>
  export let itemid = 0;
  export let name = "default name";
  export let notes = "default notes";
  export let done = "default done";
  export let label = "default label";
  export let priority = "default property";

  let toggleNoteEdit = false
  let toggleNameEdit = false

  async function deleteItem(e) {
    let deleteItemId = e.target.getAttribute('itemid')
    console.log('deeeeeleeeteITEM')
    let res = await fetch('http://localhost:3000/delete/' + deleteItemId)
    if (res.status === 200) {
      document.getElementById(deleteItemId).remove()
    }
  }
  
  function toggleNoteEditFun (e) {
      toggleNoteEdit = !toggleNoteEdit
  }

  function toggleNameEditFun (e) {
      toggleNameEdit = !toggleNameEdit
  }

  async function updateNotes (e) {
    console.log(e)
    if (e.keyCode === 13) {
      notes = e.target.value
      console.log(itemid)
      toggleNoteEdit = !toggleNoteEdit
      let reqBody =  { itemid: itemid, fieldName: 'notes', updatedValue: notes }
      let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      let req = { headers: headers, method: 'POST', body: JSON.stringify(reqBody) }
      console.log(reqBody)
      let res = await fetch('http://localhost:3000/update', req)
    }
  }

</script> 
<style>
    label.lToggle::after {
        font-size: 15px;
        content: '+ Notes';
    }

    .itemC {
        width: 500px;
        border-bottom: 2px solid gray;
        border-right: 2px solid gray;
        border-top: 1px solid gray;
        border-left: 1px solid gray;
        border-radius: 10px;
    }

    .grid-item {
        display: inline;
    }

    .itemNameHeader {
        font: helvetica;
        font-size: 30px;
        color: #34302F;
    }

    .itemHead {
        text-align: left;
    }

    /* input.statusCheckBox {
        display: none;
    } */

    .statusCheckBoxLabel::before {
        font-size: 25px;
        content: '✓';
        color: transparent;
        height: 20px;
        width: 20px;
        border: 2px solid gray;
        border-left: 1px solid gray;
        border-top: 1px solid gray;
        border-radius: 5px;
        padding: 0px;
        margin: 7px;
        color: #e0d8d7;
    }

    .statusCheckBox:checked ~ .statusCheckBoxLabel::before {
        content: '✓';
        color: green;
    }

   .nameEditButton {
        color: teal;
        float: right;
   }

   .deleteItemButton {
        text-align: right;
        color: red;
        float: right;
    }

    .status {
        border: 3px solid red;
        height: 20px;
        width: 20px;
        text-decoration: line-through;
    }

    .item-notes::after {
        content: '✎ ';
    }

    input.toggle {
        /* display: none; */
    }

    .expand {
        height: 0px;
        overflow: auto;
    }

    div.itemC {
        min-width: 300px;
        margin: 10px;
    }

    div.itemC:hover {
    }

    label {
        color: #666;
        font-size: 30px;
    }

    label:hover {
        color: #000;
    }

    .toggle:checked ~ .expand {
      height: auto;
    }

    .lToggle {
    }

    .toggle:checked ~ .lToggle::after {
        content: '- Notes';
    }

    button {
        width: 40px;
        height: 46px;
        background-color: transparent;
        border: 0px solid gray;
        font-size: 20px;
        color: gray;
    }

    input {
        min-width: 300px;
        min-height: 40px;
        font-size: 25px;
        color: #34302F;
        border: 2px solid gray;
        border-right: 0px;
        border-left: 0px;
        border-top: 0px;
    }

    textarea {
        min-width: 300px;
        min-height: 40px;
        font-size: 20px;
        border: 2px solid gray;
        border-right: 0px;
        border-left: 0px;
        border-top: 0px;
    }
</style>

<div class="itemC" id="{itemid}">
  <div class="itemHead">
    <input class="status grid-item statusCheckBox" type="checkbox" done="{done}">
    <label class="statusCheckBoxLabel" for="statusCheckBox"></label>
    <div class="name grid-item">
      <p class="itemNameHeader grid-item" >{name} </p>
    </div>
    <button itemid="{itemid}" class="grid-item deleteItemButton" type="button" on:click={deleteItem}>X</button>
    <button on:click={toggleNameEditFun} class="grid-item nameEditButton" type="submit">✎</button>
  </div>
  <input class="toggle" type="checkbox">
  <label class="lToggle" for="toggle">  </label>
  <div class="expand">
    <div class="itemNotes">
      <div on:click={toggleNoteEditFun} itemid="{itemid}" class="notes" > 
      {#if !toggleNoteEdit}
      <p  class="item-notes"> {notes} </p>
      {/if}
      {#if toggleNoteEdit}
      <textarea autofocus on:keyup={updateNotes} type="text" id="editNotes">{notes}</textarea>
      {/if}
      </div>
    </div>
  </div>
</div>
