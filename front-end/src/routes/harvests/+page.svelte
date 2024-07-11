<script lang="ts">
	import { onesta } from '$lib';

	const harvests = onesta.GET('/v1/harvests/');
</script>

<h1>Harvests</h1>
{#await harvests}
	<p>Loading…</p>
{:then response}
	<table>
		<caption>List of harvests</caption>
		<thead>
			<tr>
				<th>Grower</th>
				<th>Farm</th>
				<th>Client</th>
				<th>Commodity</th>
				<th>Variety</th>
				<th>Created at</th>
			</tr>
		</thead>
		<tbody>
			{#each response.data!.harvests! as harvest}
				<tr>
					<td>{harvest.grower.name}</td>
					<td>{harvest.farm.name}</td>
					<td>{harvest.client.name}</td>
					<td>{harvest.commodity.name}</td>
					<td>{harvest.variety.name}</td>
					<td>{new Date(harvest.createdAt).toLocaleString()}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:catch error}
	<p>{error}</p>
{/await}
