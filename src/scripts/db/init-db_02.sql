CREATE TABLE IF NOT EXISTS workspaces (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  token_id NUMERIC NOT NULL UNIQUE,
  owner VARCHAR(100) NOT NULL,
  client_id  VARCHAR(100) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS apps (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  scope VARCHAR(36) NOT NULL,
  workspace_id VARCHAR(36) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP
);