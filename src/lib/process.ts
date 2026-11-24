// How a custom build runs, from first call to production. One source for the
// home page summary and the /how-we-work page, so the two never disagree.

export type Stage = {
  key: "discovery" | "prototype" | "build" | "launch" | "run";
  name: string;
  time: string;
  body: string;
  /** What actually happens in the stage. */
  happens: string[];
  /** What the client has in hand at the end of it. */
  deliverables: string[];
  /** What we need from the client's side. */
  you: string;
};

export const STAGES: Stage[] = [
  {
    key: "discovery",
    name: "Discovery",
    time: "1 to 2 weeks",
    body: "We sit with the people who will use the system and map the work as it happens today. You get a scope and an estimate you can hold us to.",
    happens: [
      "Interviews with the people who do the work, not only the people who sign off on it",
      "A walk through your current tools: spreadsheets, forms, the systems you already pay for",
      "The rules written down: approvals, exceptions, the month-end steps nobody documents",
    ],
    deliverables: ["Written scope", "Process map of today and tomorrow", "Estimate and plan by sprint", "List of integrations and data to move"],
    you: "One person who can make decisions, and a few hours with the people who do the work.",
  },
  {
    key: "prototype",
    name: "Prototype",
    time: "1 to 2 weeks",
    body: "Clickable screens before any code. Cheap to change, easy to agree on, and the best place to find the awkward cases.",
    happens: [
      "Clickable screens for the main journeys, built on your real data shapes",
      "Sessions where your team tries the flows and tells us where they get stuck",
      "Edge cases settled on screen: rejections, corrections, partial payments, reversals",
    ],
    deliverables: ["Clickable prototype", "Agreed screen flows", "Updated scope if anything moved"],
    you: "Two or three people to try the screens and say what is wrong with them.",
  },
  {
    key: "build",
    name: "Build",
    time: "2-week sprints",
    body: "Working software every two weeks on a preview link you can use, with tests and code review on every change.",
    happens: [
      "Two-week sprints, each starting with an agreed list and ending with a demo",
      "Every change reviewed by a second engineer and covered by automated tests",
      "A preview environment that always runs the latest finished work",
    ],
    deliverables: ["Working software each sprint", "Preview link", "Sprint demo and notes", "Test suite that grows with the code"],
    you: "An hour every two weeks for the demo, and quick answers when we hit a question.",
  },
  {
    key: "launch",
    name: "Launch",
    time: "planned go-live",
    body: "Data migration, training for your team and a go-live day chosen around your business, not ours.",
    happens: [
      "A trial migration of your data, checked against the old system before the real one",
      "Training for each role, using their own records",
      "A go-live date that avoids your payroll run, month-end or busy season",
    ],
    deliverables: ["Migrated and reconciled data", "Training for each role", "Go-live checklist", "Rollback plan"],
    you: "Time from each team for training, and sign-off that the migrated numbers match.",
  },
  {
    key: "run",
    name: "Run",
    time: "ongoing",
    body: "Monitoring, backups with restores we actually test, updates and a team that answers when something needs attention.",
    happens: [
      "Errors and slow pages reported to us before your team notices them",
      "Daily backups, with restores rehearsed on a schedule",
      "Security updates, small improvements and new features as your business changes",
    ],
    deliverables: ["Monitoring and alerts", "Tested backups", "Updates and fixes", "The same engineers who built it"],
    you: "Tell us when something changes in how you work. We adjust the system to match.",
  },
];
