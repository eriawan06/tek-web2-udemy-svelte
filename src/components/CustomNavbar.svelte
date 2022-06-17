<script>
    import {
        Styles,
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem
    } from 'sveltestrap';
    import { page } from '$app/stores';
    import { authStore } from "../stores/authStore";
    import { goto } from '$app/navigation';

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    let isAuthenticated = false;
    authStore.subscribe(value => {
        isAuthenticated = value.isAuthenticated;
    });

    const handleLogout = async () => {
        authStore.set({
            isAuthenticated: false,
            token: null,
            user: null,
        });
        await goto("/");
    }
</script>

<Navbar color="warning" light expand="md">
    <NavbarBrand href="/">CoursePedia</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            {#if isAuthenticated}
                <NavItem>
                    <NavLink href="#" on:click={handleLogout}>Logout</NavLink>
                </NavItem>
            {:else}
                <NavItem>
                    <NavLink href="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/register">Register</NavLink>
                </NavItem>
            {/if}
        </Nav>
    </Collapse>
</Navbar>