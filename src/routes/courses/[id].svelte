<svelte:head>
    <title>Detail Course</title>
</svelte:head>

<script context="module">
    export async function load({params, fetch}) {
        console.log(params.id)
        return {
            props : {
                id : params.id,
            }
        }
    }
</script>

<script>
import { Container, Row, Col } from "sveltestrap";
import CustomNavbar from "../../components/CustomNavbar.svelte";

</script>

<CustomNavbar />

<div class="top-section">
    <Container lg class="pt-4">
        <Row cols=2>
            <Col>
                <h6 class="orange-text">Software Development</h6>
                <h2 class="white-text">Svelte: The Complete Guide</h2>
                <p class="white-text">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </Col>
        </Row>
    </Container>
</div>

<style>
    .top-section {
        background-color: #1C1D1F;
        height: 300px;
    }
    .white-text {
        color: white;
    }
    .orange-text {
        color: orange;
    }
</style>