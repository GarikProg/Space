<script>
	import { onMount } from 'svelte';

	let rockets = [];

	onMount(async () => {
		const res = await fetch(`https://launchlibrary.net/1.3/rocket/`);
    let resObj = await res.json();
    rockets = resObj.rockets;
    console.log(rockets.length);    
  });
    
</script>
<style>  
	.photos {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 8px;
	}

	figure, img {
		width: 100%;
		margin: 0;
	}
</style>

<h1>Rockets</h1>
<div class='space'>
<div class="photos">
  {#each rockets as rocket}
  {#if rocket.imageURL}
		<figure>
			<img src={rocket.imageURL} alt={rocket.name}>
      <figcaption>{rocket.name}</figcaption>
      <div> <a href="{rocket.wikiURL}">Wiki info</a> </div>
      {#if rocket.infoURLs}
      <div> <a href="{rocket.infoURLs}">Info</a> </div>
      {/if}
		</figure>
	{:else}
		<!-- этот блок отрисовывается, пока photos.length === 0 -->
    <p>загрузка...</p>
    {/if}
	{/each}
</div>
</div>
