<script>



  import { onMount } from "svelte"; 


  let missions = [];
  let filteredMissions = [];
  let inputMission;
  let outputMission;
  let error = '';
  

  onMount(async () => {
    try {
      const res = await fetch(`https://launchlibrary.net/1.3/mission/`);
      let resObj = await res.json();
      missions = resObj.missions;
      if(missions.length === 0) {
        error = 'This mission is not found'
      }
      filteredMissions = missions;      
    } catch (error) {
      error = error;
    }  
  });
  function filter(parametr, missions) {    
    return missions.filter((mission) => {      
      return mission.typeName === parametr;
    });    
  }
  async function search(inputMission) {
    console.log(inputMission);
    const res = await fetch(`https://launchlibrary.net/1.3/mission/${inputMission}`);
    let resObj = await res.json();
    if(resObj) {
      outputMission = resObj.missions;
    }
    
  }
  // async function outPut(mission) {
  //   $: outputMission = mission;
  // }


</script>

<style>
  
  .block {
    border: solid blue 0.1rem;
    border-radius: 10%;
    background-color: blue;
    opacity: 0.4;
    filter: alpha(Opacity=7);
    color: white;
  }
  .photos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;    
  }  
  .infoItem {
    margin: 1rem;
    font-size: 3rem;
  }
  .outputMission {
    
    width: 30%; 
    opacity: 0.7;   
    border-radius: 5%;
    color: rgb(white);
    background: linear-gradient(45deg, transparent 30%, blue 80%);
    font-size: 1.5rem;
    /* color:white;    */
  }
  .bigFont {
    font-size: 2.5rem;
    color:silver;
  }
  .button {
  position: relative;
  background-color: blue;
  border: none;
  font-size: 1.5rem;
  color: #FFFFFF;
  padding: 20px;
  width: 200px;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

.button:after {
  content: "";
  background: violet;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px!important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
  figure,
  img {
    width: 100%;
    margin: 0;
  }
</style>
<div class='space'>
  <div class="info">
  <h1 class="infoItem">Missions</h1>

  <div class="user-box">
    <input class placeholder="inputMission" bind:value={inputMission}>    
  </div>


  <div class="infoItem">You search: {inputMission ?? ''} </div>
  <div>
    <button class="button" on:click={() => search(inputMission)}>
      Search mission
    </button>  
  </div>
  <div>{error}</div>
  <div class="outputMission">
  {#if outputMission}
  <div><span class="bigFont">Mission name:</span> <span>{outputMission[0].name}</span> </div>
  <div> <span class="bigFont">Mission description:</span>   {outputMission[0].description}</div>
  {#if outputMission[0].wikiURLs}
  <div> <a class="bigFont" href="{outputMission[0].wikiURLs ?? ''}">Wiki link</a> </div>
  {/if}
  {#if outputMission[0].infoURLs}
  <div><a class="bigFont" href="{outputMission[0].infoURLs ?? ''}">Info link</a></div>  
  {/if}
  {/if}
</div>
</div>
<h2>Filters:</h2> 
<button class="button" on:click={() => filteredMissions = filter('Astrophysics', missions)}>Astrophysics</button>
<button class="button" on:click={() => filteredMissions = filter('Communications', missions)}>Communications</button>
<button class="button" on:click={() => filteredMissions = filter('Resupply', missions)}>Resupply</button>
<button class="button" on:click={() => filteredMissions = missions}>All</button>

<div class="photos">
  {#each filteredMissions as mission}
  <div on:click={() => search(mission.name)} class="block">
    <h3 >
      <div> {mission.name}</div>
      <div>{mission.typeName ?? ''}</div>
    </h3>
  </div>
  {:else}
    <!-- этот блок отрисовывается, пока photos.length === 0 -->
    <p>загрузка...</p>
  {/each}
</div>
</div>
