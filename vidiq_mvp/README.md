# vidIQ Benzeri MVP İskeleti

Bu klasör, YouTube odaklı bir "vidIQ benzeri" ürün için ilk çalışan backend iskeletini içerir.

## Kapsam (MVP)

- Video SEO skorlaması
- Anahtar kelime fırsat puanı
- Kanal/video metrikleri için temel veri modeli
- Öneri endpoint'i

## Hızlı Başlangıç

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r vidiq_mvp/requirements.txt
uvicorn vidiq_mvp.app.main:app --reload
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
