<script lang="ts">
  type ExternalLink = {
    label: string;
    href: string;
  };
  const externalLinks: ReadonlyArray<ExternalLink> = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ian-gallacher/',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/IanGallacher',
    },
  ];
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

<div class="flex flex-col items-center w-2xl pt-10 bg-slate-500">
  <h1 class="text-4xl">Ian Gallacher</h1>
  <external-links class="flex flex-col gap-2">
    {#each externalLinks as externalLink (externalLink.label)}
      {@render externalLinkDiv(externalLink)}
    {/each}
  </external-links>
</div>
