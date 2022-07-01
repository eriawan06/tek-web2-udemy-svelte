<svelte:head>
    <title>Home</title>
</svelte:head>

<script context="module">
    export async function load({params, fetch}) {
        let courses = [];
        const response = await fetch("http://localhost:3000/api/v1/courses/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })

        console.log(response);
        
        if (response.status == 200) {
            const data = await response.json();
            courses = data.data;
        }
        return {
            status: response.status,
            props: {
                courses
            }
        }
    }
</script>

<script>
    import { 
        Card,
        CardBody,
        CardHeader, 
        Col, 
        Container, 
        Row, 
        Image,
        CardSubtitle,
    } from "sveltestrap";
    import { goto } from '$app/navigation';
    import CustomNavbar from "../components/CustomNavbar.svelte";
    import { userRoleState } from "../stores/userRoleState";

    userRoleState.set('student');

    const handleCourseCardOnClick = async (id) => {
        console.log('clicked');
        await goto(`/courses/${id}`);
    }

    const getCourseImage = (image) => {
        if (image === undefined || image === null) {
            return import.meta.env.VITE_AWS_S3_OBJECT_URL + "/images/course.jpg"
        }

        return import.meta.env.VITE_AWS_S3_OBJECT_URL + image
    }

    export let courses;
</script>

<CustomNavbar />


<Container lg class="pt-5">
    <h5 class="pb-3">Recommended Courses</h5>
    
    <Row cols=4>
        {#each courses as course}
            <Col>
                <Card class="course-card" on:click={() => handleCourseCardOnClick(course.id)}>
                    <CardBody class="p-0">
                        <Image 
                            src={getCourseImage(course.cover_image)} 
                            alt="course-img"
                            class="course-card-img" />
                        <div class="py-3 px-2">
                            <CardSubtitle>{course.name}</CardSubtitle>
                            <p class="course-author">{course.author}</p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        {/each}
    </Row>
</Container>

<style>
    :global(.course-card):hover {
        cursor: pointer;
    }

    :global(.course-card-img) {
        width: 100%;
        height: 200;
    }

    .course-author {
        font-size: 12px;
        color: gray;
        margin: 0;
    }
</style>
