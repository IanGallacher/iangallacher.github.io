<script lang="ts">
  import type { Profile, ResumeEntry } from '$lib/types';
  import Resume from './Resume.svelte';
  import Sidebar from './Sidebar.svelte';

  const profile: Readonly<Profile> = {
    name: 'Ian Gallacher',
    img: 'https://avatars.githubusercontent.com/u/7298650?v=4',
    location: 'Redmond, Washington',
    externalLinks: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ian-gallacher/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/IanGallacher',
      },
    ],
  };

  const resumeEntries: ReadonlyArray<ResumeEntry> = [
    {
      name: 'Innerworld - Software Engineer',
      description:
        'Led and implemented the web backend for an online VR therapy alternative.Led and implemented the web backend for an online VR therapy alternative.',
      startAt: 'Sep 2022',
      endAt: 'Jun 2024',
    },
    {
      name: 'AppFolio, Inc. - Software Engineer',
      description:
        'Developed automation to deliver tax documents and contest chargebacks.',
      startAt: 'Jul 2021',
      endAt: 'Sep 2022',
    },
    {
      name: 'Toptal - Senior Software Engineer',
      description:
        'Completed contract work for various companies as one of the top 3% of developers hired by the platform.Completed contract work for various companies as one of the top 3% of developers hired by the platform.',
      startAt: 'Sep 2020',
      endAt: 'May 2021',
    },
    {
      name: 'AxiaMed - Software Engineer',
      description:
        'Wrote highly available and reliable payment processing and reporting software for hospitals.Wrote highly available and reliable payment processing and reporting software for hospitals.',
      startAt: 'Mar 2019',
      endAt: 'Aug 2020',
    },
    {
      name: 'ParentSquare - Full Stack Engineer',
      description:
        'Wrote and maintained parent teacher communication software. Created and maintained tools for the customer success team to handle the rapid company growth. Optimized performance of API endpoints, over 270 times faster in some cases. Tightened security of endpoints to protect user data.',
      startAt: 'May 2018',
      endAt: 'Mar 2019',
    },

    {
      name: 'Interplay Learning - Software Developer',
      startAt: 'Oct 2016',
      endAt: 'May 2017',
      description:
        'Updated a training sim from Unity 3 to Unity 5 to allow for a WebGL build, helped design the new and improved back end infrastructure.',
    },
    {
      name: 'The Munky - Game Developer & Technical Artist (Contract work)',
      startAt: 'Aug 2016',
      endAt: 'Oct 2016',
      description:
        'Worked on the video game Drunkn Bar Fight for several months. Was responsible for many of the games visual and special effects. Implemented windows and beer bottles that shatter, 3D modeled some environment props, and implemented the score screen with achievements.The released game was very highly praised, featured by several popular youtubers, and even made the front page of Reddit.',
    },
    {
      name: 'Dragonfly Software - Client Side Game Developer (Contract Work)',
      startAt: 'Feb 2016',
      endAt: 'Aug 2016',
      description:
        'During my time at Dragonfly Software, I created a system that allows for threaded loading of assets, allowing for very short loading screens. In addition, I created a UI that will automatically scale to any size device, including non standard resolutions. Most of my work involved optimizing the code base for maintainability and performance. The game I worked on is currently unreleased.',
    },
  ];
</script>

<div class="flex flex-row min-h-screen">
  <Sidebar {profile} />
  <Resume {resumeEntries} />
</div>
