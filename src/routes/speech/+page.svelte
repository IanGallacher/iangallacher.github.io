<script lang="ts">
  import { onMount } from 'svelte';

  let tabsData = [
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
    const url = new URL(window.location);
    url.searchParams.set(param, state);
    window.history.replaceState(null, '', url);
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

  header {
    background: #1a1a1a;
    color: #d0d0d0;
    padding: 15px;
    text-align: center;
    font-size: 20px;
  }

  #tabs {
    display: flex;
    overflow-x: auto;
    background: #181818;
    padding: 5px;
  }

  .tab {
    padding: 12px 20px;
    cursor: pointer;
    background: #282828;
    border-right: 1px solid #444;
    color: #d0d0d0;
    white-space: nowrap;
  }

  .tab.active {
    background: #444;
    font-weight: bold;
    color: #fff;
  }

  #content {
    padding: 20px;
    background: #181818;
    border-top: 2px solid #444;
  }

  .section-title {
    font-weight: bold;
    margin: 20px 0 10px;
    font-size: 18px;
    color: #e0e0e0;
  }

  .button-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
    justify-content: flex-start;
  }

  .two-column-wrapper {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
  }

  .two-column-section {
    flex: 1 1 300px;
    display: grid;
    gap: 12px;
  }

  .two-column-section.three-column {
    grid-template-columns: repeat(3, 1fr);
  }

  .two-column-section.two-column {
    grid-template-columns: repeat(2, 1fr);
  }

  .two-column-section .section-title {
    grid-column: 1 / -1;
  }

  .speak-button {
    padding: 14px 18px;
    font-size: 26px;
    background: #303030;
    color: #d0d0d0;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    white-space: normal;
    text-align: center;
    max-width: 100%;
  }

  .speak-button:hover {
    background: #808080;
  }

  .speak-button:active {
    background: #606060;
    transform: scale(0.98);
  }
</style>

<header>Communication Helper</header>

<div id="tabs">
  {#each tabsData as tab, index}
    <div 
      class="tab {activeTab === index ? 'active' : ''}" 
      on:click={() => setActiveTab(index)}>
      {tab.name}
    </div>
  {/each}
</div>

<div id="content">
  {#if tabsData[activeTab].layout === 'two-column'}
    <div class="two-column-wrapper">
      {#each tabsData[activeTab].sections as section}
        <div class="two-column-section {section.layout}">
          <div class="section-title">{section.sectionName}</div>
          {#each section.buttons as row}
            <div class="button-grid">
              {#each row as btn}
                <button class="speak-button" on:click={() => speak(btn)}>{btn}</button>
              {/each}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <div class="button-grid">
      {#each tabsData[activeTab].buttons as btn}
        <button class="speak-button" on:click={() => speak(btn)}>{btn}</button>
      {/each}
    </div>
  {/if}
</div>
