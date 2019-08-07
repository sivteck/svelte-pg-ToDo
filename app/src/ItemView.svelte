<script>
  import { onMount } from 'svelte';
  import ItemAdd from './ItemAdd.svelte';
  import ItemCard from './ItemCard.svelte';
  let data = [];
  onMount(async function getItems() {
    let res = await fetch('http://localhost:3000/items', { mode: 'cors' })
    data = await res.json();
  })
  let meme = 10;
</script>

<ItemAdd />
{#each data as item}
<ItemCard itemId={item.itemid}>
<span slot="itemName"> {item.name} </span>
<span slot="itemNotes"> {item.notes} </span>
<span slot="itemPriority"> {item.prirority} </span>
<span slot="itemLabel"> {item.label} </span>
</ItemCard>
{/each}
