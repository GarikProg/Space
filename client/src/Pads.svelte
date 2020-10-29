<script>
	import { onMount } from 'svelte';

	let pads = [];

	onMount(async () => {
		const res = await fetch(`https://launchlibrary.net/1.3/pad`);
    let resObj = await res.json();
    pads = resObj.pads;
    console.log(pads.length);    
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

<h1>Pads</h1>

<div class="photos">
  {#each pads as pad}
  <h3>			
    <figcaption>{pad.name}</figcaption>       
    <a href="{pad.mapURL}">
      Google map
    </a>
  </h3>
  
	{:else}
  <!-- этот блок отрисовывается, пока photos.length === 0 -->
  <p>загрузка...</p>
  {/each}
  <script type="text/javascript" charset="utf-8" src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A053bd947d462cc1a45aeba4070defff75501905071c0eaf68436ac9976ec698c&amp;width=514&amp;height=326&amp;id=mymap&amp;lang=ru_RU&amp;apikey=21dcbca8-4727-4caf-a931-fe547562b8ba"></script>
  
</div>
