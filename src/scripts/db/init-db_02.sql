CREATE TABLE IF NOT EXISTS licenses (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  token_id NUMERIC NOT NULL UNIQUE,
  owner VARCHAR(100) NOT NULL,
  client_id  VARCHAR(100) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP
);