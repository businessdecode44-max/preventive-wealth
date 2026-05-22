export type VideoCard = {
  id: string;
  provider: "youtube" | "vimeo";
  title: string;
  description: string;
  url: string;
  embedUrl: string;
  ctaLabel: string;
};

function youtubeEmbed(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export const videos: VideoCard[] = [
  {
    id: "what-is-preventive-wealth",
    provider: "youtube",
    title: "What Is Preventive Wealth?",
    description: "A simple introduction to financial literacy as prevention and why education comes before selling.",
    url: "https://youtu.be/wX89Rk5pr6A?si=uqfLmr8YhkeorVgo",
    embedUrl: youtubeEmbed("wX89Rk5pr6A"),
    ctaLabel: "Watch Lesson"
  },
  {
    id: "financial-literacy-as-prevention",
    provider: "youtube",
    title: "Financial Literacy as Prevention",
    description: "Learn how practical education can help families prepare before financial pressure arrives.",
    url: "https://youtu.be/gIieZrg3_UE?si=hOxOXuXrSZ4nxlPJ",
    embedUrl: youtubeEmbed("gIieZrg3_UE"),
    ctaLabel: "Watch Lesson"
  },
  {
    id: "life-insurance-family-protection",
    provider: "youtube",
    title: "How Life Insurance Can Protect Your Family",
    description: "Understand protection planning through the lens of income, mortgage, and family stability.",
    url: "https://youtu.be/FBuc3gYyFK8?si=Grfl_qQjpuV6uZsv",
    embedUrl: youtubeEmbed("FBuc3gYyFK8"),
    ctaLabel: "Watch Lesson"
  },
  {
    id: "living-benefits-explained",
    provider: "youtube",
    title: "Living Benefits Explained",
    description: "A beginner-friendly look at benefits that may matter while a policy owner is still living.",
    url: "https://www.youtube.com/watch?v=tUkgOUpVnSk",
    embedUrl: youtubeEmbed("tUkgOUpVnSk"),
    ctaLabel: "Watch Lesson"
  },
  {
    id: "infinite-banking-basics",
    provider: "youtube",
    title: "Infinite Banking Basics",
    description: "Learn the core idea behind cash value access, disciplined borrowing, and liquidity awareness.",
    url: "https://www.youtube.com/watch?v=P_Ww4DSBeh8",
    embedUrl: youtubeEmbed("P_Ww4DSBeh8"),
    ctaLabel: "Watch Lesson"
  },
  {
    id: "generational-wealth",
    provider: "youtube",
    title: "How to Build Generational Wealth",
    description: "Explore legacy as education, values, preparation, and protection across more than one generation.",
    url: "https://www.youtube.com/watch?v=YMqwh26eO74",
    embedUrl: youtubeEmbed("YMqwh26eO74"),
    ctaLabel: "Watch Lesson"
  }
];
