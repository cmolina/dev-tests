<script lang="ts">
	import './form.css';

	import { enhance } from '$app/forms';
	import { type Commodity, type Grower } from '$lib';
	import type { ActionData, PageData } from './$types';

	const { form, data }: { form: ActionData; data: PageData } = $props();
	const { growers, clients, commodities } = data;

	let selectedGrower = $state(undefined as Grower | undefined);
	let selectedCommodity = $state(undefined as Commodity | undefined);
</script>

<h1>New harvest</h1>
<form method="post" use:enhance>
	<div class="columns-2">
		<label>
			Grower
			<input type="hidden" name="growerId" value={selectedGrower?.id} />
			<select bind:value={selectedGrower} required>
				<option value={undefined} disabled>Select grower</option>
				{#each growers as grower}
					<option value={grower}>{grower.name}</option>
				{/each}
			</select>
			{#if form && 'growerId' in form}
				<p class="error">{form.growerId?._errors}</p>
			{/if}
		</label>
		<label>
			Farm
			<select name="farmId" required disabled={!selectedGrower}>
				<option selected disabled>Select farm</option>
				{#if selectedGrower}
					{#each selectedGrower.farms as farm}
						<option value={farm.id}>{farm.name}</option>
					{/each}
				{/if}
			</select>
			{#if form && 'farmId' in form}
				<p class="error">{form.farmId?._errors}</p>
			{/if}
		</label>
		<label>
			Client
			<select name="clientId" required>
				<option selected disabled>Select client</option>
				{#each clients as client}
					<option value={client.id}>{client.name}</option>
				{/each}
			</select>
			{#if form && 'clientId' in form}
				<p class="error">{form.clientId?._errors}</p>
			{/if}
		</label>
		<label>
			Commodity
			<input type="hidden" name="commodityId" value={selectedCommodity?.id} />
			<select bind:value={selectedCommodity} required>
				<option value={undefined} disabled>Select commodity</option>
				{#each commodities as commodity}
					<option value={commodity}>{commodity.name}</option>
				{/each}
			</select>
			{#if form && 'commodityId' in form}
				<p class="error">{form.commodityId?._errors}</p>
			{/if}
		</label>
		<label>
			Variety
			<select name="varietyId" required disabled={!selectedCommodity}>
				<option selected disabled>Select variety</option>
				{#if selectedCommodity}
					{#each selectedCommodity.varieties as variety}
						<option value={variety.id}>{variety.name}</option>
					{/each}
				{/if}
			</select>
			{#if form && 'varietyId' in form}
				<p class="error">{form.varietyId?._errors}</p>
			{/if}
		</label>
	</div>

	<button class="button" type="submit" style="float: right">Create new harvest</button>
</form>

{#if form && 'message' in form}
	<output>There was an error processing your request: {form.message}</output>
{/if}
