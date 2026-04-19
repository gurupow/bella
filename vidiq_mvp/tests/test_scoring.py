from vidiq_mvp.app.scoring import (
    VideoSEOFeatures,
    compute_keyword_opportunity,
    compute_video_seo_score,
)


def test_video_seo_score_weighted_average() -> None:
    features = VideoSEOFeatures(
        title_score=80,
        description_score=70,
        tags_score=60,
        engagement_score=90,
        freshness_score=50,
        keyword_fit_score=75,
    )
    assert compute_video_seo_score(features) == 72.75


def test_keyword_opportunity() -> None:
    assert compute_keyword_opportunity(80, 20) == 80.0
