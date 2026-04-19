"""Simple scoring utilities for vidIQ-like MVP."""

from __future__ import annotations

from dataclasses import dataclass


def clamp_0_100(value: float) -> float:
    return max(0.0, min(100.0, value))


@dataclass
class VideoSEOFeatures:
    title_score: float
    description_score: float
    tags_score: float
    engagement_score: float
    freshness_score: float
    keyword_fit_score: float


def compute_video_seo_score(features: VideoSEOFeatures) -> float:
    """Weighted SEO score in range [0, 100]."""
    score = (
        0.25 * features.title_score
        + 0.20 * features.description_score
        + 0.15 * features.tags_score
        + 0.15 * features.engagement_score
        + 0.10 * features.freshness_score
        + 0.15 * features.keyword_fit_score
    )
    return round(clamp_0_100(score), 2)


def compute_keyword_opportunity(search_volume: float, competition: float) -> float:
    """Higher search volume and lower competition means better opportunity.

    Inputs expected in [0, 100].
    """
    raw = 0.65 * search_volume + 0.35 * (100.0 - competition)
    return round(clamp_0_100(raw), 2)


def suggest_title_variants(base_title: str, keyword: str) -> list[str]:
    """Return simple title alternatives for quick MVP recommendation."""
    cleaned_title = base_title.strip()
    cleaned_keyword = keyword.strip()

    return [
        f"{cleaned_keyword}: {cleaned_title}",
        f"{cleaned_title} | {cleaned_keyword} Rehberi",
        f"{cleaned_title} (2026) - {cleaned_keyword}",
    ]
