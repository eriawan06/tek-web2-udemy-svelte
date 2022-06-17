<svelte:head>
    <title>Home</title>
</svelte:head>

<script>
    import CustomNavbar from "../components/CustomNavbar.svelte";
    import { authStore } from "../stores/authStore";

    let isAuthenticated = false;
    let token = null;
    let user = null;
    authStore.subscribe(value => {
        isAuthenticated = value.isAuthenticated;
        token = value.token;
        user = value.user;
    });
</script>

<CustomNavbar />

{#if isAuthenticated}
    <h1>Logged In</h1>
    <p>Token : {token}</p><br>
    <p>Welcome, {user.name}</p>
{:else}
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{/if}
