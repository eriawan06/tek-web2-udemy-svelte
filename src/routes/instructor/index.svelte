<script>
    import { goto } from '$app/navigation'; 
    import { userRoleState } from "../../stores/userRoleState";

    userRoleState.set('instructor');
    goto('/instructor/courses');
</script>