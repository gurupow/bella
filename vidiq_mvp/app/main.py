from __future__ import annotations

from fastapi import FastAPI
from pydantic import BaseModel, Field

from .scoring import (
    VideoSEOFeatures,
    compute_keyword_opportunity,
    compute_video_seo_score,
    suggest_title_variants,
)

app = FastAPI(title="vidIQ-like MVP API", version="0.1.0")


class VideoSEORequest(BaseModel):
    title_score: float = Field(ge=0, le=100)
    description_score: float = Field(ge=0, le=100)
    tags_score: float = Field(ge=0, le=100)
    engagement_score: float = Field(ge=0, le=100)
    freshness_score: float = Field(ge=0, le=100)
    keyword_fit_score: float = Field(ge=0, le=100)


class KeywordOpportunityRequest(BaseModel):
    search_volume: float = Field(ge=0, le=100)
    competition: float = Field(ge=0, le=100)


class TitleRecommendRequest(BaseModel):
    base_title: str
    keyword: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/score/video-seo")
def score_video_seo(req: VideoSEORequest) -> dict[str, float]:
    features = VideoSEOFeatures(**req.model_dump())
    return {"seo_score": compute_video_seo_score(features)}


@app.post("/score/keyword-opportunity")
def score_keyword(req: KeywordOpportunityRequest) -> dict[str, float]:
    return {
        "opportunity_score": compute_keyword_opportunity(
            req.search_volume,
            req.competition,
        )
    }


@app.post("/recommend/title")
def recommend_title(req: TitleRecommendRequest) -> dict[str, list[str]]:
    return {"suggestions": suggest_title_variants(req.base_title, req.keyword)}
