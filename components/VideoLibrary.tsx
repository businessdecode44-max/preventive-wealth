"use client";

import { trackEvent } from "@/lib/analytics";
import { videos } from "@/lib/videos";

export function VideoLibrary() {
  return (
    <section id="videos" className="section video-library-section" aria-labelledby="videos-title">
      <div className="section-heading">
        <p className="section-kicker">Video Lessons</p>
        <h2 id="videos-title">Learn Preventive Wealth in Minutes</h2>
        <p>
          Watch short, practical lessons that introduce the major ideas behind protection-based financial literacy.
        </p>
      </div>
      <div className="video-card-grid">
        {videos.slice(0, 6).map((video) => (
          <article className="video-card" key={video.id}>
            <div className="video-embed">
              <iframe
                src={video.embedUrl}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="video-card-body">
              <span>{video.provider === "youtube" ? "YouTube" : "Vimeo"}</span>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <a
                className="button button-secondary"
                href={video.url}
                target="_blank"
                rel="noopener"
                onClick={() =>
                  trackEvent("video_card_click", {
                    video_id: video.id,
                    video_title: video.title,
                    provider: video.provider
                  })
                }
              >
                {video.ctaLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
