import { assertValidDeck, type DeckData, type FrameCard, type FrameCoin, type FrameSlide } from "../deck/schema";

const desktop = { width: 1920, height: 1080 };
const mobile = { width: 589, height: 1278 };

function region(
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  canvas: { width: number; height: number },
): FrameCard {
  return {
    label,
    x: (x / canvas.width) * 100,
    y: (y / canvas.height) * 100,
    width: (width / canvas.width) * 100,
    height: (height / canvas.height) * 100,
    radius,
  };
}

function frame(
  id: string,
  pairId: string,
  title: string,
  imageSrc: string,
  imageAlt: string,
  cards?: FrameCard[],
  coins?: FrameCoin[],
): FrameSlide {
  return { id, pairId, type: "frame", title, imageSrc, imageAlt, cards, coins };
}

const closeCoins: FrameCoin[] = [
  { src: "/blitz-mode/desktop/coin-tl.png", x: 5.781, y: 11.667, width: 7.031, height: 11.667, duration: "5.6s", delay: "0s" },
  { src: "/blitz-mode/desktop/coin-tr.png", x: 91.823, y: 17.037, width: 7.708, height: 11.111, duration: "6.4s", delay: "-1.6s" },
  { src: "/blitz-mode/desktop/coin-br.png", x: 94.948, y: 72.778, width: 5.052, height: 13.704, duration: "5.2s", delay: "-2.8s" },
  { src: "/blitz-mode/desktop/coin-bl.png", x: 0, y: 85.37, width: 4.375, height: 14.259, duration: "6.8s", delay: "-0.9s" },
];

const blitzModeDeck: DeckData = {
  meta: {
    title: "Blitz Mode",
    market: "Blitz Mode",
    date: "October 2026",
    brand: "Playson",
  },
  mobileCanvas: { width: 589, height: 1278 },
  slides: [
    frame(
      "d-cover",
      "cover",
      "Blitz Mode",
      "/blitz-mode/desktop/01.png",
      "Blitz Mode. A new way to play. More speed. More flexibility. More choice.",
    ),
    frame(
      "d-meet",
      "meet",
      "Meet Blitz Mode",
      "/blitz-mode/desktop/02.png",
      "Meet Blitz Mode, with blitz-fast spins, bonus game choice, flexible settings, and unchanged game math.",
      [
        region("Blitz-fast spins", 194, 486, 716, 188, 17, desktop),
        region("Bonus game choice", 1012, 486, 716, 188, 17, desktop),
        region("Flexible settings", 194, 710, 716, 184, 17, desktop),
        region("Unchanged game math", 1012, 710, 716, 184, 17, desktop),
      ],
    ),
    frame(
      "d-how",
      "how",
      "How it works",
      "/blitz-mode/desktop/03.png",
      "How it works: easy access, flexible spin selection, super-fast gameplay, and results at a glance.",
    ),
    frame(
      "d-bonus",
      "bonus",
      "Bonus game",
      "/blitz-mode/desktop/04.png",
      "Bonus game. Two ways to experience it: Blitz Mode or Game Mode.",
      [
        region("Blitz Mode", 208, 548, 612, 208, 20, desktop),
        region("Game Mode", 1100, 548, 612, 208, 20, desktop),
      ],
    ),
    frame(
      "d-close",
      "close",
      "Ready to explore Blitz Mode",
      "/blitz-mode/desktop/05.png",
      "Ready to explore Blitz Mode. Contact your Account Manager at am@playson.com.",
      [region("Contact your Account Manager", 440, 544, 1048, 120, 30, desktop)],
      closeCoins,
    ),
  ],
  mobileSlides: [
    frame(
      "m-cover",
      "cover",
      "Blitz Mode",
      "/blitz-mode/mobile/01.png",
      "Blitz Mode. A new way to play. More speed. More flexibility. More choice.",
    ),
    frame(
      "m-meet",
      "meet",
      "Meet Blitz Mode",
      "/blitz-mode/mobile/02.png",
      "Meet Blitz Mode, with blitz-fast spins, flexible settings, bonus game choice, and unchanged game math.",
      [
        region("Blitz-fast spins", 56, 609, 476, 116, 15, mobile),
        region("Flexible settings", 56, 743, 476, 116, 15, mobile),
        region("Bonus game choice", 56, 876, 476, 144, 15, mobile),
        region("Unchanged game math", 56, 1038, 476, 116, 15, mobile),
      ],
    ),
    frame(
      "m-easy-access",
      "how",
      "Easy access",
      "/blitz-mode/mobile/03.png",
      "How it works. Easy access: Blitz Mode is accessible directly from the main game interface through a dedicated button.",
    ),
    frame(
      "m-spin-selection",
      "how",
      "Flexible spin selection",
      "/blitz-mode/mobile/04.png",
      "How it works. Flexible spin selection: players can select from 10 to 1,000 spins or an unlimited option.",
    ),
    frame(
      "m-gameplay",
      "how",
      "Super-fast gameplay",
      "/blitz-mode/mobile/05.png",
      "How it works. Super-fast gameplay through a dedicated Blitz Mode interface.",
    ),
    frame(
      "m-results",
      "how",
      "Results at a glance",
      "/blitz-mode/mobile/06.png",
      "How it works. Results at a glance: spins played, total winnings, and top wins.",
    ),
    frame(
      "m-bonus",
      "bonus",
      "Bonus game",
      "/blitz-mode/mobile/07.png",
      "Bonus game. Two ways to experience it: Blitz Mode or Game Mode.",
      [
        region("Blitz Mode", 56, 308, 476, 172, 18, mobile),
        region("Game Mode", 56, 504, 476, 176, 18, mobile),
      ],
    ),
    frame(
      "m-close",
      "close",
      "Ready to explore Blitz Mode",
      "/blitz-mode/mobile/08.png",
      "Ready to explore Blitz Mode. Contact your Account Manager at am@playson.com.",
      [region("Contact your Account Manager", 52, 508, 488, 372, 26, mobile)],
    ),
  ],
};

export const blitzModeDeckData = assertValidDeck(blitzModeDeck);
