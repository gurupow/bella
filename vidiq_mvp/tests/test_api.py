from fastapi.testclient import TestClient

from vidiq_mvp.app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_video_seo_endpoint() -> None:
    payload = {
        "title_score": 80,
        "description_score": 70,
        "tags_score": 60,
        "engagement_score": 90,
        "freshness_score": 50,
        "keyword_fit_score": 75,
    }
    response = client.post("/score/video-seo", json=payload)
    assert response.status_code == 200
    assert response.json() == {"seo_score": 72.75}


def test_keyword_opportunity_endpoint() -> None:
    response = client.post(
        "/score/keyword-opportunity",
        json={"search_volume": 80, "competition": 20},
    )
    assert response.status_code == 200
    assert response.json() == {"opportunity_score": 80.0}


def test_title_recommendation_endpoint() -> None:
    response = client.post(
        "/recommend/title",
        json={
            "base_title": "YouTube SEO Taktikleri",
            "keyword": "youtube seo",
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert "suggestions" in body
    assert len(body["suggestions"]) == 3
