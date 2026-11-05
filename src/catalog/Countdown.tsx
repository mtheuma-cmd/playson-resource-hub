import { useEffect, useState } from "react";
import "./countdown.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function removalInstant(removeOn: string): number {
  const [year, month, day] = removeOn.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export function removalDateLabel(removeOn: string): string {
  const [year, month, day] = removeOn.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

function remainingParts(remainingMs: number) {
  const totalSeconds = Math.floor(Math.max(0, remainingMs) / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function Countdown({
  removeOn,
  placement = "card",
}: {
  removeOn: string;
  placement?: "card" | "nav" | "pop";
}) {
  const target = removalInstant(removeOn);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = remainingParts(target - now);
  const until = removalDateLabel(removeOn);
  const label = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until ${until}`;

  if (placement === "nav" || placement === "pop") {
    const readout = [
      [String(days), "d"],
      [pad(hours), "h"],
      [pad(minutes), "m"],
      [pad(seconds), "s"],
    ] as const;

    return (
      <p className={`countdown countdown--${placement}`} role="timer" aria-label={label}>
        <span className="countdown__until">Until {until}</span>
        <span className="countdown__readout">
          {readout.map(([value, unit]) => (
            <span key={unit}>
              <strong>{value}</strong>
              {unit}
            </span>
          ))}
        </span>
      </p>
    );
  }

  const units = [
    [String(days), "Days"],
    [pad(hours), "Hours"],
    [pad(minutes), "Minutes"],
    [pad(seconds), "Seconds"],
  ] as const;

  return (
    <div
      className={`countdown countdown--${placement}`}
      role="timer"
      aria-label={label}
    >
      <p className="countdown__until">Until {until}</p>
      <div className="countdown__units">
        {units.map(([value, label]) => (
          <span key={label}>
            <strong>{value}</strong>
            <small>{label}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
