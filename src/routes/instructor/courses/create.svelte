<svelte:head>
    <title>Instructor: Create Course</title>
</svelte:head>

<script context="module">
    export async function load({params, fetch}) {
        return {}
    }
</script>

<script>
    import { 
        Container,
        Card,
        CardBody,
        Form,
        FormGroup,
        Input,
        Button,
        Label,
    } from "sveltestrap";
    import { createForm } from "svelte-forms-lib";
    import { goto } from '$app/navigation';
    import CustomNavbar from "../../../components/CustomNavbar.svelte";
    import { onMount } from "svelte";
    import { authStore } from "../../../stores/authStore";


    let isAuthenticated = false;
    let token = '';
    authStore.subscribe(value => {
        isAuthenticated = value.isAuthenticated;
        token = value.token;
    });

    if (!isAuthenticated) {
        goto("/instructor/courses");
    }

    let categories = [];
    onMount(async () => {
        await loadCategories();
    })

    const loadCategories = async () => {
        const response = await fetch("http://localhost:3000/api/v1/categories/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        
        if (response.status == 200) {
            const data = await response.json();
            console.log(data);
            categories = data.data;
        }
    }

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            name: "",
            excerpt: "",
            learn_summary: "",
            description: "",
            cover_image: "",
            category: "",
        },
        onSubmit: async (values) => {
            await handleCreateCourse(values);
        },
    });

    const handleCreateCourse = async (values) => {
        let formDataUpload = new FormData();
        formDataUpload.append('file', values.coverImage[0]);
        formDataUpload.append('path', 'images');
        formDataUpload.append('overwrite', 'false');

        const responseUpload = await fetch("http://localhost:3000/api/v1/upload/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formDataUpload,
        })

        if (responseUpload.status != 200) {
            return
        }
        
        const responseUploadData = await responseUpload.json()

        const response = await fetch("http://localhost:3000/api/v1/courses/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: values.name,
                excerpt: values.excerpt,
                learn_summary: values.learn_summary,
                description: values.description,
                cover_image: responseUploadData.data.file_url,
                categories: [parseInt(values.category)],
            }),
        });

        if (response.status == 201) {
            await goto("/instructor/courses");
        }
    };

</script>

<CustomNavbar />

<Container lg class="pt-5 center">
    <h5 class="pb-3">Create Course</h5>
    <Card>
        <CardBody>
            <Form on:submit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        on:change={handleChange}
                        bind:value={$form.name} 
                        placeholder="Enter name" />
                </FormGroup>

                <FormGroup>
                    <Label for="excerpt">Excerpt</Label>
                    <Input
                        id="excerpt" 
                        type="textarea"
                        on:change={handleChange}
                        bind:value={$form.excerpt}
                        placeholder="Enter excerpt" />
                </FormGroup>
              
                <FormGroup>
                    <Label for="learnSummary">Learn Summary</Label>
                    <Input
                        id="learnSummary"
                        type="textarea" 
                        on:change={handleChange}
                        bind:value={$form.learn_summary}
                        placeholder="Enter learn summary" />
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        id="description"
                        type="textarea" 
                        on:change={handleChange}
                        bind:value={$form.description}
                        placeholder="Enter description" />
                </FormGroup>
                
                <FormGroup>
                    <Label for="coverImage">Cover Image</Label>
                    <Input
                        id="coverImage"
                        type="file" 
                        on:change={handleChange}
                        bind:value={$form.cover_image}
                        placeholder="Choose image" />
                </FormGroup>
                
                <FormGroup>
                    <Label for="categories">Categories</Label>
                    <Input
                        id="categories"
                        type="select"
                        on:change={handleChange}
                        bind:value={$form.category}
                    >
                        <option value="0" selected>Choose Categories</option>
                        {#if categories !== undefined && categories.length > 0}    
                            {#each categories as category }
                                <option value={category.id}>{category.name}</option>
                            {/each}
                        {/if}
                    </Input>
                </FormGroup>

                <Button color="primary">Submit</Button>
              </Form>
        </CardBody>
    </Card>
</Container>