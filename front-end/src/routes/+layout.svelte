<header>
	<h1>
		<a href="/">Onesta</a>
	</h1>
	<a href="/commodities">Commodities</a>
	<a href="/harvests">Harvests</a>
	<a href="/growers">Growers</a>
	<a href="/clients">Clients</a>
</header>

<main>
	<slot />
</main>

<style>
	:global(*) {
		font-family: 'Hind Siliguri', sans-serif;
		font-weight: 400;
		font-style: normal;
		box-sizing: border-box;

		--primary: #034be5;
		--primary-dark-1: #0238ac;
		--primary-dark-2: #012a81;
	}

	:global(html, body) {
		height: 100%;
		margin: 0;
	}

	header {
		padding: 12px 24px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;

		h1 {
			flex: auto;
			margin: 0;

			a {
				border: none;
			}
		}
	}

	main {
		padding: 0 56px;
		background-color: #f9f9f9;
		overflow: auto;
		height: 100%;
	}

	:global(main h1) {
		font-weight: 700;
		border-bottom: 1px solid #e5e5e5;
		padding-bottom: 12px;
	}

	h1 {
		font-weight: 700;
		line-height: 48px;
	}

	a {
		font-weight: 700;
		text-decoration: none;
		border-bottom: 2px solid;
		color: var(--primary);
	}

	a:hover {
		color: var(--primary-dark-1);
	}

	a:active {
		color: var(--primary-dark-2);
	}

	:global(:is(a, button).button) {
		height: 40px;
		margin: 8px;
		border-radius: 9999px;
		color: white;
		padding: 0 24px;
		font-weight: 700;
		font-size: 16px;
		text-decoration: none;
		background-color: var(--primary);
		display: inline-block;
		align-content: center;
		border: none;
	}
</style>
