<script>
	import Rockets from './Rockets.svelte';
	import Missions from './Missions.svelte';
	import Pads from './Pads.svelte';

	const options = [
		{ color: 'Missions', component: Missions   },
		{ color: 'Rockets', component: Rockets },
		{ color: 'Pads',  component: Pads  },
	];

	let selected = options[0];
</script>

<select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option.color}</option>
	{/each}
</select>

{#if selected.color === 'Rockets'}
	<Rockets/>
{:else if selected.color === 'Missions'}
	<Missions/>
{:else if selected.color === 'Pads'}
	<Pads/>
{/if}
