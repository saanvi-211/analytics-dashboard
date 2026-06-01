CREATE DATABASE IF NOT EXISTS analytics_db;
USE analytics_db;

CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(255) NOT NULL,
  role          ENUM('admin','manager','analyst','viewer') DEFAULT 'viewer',
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

CREATE TABLE metrics (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  category    VARCHAR(100) NOT NULL,
  unit        VARCHAR(50),
  description TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category)
);

CREATE TABLE metric_values (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  metric_id      INT NOT NULL,
  value          DECIMAL(15,4) NOT NULL,
  previous_value DECIMAL(15,4),
  recorded_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (metric_id) REFERENCES metrics(id) ON DELETE CASCADE,
  INDEX idx_metric_time (metric_id, recorded_at)
);

CREATE TABLE user_events (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT,
  event_type VARCHAR(100) NOT NULL,
  properties JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_type_time (event_type, created_at),
  INDEX idx_user_id (user_id)
);

INSERT INTO metrics (name, category, unit) VALUES
  ('Monthly Revenue', 'revenue', 'USD'),
  ('Daily Active Users', 'engagement', 'users'),
  ('Conversion Rate', 'sales', 'percent'),
  ('Customer Acquisition Cost', 'marketing', 'USD'),
  ('Net Promoter Score', 'satisfaction', 'score'),
  ('Churn Rate', 'retention', 'percent'),
  ('Average Order Value', 'revenue', 'USD'),
  ('Page Load Time', 'performance', 'ms'),
  ('Support Resolution Time', 'support', 'hours'),
  ('Session Duration', 'engagement', 'seconds');
