import type { SlideData } from "../deck/schema";

export const archivedSlides: SlideData[] = [
  {
    id: "archive",
    type: "section",
    number: "A",
    eyebrow: "Archive",
    title: "Archived slides",
    body: "Kept out of the live presentation. These slides can be brought back when they are needed.",
  },
  {
    id: "thirty-days",
    type: "card-grid",
    eyebrow: "Archived",
    title: "30 Days with the Playson Power Pack",
    body: "Here’s how a month of our tools could look at your casino — built around different player moments.",
    cards: [
      { eyebrow: "Week 1", title: "Launch Grand Race", body: "Open a longer leaderboard campaign and establish visible positions." },
      { eyebrow: "Week 2", title: "Add Turbo Races", body: "Run short prime-time races as repeat side competitions." },
      { eyebrow: "Week 3", title: "Layer in Power Blasts", body: "Use instant drops to create reward moments during active sessions." },
      { eyebrow: "Week 4", title: "Finish Grand Race", body: "Close the campaign, credit prizes and recap the winners." },
      { title: "Across the month:", body: "Use Flexible Free Spins for targeted offers. Keep Power Chance available inside selected titles for ongoing jackpot potential.", featured: true },
    ],
  },
];
