<script lang="ts">
  import type { ResumeEntry } from '$lib/types';

  type Props = { resumeEntries: ReadonlyArray<ResumeEntry> };
  const { resumeEntries }: Props = $props();
</script>

{#snippet resumeEntryDiv(entry: ResumeEntry)}
  <resume-entry>
    <resume-title class="flex flex-row gap-4 items-center">
      <h3 class="text-lg">
        {entry.name}
      </h3>
      <span class="font-thin">
        ({entry.startAt} - {entry.endAt})
      </span>
    </resume-title>
    <div>
      {entry.description}
    </div>
    {#if entry.accomplishments}
      <ul>
        {#each entry.accomplishments as accomplishment}
          <div>
            {accomplishment}
          </div>
        {/each}
      </ul>
    {/if}
  </resume-entry>
{/snippet}

<resume-content class="flex flex-col gap-4 text-white bg-slate-950 p-16">
  <h2 class="text-4xl">Resume</h2>
  {#each resumeEntries as resumeEntry (resumeEntry.name)}
    {@render resumeEntryDiv(resumeEntry)}
  {/each}
</resume-content>
