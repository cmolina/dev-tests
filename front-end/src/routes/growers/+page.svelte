<script lang="ts">
	import { onesta } from '$lib';

	const growers = onesta.GET('/v1/growers/');
</script>

<h1>Growers</h1>
{#await growers}
	<p>Loading…</p>
{:then response}
	<table>
		<caption>List of growers</caption>
		<thead>
			<tr>
				<th>Name</th>
				<th>Last name</th>
				<th>Email</th>
				<th>Farms</th>
			</tr>
		</thead>
		<tbody>
			{#each response.data!.growers! as grower}
				<tr>
					<td>{grower.name}</td>
					<td>{grower.lastName}</td>
					<td>{grower.email}</td>
					<td>
						<ul>
							{#each grower.farms as farm}
								<li>{farm.name}, {farm.address}</li>
							{/each}
						</ul>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:catch error}
	<p>{error}</p>
{/await}
