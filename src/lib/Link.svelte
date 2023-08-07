<script lang="ts">
  import { Link } from "svelte-routing"

  export let to :string;

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    return isActive ? { class: "active" } : {};
  }
</script>

<Link to={to} replace={false} getProps={getProps}>
  <slot />
</Link>
