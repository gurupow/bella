-- Core entities
CREATE TABLE IF NOT EXISTS channels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  channel_id TEXT NOT NULL REFERENCES channels(id),
  title TEXT NOT NULL,
  description TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS video_metrics_daily (
  video_id TEXT NOT NULL REFERENCES videos(id),
  metric_date DATE NOT NULL,
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  watch_time_minutes DOUBLE PRECISION DEFAULT 0,
  ctr DOUBLE PRECISION,
  retention_rate DOUBLE PRECISION,
  PRIMARY KEY (video_id, metric_date)
);

CREATE TABLE IF NOT EXISTS keywords (
  id TEXT PRIMARY KEY,
  keyword TEXT NOT NULL UNIQUE,
  language TEXT DEFAULT 'tr'
);

CREATE TABLE IF NOT EXISTS keyword_scores (
  keyword_id TEXT NOT NULL REFERENCES keywords(id),
  score_date DATE NOT NULL,
  search_volume DOUBLE PRECISION NOT NULL,
  competition DOUBLE PRECISION NOT NULL,
  opportunity_score DOUBLE PRECISION NOT NULL,
  PRIMARY KEY (keyword_id, score_date)
);
