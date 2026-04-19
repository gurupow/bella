# vidIQ Benzeri MVP İskeleti

Bu klasör, YouTube odaklı bir "vidIQ benzeri" ürün için ilk çalışan backend iskeletini içerir.

## Kapsam (MVP)

- Video SEO skorlaması
- Anahtar kelime fırsat puanı
- Kanal/video metrikleri için temel veri modeli
- Öneri endpoint'i

## Kurulum

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r vidiq_mvp/requirements.txt
```

## Uygulamayı Çalıştırma

```bash
uvicorn vidiq_mvp.app.main:app --reload
```

Sunucu ayağa kalktıktan sonra dokümantasyon:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Çalışmasını Test Etme (Adım Adım)

### 1) Health check

```bash
curl -s http://127.0.0.1:8000/health
```

Beklenen çıktı:

```json
{"status":"ok"}
```

### 2) Video SEO skorunu test et

```bash
curl -s -X POST http://127.0.0.1:8000/score/video-seo \
  -H 'Content-Type: application/json' \
  -d '{
    "title_score": 80,
    "description_score": 70,
    "tags_score": 60,
    "engagement_score": 90,
    "freshness_score": 50,
    "keyword_fit_score": 75
  }'
```

Beklenen çıktı:

```json
{"seo_score":72.75}
```

### 3) Keyword opportunity skorunu test et

```bash
curl -s -X POST http://127.0.0.1:8000/score/keyword-opportunity \
  -H 'Content-Type: application/json' \
  -d '{"search_volume": 80, "competition": 20}'
```

Beklenen çıktı:

```json
{"opportunity_score":80.0}
```

### 4) Başlık önerisini test et

```bash
curl -s -X POST http://127.0.0.1:8000/recommend/title \
  -H 'Content-Type: application/json' \
  -d '{"base_title":"YouTube SEO Taktikleri", "keyword":"youtube seo"}'
```

Beklenen cevap içinde 3 öneri döner.

## Otomatik Testler

Bu repo içinde hem skorlama hem API endpoint testleri vardır.

```bash
PYTHONPATH=. pytest -q vidiq_mvp/tests
```

## Endpointler

- `GET /health`
- `POST /score/video-seo`
- `POST /score/keyword-opportunity`
- `POST /recommend/title`

## Not

Bu sürüm MVP amaçlıdır. Gerçek üretimde:

- YouTube Data API entegrasyonu
- Kullanıcı auth + rate limit
- Feature store ve model servis ayrımı
- Gözlemlenebilirlik (logging, tracing, metrics)

eklenmelidir.
