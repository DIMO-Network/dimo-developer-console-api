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
  deleted_at TIMESTAMP,
  CONSTRAINT fk_company
      FOREIGN KEY(company_id) 
        REFERENCES companies(id)
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
  deleted_at TIMESTAMP,
  CONSTRAINT fk_company
      FOREIGN KEY(company_id) 
        REFERENCES companies(id),
  CONSTRAINT fk_workspace
      FOREIGN KEY(workspace_id) 
        REFERENCES workspaces(id)
);

CREATE TABLE IF NOT EXISTS redirect_uris (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  uri VARCHAR(150) NOT NULL,
  app_id VARCHAR(36) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  status BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_company
      FOREIGN KEY(company_id) 
        REFERENCES companies(id),
  CONSTRAINT fk_app
      FOREIGN KEY(app_id) 
        REFERENCES apps(id)
);

CREATE TABLE IF NOT EXISTS signers (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  api_key VARCHAR(100) NOT NULL,
  app_id VARCHAR(36) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_company
      FOREIGN KEY(company_id) 
        REFERENCES companies(id),
  CONSTRAINT fk_app
      FOREIGN KEY(app_id) 
        REFERENCES apps(id)
);