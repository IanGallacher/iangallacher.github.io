<script lang="ts">
  import type { ResumeEntry } from '$lib/types';

  type Props = { resumeEntries: ReadonlyArray<ResumeEntry> };
  const { resumeEntries }: Props = $props();
</script>

{#snippet resumeEntryDiv(entry: ResumeEntry)}
  <resume-entry>
    <resume-job-header class="flex flex-row gap-2 items-center">
      <h3 class="text-lg font-semibold">
        {entry.name}
      </h3>
      <span class="font-light">
        ({entry.startAt} - {entry.endAt})
      </span>
    </resume-job-header>
    <div class="text-offwhite">
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

<resume-content class="flex flex-col gap-4 text-white bg-page-content p-16">
  <h2 class="text-4xl">Resume</h2>
  {#each resumeEntries as resumeEntry (resumeEntry.name)}
    {@render resumeEntryDiv(resumeEntry)}
  {/each}
</resume-content>
