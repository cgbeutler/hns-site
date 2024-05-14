<script lang="ts">
    import { get } from "svelte/store";
    import { account } from "../../lib/stores";
    import { link } from "svelte-routing";

    let name = "";
    let updatingName = false;
    let email = "";
    let updatingEmail = false;
    let password = "";
    let password2 = "";
    let updatingPassword = false;
    let currentPassword = "";

    let updatingSomething = false;
    $: updatingSomething = updatingName || updatingEmail || updatingPassword

    function toggleNameChange() {
        updatingName = !updatingName;
        if (!updatingName) name = "";
        else name = get(account)?.name ?? "";
    }
    function toggleEmailChange() {
        updatingEmail = !updatingEmail;
        if (!updatingEmail) email = "";
        else email = get(account)?.email ?? "";
    }
    function togglePasswordChange() {
        updatingPassword = !updatingPassword;
        if (!updatingPassword) password = password2 = "";
    }

    let createAccountErrors: string[] = [];
    async function createAccount() {
        createAccountErrors = [];
        if (name.length == 0) { createAccountErrors.push("Name required"); }
        if (email.length == 0) { createAccountErrors.push("Email required"); }
        if (password.length == 0) { createAccountErrors.push("Password required"); }
        if (password !== password2) { createAccountErrors.push("Error: Passwords did not match"); }
        if (createAccountErrors.length > 0) { return; }
        await account.createAccount( name, email, password, errors => { createAccountErrors = errors } );
    }

    let updateErrors: string[] = [];
    async function updateAccount() {
        updateErrors = [];
        if (updatingName && name.length == 0) { updateErrors.push("Name required"); }
        if (updatingEmail && email.length == 0) { updateErrors.push("Email required"); }
        if (updatingPassword && password.length == 0) { updateErrors.push("Password required"); }
        if (updatingPassword && password !== password2) { updateErrors.push("Passwords did not match"); }
        if (currentPassword.length == 0) { updateErrors.push("Current password Required") }
        if (updateErrors.length > 0) { return; }
        await account.updateAccount(
            updatingName ? name : null,
            updatingEmail ? email : null,
            updatingPassword ? password : null,
            currentPassword,
            () => {
                // Disable them all and clear values
                if (updatingName) toggleNameChange();
                if (updatingEmail) toggleEmailChange();
                if (updatingPassword) togglePasswordChange();
                currentPassword = "";
            },
            errors => updateErrors = errors
        );
    }

</script>

<div id="account-page">
    {#if $account == null}
      <h1>Create An Account</h1>
      <form class="grid-form" on:submit|preventDefault="{createAccount}" method="post">
        <label for="name"> Account Name </label>
        <input type="text" bind:value="{name}" />
        <label for="email">Email</label>
        <input type="text" bind:value="{email}" />
        <label for="password">Password</label>
        <input type="text" bind:value="{password}" />
        <label for="password2">Confirm Password</label>
        <input type="text" bind:value="{password2}" class:red-outline={password!==password2} />

        <a href="/login" class="button" use:link>Login...</a><button class="bright" type="submit">Create Account</button>
        {#each createAccountErrors as error}
          <label class="grid-form-error" for="errors">{error}</label>
        {/each}
      </form>
    {:else}
      <h2>Account Information</h2>
    
      <form class="grid-3-form" on:submit|preventDefault="{updateAccount}" method="post">

        <label for="name"> Account Name </label>
        {#if updatingName}
          <input name="name" type="text" bind:value="{name}" />
          <button on:click|preventDefault={toggleNameChange}><img src="/img/x.svg" alt="Cancel"></button>
        {:else}
          <input name="name" type="text" bind:value="{$account.name}" disabled />
          <button on:click|preventDefault={toggleNameChange}><img src="/img/pencil.svg" alt="Edit"></button>
        {/if}

        <label for="email"> Email </label>
        {#if updatingEmail}
          <input name="email" type="text" bind:value="{email}" />
          <button on:click|preventDefault={toggleEmailChange}><img src="/img/x.svg" alt="Cancel"></button>
        {:else}
          <input name="email" type="text" bind:value="{$account.email}" disabled />
          <button on:click|preventDefault={toggleEmailChange}><img src="/img/pencil.svg" alt="Edit"></button>
        {/if}

        <label for="password"> Password </label>
        {#if updatingPassword}
          <input name="password" type="password" bind:value="{password}" />
          <div></div>
          <label for="password"> Confirm Password </label>
          <input name="password" type="password" bind:value="{password2}" />
          <button on:click|preventDefault={togglePasswordChange}><img src="/img/x.svg" alt="Cancel"></button>
        {:else}
          <input name="password" style="text-align:center;" type="text" value="---" disabled />
          <div></div>
          <label for="password"> Confirm Password </label>
          <input name="password" style="text-align:center;" type="text" value="---" disabled />
          <button on:click|preventDefault={togglePasswordChange}><img src="/img/pencil.svg" alt="Edit"></button>
        {/if}

        <div style="grid-column: span 3; height: 20px"></div>

        <label for="currentPassword"> Current Password </label>
        <input name="currentPassword" type="password" bind:value="{currentPassword}" disabled='{!updatingSomething}' />

        <button class="grid-form-submit" type="submit" disabled='{!updatingSomething}'>Apply Changes</button>
        {#each updateErrors as error}
          <label class="grid-form-error" for="errors">{error}</label>
        {/each}
      </form>
    {/if}
</div>

<style>
  #account-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .grid-form {
    display: grid;
    max-width: 500px;
    grid-template-columns: max-content auto;
    row-gap: 4px;
    column-gap: 4px;
    margin-left: auto;
    margin-right: auto;
  }
  .grid-form > label {
    text-align: right;
  }
  .grid-form-submit {
    grid-column: 2;
  }
  .grid-form > .grid-form-error {
    grid-column: 2;
    text-align: center;
  }
  
  .grid-3-form {
    display: grid;
    max-width: 500px;
    grid-template-columns: max-content auto 2em;
    row-gap: 4px;
    column-gap: 4px;
    margin-left: auto;
    margin-right: auto;
  }
  .grid-3-form > label {
    text-align: right;
  }
  .grid-3-form > button {
    height: 1.5em;
    padding: 2px;
  }
  .grid-3-form > button > img {
    height: 1.2em;
    align-self: center;
    justify-self: center;
  }
  .grid-3-form > .grid-form-submit {
    grid-column: 2;
  }
  .grid-3-form > .grid-form-error {
    grid-column: 2;
    text-align: center;
  }

  .red-outline {
    outline: 2px solid var(--error-color);
  }
</style>