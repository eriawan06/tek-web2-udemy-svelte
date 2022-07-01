<svelte:head>
    <title>Instructor: Courses</title>
</svelte:head>

<script context="module">
    export async function load() {
        return {};
    }
</script>

<script>
import { Container, Row , Col, Card, CardBody, Button} from "sveltestrap";
import CustomNavbar from "../../../components/CustomNavbar.svelte";


</script>

<CustomNavbar />

<Container lg class="pt-5">
    <h5>My Courses</h5>

    <Row cols=1>
        <Col>
            <Card>
                <CardBody>
                    <Row cols=2>
                        <Col><p>Jump Into Course Creation</p></Col>
                        <Col>
                            <Button color="warning" href="/instructor/courses/create">Create Your Course</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>