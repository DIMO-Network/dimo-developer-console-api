CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  auth VARCHAR(15) NOT NULL,
  role VARCHAR(50) NOT NULL,
  build_for VARCHAR(50),
  build_for_text VARCHAR(150),
  company_name VARCHAR(120),
  company_website VARCHAR(120),
  company_region VARCHAR(120),
  team VARCHAR(100),
  crm_id VARCHAR(100),
  refresh_token VARCHAR(250),
  refresh_token_expiration TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teams (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(150) NOT NULL,
  created_by VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_user
      FOREIGN KEY(created_by) 
        REFERENCES users(id)
);