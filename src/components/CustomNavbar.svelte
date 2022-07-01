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
    import { authStore } from "../stores/authStore";
    import { userRoleState } from "../stores/userRoleState";
    import { goto } from '$app/navigation';

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    let isAuthenticated = false;
    authStore.subscribe(value => {
        isAuthenticated = value.isAuthenticated;
    });
    let userRole = 'student';
    userRoleState.subscribe(value => {
        userRole = value;
    });
    console.log(userRole);

    const handleLogout = async () => {
        authStore.set({
            isAuthenticated: false,
            token: null,
            user: null,
        });
        await goto("/");
    }

</script>

<Navbar light expand="md" class="my-navbar">
    <NavbarBrand href={userRole == 'student' ? '/' : '/instructor'}>CoursePedia</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            {#if isAuthenticated}
                {#if userRole == 'student'}
                    <NavItem>
                        <NavLink href="/instructor">Instructor</NavLink>
                    </NavItem>
                {:else if userRole == 'instructor'}
                    <NavItem>
                        <NavLink href="/">Student</NavLink>
                    </NavItem>
                {/if}
                
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

<style>
    :global(.my-navbar) {
        box-shadow: 0 1.5px 6px -4px gray;
    }
</style>