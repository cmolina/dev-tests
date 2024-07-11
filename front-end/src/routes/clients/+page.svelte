<script lang="ts">
	import { onesta } from '$lib';

	const clients = onesta.GET('/v1/clients/');
</script>

<h1>Clients</h1>
{#await clients}
	<p>Loading…</p>
{:then response}
	<table>
		<caption>List of clients</caption>
		<thead>
			<tr>
				<th>Name</th>
				<th>Last name</th>
				<th>Email</th>
			</tr>
		</thead>
		<tbody>
			{#each response.data!.clients! as client}
				<tr>
					<td>{client.name}</td>
					<td>{client.lastName}</td>
					<td>{client.email}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:catch error}
	<p>{error}</p>
{/await}
