<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { account } from "../stores";
  
  let nameOrEmail = "";
  let password = "";
  let loginErrors: string[] = [];

  let showLogoutConfirmation = false;
  function toggleLogoutConfirmation() { showLogoutConfirmation = !showLogoutConfirmation; }

  async function handleLogin() {
    loginErrors = [];
    await account.login( nameOrEmail, password, errMap => { loginErrors = errMap; } );
  }
  async function handleLogout() { await account.logout(); }

</script>

{#if !$account}
  <form class="login-box" on:submit|preventDefault="{handleLogin}" method="post">
    <div>
      <label for="nameOrEmail">Name</label>
      <input name="nameOrEmail" type="text" bind:value="{nameOrEmail}" placeholder="or Email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input name="password" type="password" bind:value="{password}" />
    </div>
    <div>
      <button type="button" on:click|preventDefault="{()=>navigate("/account")}">Sign-Up…</button>
      <button class="bright" type="submit">Login</button>
    </div>
    {#each loginErrors as error}
      <label style="text-align:left;" for="errors">{error}</label>
    {/each}
  </form>
{:else}
  <div class="logout-box">
    <p>Hello {$account.name}!</p>
    {#if showLogoutConfirmation}
      <div class="logout-confirmation">
        Logout?
        <button class="logout-confirm-button" on:click={toggleLogoutConfirmation}>No</button>
        <button class="bright-red logout-confirm-button" on:click={handleLogout}>Yes</button>
      </div>
    {:else}
      <button class="logout-button" on:click={toggleLogoutConfirmation}>Logout</button>
    {/if}
  </div>
{/if}

<style>
.login-box {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 400px;
  padding: 4px;
  gap: 4px;
}

.login-box > div {
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: space-between;
  gap: 4px
}

.login-box label,
.login-box label {
  flex-grow: 1;
  text-align: right;
  font-size: smaller;
}

.login-box input[type="text"],
.login-box input[type="password"] {
  width: 12em;
}


.logout-box {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 4px;
  gap: 4px;
}
.logout-box p {
  margin: 4px;
}

.logout-confirmation {
  display: flex;
  align-self: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 1;
  gap: 4px;
  justify-content: flex-end;
  align-items: center;
  margin: 0px;
}

.logout-confirm-button:first-of-type {
  /* padding-left: 0.7em; */
  padding-right: 0.9em;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.logout-confirm-button:last-of-type {
  padding-left: 0.9em;
  /* padding-right: 0.7em; */
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

</style>