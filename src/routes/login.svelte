<svelte:head>
    <title>Login</title>
</svelte:head>

<script>
    import CustomNavbar from "../components/CustomNavbar.svelte";
    import { 
        Card, 
        CardBody,
        Col, 
        Container, 
        Row, 
        Form, 
        FormGroup, 
        Input, 
        Button,
    } from 'sveltestrap';
    import { createForm } from "svelte-forms-lib";
    import { goto } from '$app/navigation';
    import { authStore } from "../stores/authStore";

    authStore.subscribe(async ({ isAuthenticated }) => {
        if (isAuthenticated) {
            await goto("/");
        }
    });

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            await handleLogin(values);
        },
    });

    const handleLogin = async (values) => {
        const body = {email: values.email, password: values.password};
        const response = await fetch("http://localhost:3000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (response.status == 200) {
            const data = await response.json()
            authStore.set({
                isAuthenticated: true,
                token: data.data.token,
                user: data.data.user,
            })
            await goto("/");
        }
    };
</script>

<CustomNavbar />
<Container fluid width="50%">
    <Card>
        <CardBody>
            <Form on:submit={handleSubmit}>
                <FormGroup floating label="email">
                  <Input 
                    on:change={handleChange}
                    bind:value={$form.email} 
                    placeholder="Enter email" />
                </FormGroup>
              
                <FormGroup floating label="password">
                  <Input
                    on:change={handleChange}
                    bind:value={$form.password}
                    type="password" 
                    placeholder="Enter password" />
                </FormGroup>

                <Button color="primary">Login</Button>
              </Form>
        </CardBody>
    </Card>
</Container>