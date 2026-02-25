<svelte:head>
	<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>
<script lang="ts">
  import { onMount } from 'svelte';

  let tabsData = [
    {
      name: "Common",
      buttons: [
        "Yes",
        "No",
        "Hotpack",
        "Pills",
				"Too hot",
				"To cold",
				"I'm hungry"
      ]
    },
    {
      name: "Urgency",
      buttons: [
        "Emergency!!!!",
        "I'm in pain",
        "This request is urgent",
        "My request can wait 5-10 min",
        "I asked more than 10 min ago…I'm still waiting…..",
        "My request can wait a day",
        "my request can wait until the weekend"
      ]
    },
    {
      name: "Yes/No Responses",
      buttons: [
        "Yes",
        "No",
        "I don't care",
        "I don't want to, but I'm willing to",
        "I'm thinking",
        "You're on the wrong track",
        "You're on the right track; keep asking questions",
        "Kind of",
        "A little bit",
        "I like that idea",
        "I don't like that idea",
        "I have a better idea",
        "Maybe later",
        "You're full of shit",
        "Come back in 10 minutes",
        "Ask me in a few hours",
        "Ask me in a few days"
      ]
    },
    {
      name: "Move Location",
      buttons: [
        "Chair",
        "Bathroom",
        "Den bed",
        "Living room bed",
        "Outside",
        "Somewhere else"
      ]
    },
    {
      name: "Food",
      buttons: [
        "Milk",
        "Milk and pills",
        "E",
        "C/G/E",
        "anxiety night-time pill",
        "smoothie",
        "Chipotle",
        "Rice and veggies",
        "waffles",
        "french toast",
        "different food"
      ]
    },
    {
      name: "Medication",
      buttons: [
        "Milk and pills",
        "E",
        "C/G/E",
        "anxiety night-time pill",
      ]
    },
    {
      name: "People",
      buttons: [
        "Mom",
        "Dad",
        "Ian",
        "Meg",
        "Grandma",
        "Grandpa",
        "Reid",
        "Jace",
      ]
    },
    {
      name: "Emotions",
      buttons: [
        "Thank you",
        "I appreciate you",
        "I love you",
        "I'm sorry",
        "I'm sad",
        "I'm frustrated",
        "I'm angry",
        "I'm disappointed",
        "I was caught off guard",
        "I'm confused about something you said/did",
        "I miss you",
        "I forgive you",
        "I understand what you're saying",
        "What you're saying makes sense",
        "I'm panicking",
        "I'm feeling high anxiety",
        "I'm a little happy about that",
        "Good job",
        "I'm proud of you",
        "That meant a lot to me",
        "That's awesome!",
        "I liked it when you did that",
        "That wasn't helpful, but I know you're trying and you love me",
      ]
    },
    {
      name: "Time and Numbers",
      layout: "two-column",
      sections: [
        {
          sectionName: "Numbers",
          layout: "three-column",
          buttons: [
            ["1", "2","3", "4","5"],
            ["6","7","8","9"],
            ["15", "30"],
            ["60"]
          ]
        },
        {
          sectionName: "Time Units",
          layout: "two-column",
          buttons: [
            ["minutes", "hours","days", "weeks","months", "years","morning", "afternoon","evening", "tonight","tomorrow", "weekend","more than","less than","I need more time to adjust",]
          ]
        }
      ]
    },
    {
      name: "Other Requests",
      buttons: [
        "Flush my eyes with saline",
        "Get my glasses",
        "Clean my glasses",
        "Get my Ipad",
        "Get me hot bag",
        "Turn on heated blanket",
        "Cover my feet with blanket",
        "Turn on heater",
        "Lymph massage",
        "Massage gun",
        "Vegastim (vegas nerve stimulator)",
        "Massage/Heat mat",
        "Cut my nails",
        "Put on Socks",
        "New Underwear",
        "Shirt/Pants",
        "Wash Hair",
        "Wash Face",
        "Wash feet",
        "Wash body (chest, underarms, etc.)",
        "Mom and dad talk to each other",
        "I want to discuss new ME/CFS plan",
        "I want to try a new medication or treatment",
        "take my blood pressure",
        "tuck me in",
        "ear buds",
        "turn on tv",
        "give me remote",
        "let's watch a show together"
      ]
    },
  ];

  let activeTab = 0;
  let currentUtterance = null;

  function updateUrlState(param, state) {
    // const url = new URL(window.location);
    // url.searchParams.set(param, state);
    // window.history.replaceState(null, '', url);
  }

  function setActiveTab(index) {
    activeTab = index;
    updateUrlState('tab', tabsData[activeTab].name);
  }

  function speak(text) {
    if (currentUtterance) {
      speechSynthesis.cancel();
    }
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = "en-US";
    speechSynthesis.speak(currentUtterance);
  }

  onMount(() => {
    const tabName = new URLSearchParams(window.location.search).get('tab');
    const defaultIndex = tabsData.findIndex(p => p.name.toLowerCase() === (tabName || '').toLowerCase());
    setActiveTab(defaultIndex >= 0 ? defaultIndex : 0);
  });
