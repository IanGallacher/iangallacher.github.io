<script lang="ts">
  import type { ExternalLink, Profile } from '$lib/types';

  type Props = { profile: Profile };
  const { profile }: Props = $props();
</script>

{#snippet externalLinkDiv(externalLink: ExternalLink)}
  <external-link>
    <a
      class="hover:bg-blue-500"
      href={externalLink.href}
    >
      {externalLink.label}
    </a>
  </external-link>
{/snippet}

<div class="flex flex-col gap-4 items-center w-2xl pt-10 bg-blue-500">
  <name-and-location class="flex flex-col gap-1 items-center">
    <h1 class="text-4xl">{profile.name}</h1>
    {#if profile.location}
      <div class="text-xl font-extralight">{profile.location}</div>
    {/if}
  </name-and-location>
  <img
    alt={profile.name + ' Profile Picture'}
    class="rounded-full"
    src={profile.img}
  />
  <external-links class="flex flex-col gap-2 font-light">
    {#each profile.externalLinks as externalLink (externalLink.label)}
      {@render externalLinkDiv(externalLink)}
    {/each}
  </external-links>
</div>
