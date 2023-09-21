<script lang="ts">
    import { link } from "svelte-routing";

    export let location: string = "";
</script>

<div class="page">
    <h1>Page Not Found</h1>
    <a href="/" class="button-outlined" use:link>Return To Homepage</a>
</div>