import { assertValidDeck, type DeckData, type FrameSlide } from "../deck/schema";

function frame(id: string, title: string, file: string, imageAlt: string): FrameSlide {
  return {
    id,
    pairId: id,
    type: "frame",
    title,
    imageSrc: `/blasts-races/${file}`,
    imageAlt,
  };
}

const blastsRacesDeck: DeckData = {
  meta: {
    title: "Blasts & Races",
    market: "Blasts & Races",
    date: "July 2026",
    brand: "Playson",
  },
  slides: [
    frame(
      "br-01",
      "Blasts & Races",
      "01.png",
      "Blasts & Races, €25,000,000, July 2026 to June 2027. 3 constant promotions and non-stop player engagement.",
    ),
    frame(
      "br-02",
      "At a glance",
      "02.png",
      "At a glance. One opt-in. Huge prizes. Non-stop momentum. Monthly prize pool, one prize each minute, top performing games, and three promo features.",
    ),
    frame(
      "br-03",
      "Three engagement drivers",
      "03.png",
      "Three engagement drivers. Power Blasts, Grand Race, and Turbo Races.",
    ),
    frame(
      "br-04",
      "Non-Stop Engagement",
      "04.png",
      "Non-stop engagement. Instant rewards with Power Blasts, weekly Grand Race leaderboards, and multiple daily Turbo Races.",
    ),
    frame(
      "br-05",
      "Designed for Every Player Segment",
      "05.png",
      "Designed for every player segment: VIPs and high rollers, active players, and new and casual players.",
    ),
    frame(
      "br-06",
      "Power Blasts",
      "06.png",
      "Power Blasts. Instant prize drops while playing. Prizes: cash, flexible free spins, multiplier, and bonus games.",
    ),
    frame(
      "br-07",
      "Grand Race",
      "07.png",
      "Grand Race. Continuous weekly leaderboard competition. Prizes: cash and flexible free spins.",
    ),
    frame(
      "br-08",
      "Turbo Races",
      "08.png",
      "Turbo Races. Daily reasons to return. Multiple daily 20-minute prime-time races. Prizes: cash and flexible free spins.",
    ),
    frame(
      "br-09",
      "Flexible Free Spins as a prize type",
      "09.png",
      "Flexible Free Spins as a prize type. Players can adjust the free spins bet level while the prize budget stays constant.",
    ),
    frame(
      "br-10",
      "Complete Marketing Support",
      "10.png",
      "Complete marketing support. Banners, promo game icons, promo videos, campaign guidelines, and operator placement recommendations.",
    ),
    frame(
      "br-11",
      "Join the Promotion",
      "11.png",
      "Join the promotion. Contact your account manager, opt in, then start engaging players.",
    ),
    frame(
      "br-12",
      "Final Summary",
      "12.png",
      "Final summary. Player engagement, three promo features, every player segment, and simple activation.",
    ),
    frame(
      "br-13",
      "Contact",
      "13.png",
      "Blasts & Races close. Ask your account manager about flexible promo free spins, or email am@playson.com.",
    ),
  ],
};

export const blastsRacesDeckData = assertValidDeck(blastsRacesDeck);
