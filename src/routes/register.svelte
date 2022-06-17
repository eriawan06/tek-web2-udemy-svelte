<svelte:head>
    <title>Register</title>
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

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        onSubmit: async (values) => {
            await handleRegister(values);
        },
    });

    const handleRegister = async (values) => {
        const response = await fetch("http://localhost:3000/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
                confirm_password: values.confirm_password,
                role: "user",
            }),
        });
        if (response.status == 200) {
            await goto("/login");
        }
    };
</script>

<CustomNavbar />
<Container fluid width="50%">
    <Card>
        <CardBody>
            <Form on:submit={handleSubmit}>
                <FormGroup floating label="name">
                  <Input 
                    on:change={handleChange}
                    bind:value={$form.name} 
                    placeholder="Enter name" />
                </FormGroup>

                <FormGroup floating label="email">
                  <Input 
                    on:change={handleChange}
                    bind:value={$form.email}
                    type="email" 
                    placeholder="Enter email" />
                </FormGroup>
              
                <FormGroup floating label="password">
                  <Input
                    on:change={handleChange}
                    bind:value={$form.password}
                    type="password" 
                    placeholder="Enter password" />
                </FormGroup>

                <FormGroup floating label="confirm password">
                  <Input
                    on:change={handleChange}
                    bind:value={$form.confirm_password}
                    type="password" 
                    placeholder="Enter confirm password" />
                </FormGroup>

                <Button color="primary">Register</Button>
              </Form>
        </CardBody>
    </Card>
</Container>