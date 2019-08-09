<script>
  import { onMount } from 'svelte';
  import ItemAdd from './ItemAdd.svelte';
  import ItemCard from './ItemCard.svelte';
  let data = [];

  function addNewItem(event) {
      console.log(event.detail)
      data = [event.detail, ...data]
      console.log(data)
      const itemCard = new ItemCard({
	      target: document.body,
	      props: event.detail
      })
  }

  onMount(async function getItems() {
    let res = await fetch('http://localhost:3000/items', { mode: 'cors' })
    data = await res.json();
    data = data.sort(function (i1, i2) {
      if ((i1.itemid * 1) < (i2.itemid * 1)) return 1
      return -1
    })
  })
</script>

<ItemAdd on:message={addNewItem}/>
{#each data as item}
<ItemCard {...item}/>
{/each}
