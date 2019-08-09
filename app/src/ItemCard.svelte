<script>
  export let itemid = 0;
  export let name = "default name";
  export let notes = "default notes";
  export let done = "default done";
  export let label = "default label";
  export let priority = "default property";

  async function deleteItem(e) {
    let deleteItemId = e.target.getAttribute('itemid')
    let res = await fetch('http://localhost:3000/delete/' + deleteItemId)
    if (res.status === 200) {
      document.getElementById(deleteItemId).remove()
    }
  }
</script>

<style>
    label#lToggle::after {
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

    input#statusCheckBox {
        display: none;
    }

    #statusCheckBoxLabel::before {
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

    #statusCheckBox:checked ~ #statusCheckBoxLabel::before {
        content: '✓';
        color: green;
    }

   #nameEditButton {
        color: teal;
        float: right;
   }

   #deleteItemButton {
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

    input#toggle {
        display: none;
    }

    #expand {
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

    #toggle:checked ~ #expand {
      height: auto;
    }

    #lToggle {
    }

    #toggle:checked ~ #lToggle::after {
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
    <div class="grid-item">
    </div>
    <input id="statusCheckBox" class="status grid-item" type="checkbox" done="{done}">
    <label id="statusCheckBoxLabel" for="statusCheckBox"></label>
    <div class="name grid-item">
      <p class="itemNameHeader grid-item" >{name} </p>
    </div>
    <button class="grid-item" type="button" id="deleteItemButton">X</button>
    <button id="nameEditButton" class="grid-item" type="submit">✎</button>
  </div>
  <input id="toggle" type="checkbox">
  <label id="lToggle" for="toggle">  </label>
  <div id="expand">
    <div class="itemNotes">
      <div class="notes"> <p class="item-notes"> {notes} </p> </div>
    </div>
  </div>
</div>
