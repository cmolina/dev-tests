<script lang="ts">
	import { onesta } from '$lib';

	const commodities = onesta.GET('/v1/commodities/');
</script>

<h1>Commodities</h1>
{#await commodities}
	<p>Loading…</p>
{:then response}
	<table>
		<caption>List of commodities</caption>
		<thead>
			<tr>
				<th>Name</th>
				<th>Varieties</th>
			</tr>
		</thead>
		<tbody>
			{#each response.data!.commodities! as commodity}
				<tr>
					<td>{commodity.name}</td>
					<td>{commodity.varieties.map(({ name }) => name).join(', ')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:catch error}
	<p>{error}</p>
{/await}