</script>

<style>
  :global(body) {
    font-family: Arial, sans-serif;
    margin: 0;
    background: #101010;
    color: #d0d0d0;
  }
</style><header class="bg-[#1a1a1a] text-[#d0d0d0] text-center 
               text-xl sm:text-2xl 
               py-4 sm:py-6 
               font-semibold tracking-wide">
  Communication Helper
</header>

<div class="bg-[#101010] min-h-screen">

  <!-- ========================= -->
  <!-- 📱 MOBILE: ACCORDION + 📲 TABLET+: TABS COMBINED -->
  <!-- ========================= -->
  <div class="px-3 py-4 space-y-4 bg-[#101010]">

    <!-- MOBILE ACCORDION VIEW (sm and below) -->
    <div class="md:hidden">
      {#each tabsData as tab, index}
        <div class="bg-[#181818] border border-[#444] rounded-2xl overflow-hidden">
          <button
            class="w-full flex justify-between items-center
                   px-4 py-4
                   text-xl
                   bg-[#282828] text-[#d0d0d0]
                   active:bg-[#444]
                   transition"
            on:click={() => activeTab = activeTab === index ? -1 : index}
          >
            <span class="font-semibold">{tab.name}</span>
            <span>{activeTab === index ? "▾" : "▸"}</span>
          </button>

          {#if activeTab === index}
            <div class="px-3 py-4 border-t border-[#444] bg-[#181818]">
              {#if tab.layout === 'two-column'}
                <div class="flex flex-col gap-6">
                  {#each tab.sections as section}
                    <div>
                      <div class="text-[#e0e0e0] font-bold text-lg mb-3">
                        {section.sectionName}
                      </div>

                      {#each section.buttons as row}
                        <div class="flex flex-wrap gap-3 mb-3">
                          {#each row as btn}
                            <button
                              class="flex-1 min-w-[70px]
                                     bg-[#303030] text-[#d0d0d0]
                                     rounded-2xl
                                     px-4 py-4
                                     text-xl sm:text-lg
                                     active:bg-[#606060]
                                     active:scale-95
                                     transition"
                              on:click={() => speak(btn)}
                            >
                              {btn}
                            </button>
                          {/each}
                        </div>
                      {/each}
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="flex flex-wrap gap-3">
                  {#each tab.buttons as btn}
                    <button
                      class="flex-1 w-full sm:w-auto bg-[#303030] text-[#d0d0d0] rounded-2xl px-4 py-4 text-xl sm:text-lg active:bg-[#606060] active:scale-95 transition"
                      on:click={() => speak(btn)}
                    >
                      {btn}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- TABLET+ / DESKTOP VIEW (md and above) -->
    <div class="hidden md:block">

      <!-- Tab Bar -->
      <div class="flex overflow-x-auto bg-[#181818] border-b border-[#444]">
        {#each tabsData as tab, index}
          <button
            class="px-6 py-4 text-lg whitespace-nowrap
                   border-r border-[#444]
                   transition
                   {activeTab === index
                     ? 'bg-[#444] text-white font-semibold'
                     : 'bg-[#282828] text-[#d0d0d0] hover:bg-[#383838]'}"
            on:click={() => activeTab = index}
          >
            {tab.name}
          </button>
        {/each}
      </div>

      <!-- Tab Content -->
      <div class="p-6 bg-[#181818]">
        {#if tabsData[activeTab].layout === 'two-column'}
          <div class="flex flex-wrap gap-10">
            {#each tabsData[activeTab].sections as section}
              <div class="flex-1 min-w-[300px]">
                <div class="text-[#e0e0e0] font-bold text-xl mb-4">
                  {section.sectionName}
                </div>

                {#each section.buttons as row}
                  <div class="flex flex-wrap gap-4 mb-4">
                    {#each row as btn}
                      <button
                        class="bg-[#303030] text-[#d0d0d0]
                               rounded-xl
                               px-5 py-4
                               text-lg
                               active:bg-[#606060]
                               active:scale-95
                               transition"
                        on:click={() => speak(btn)}
                      >
                        {btn}
                      </button>
                    {/each}
                  </div>
                {/each}
              </div>
            {/each}
          </div>
        {:else}
          <div class="flex flex-wrap gap-4">
            {#each tabsData[activeTab].buttons as btn}
              <button
                class="bg-[#303030] text-[#d0d0d0]
                       rounded-xl
                       px-5 py-4
                       text-lg
                       active:bg-[#606060]
                       active:scale-95
                       transition"
                on:click={() => speak(btn)}
              >
                {btn}
              </button>
            {/each}
          </div>
        {/if}
      </div>

    </div>

  </div>
</div>