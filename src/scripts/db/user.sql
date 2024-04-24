CREATE TABLE IF NOT EXISTS Users (
  id VARCHAR(250) PRIMARY KEY NOT NULL,
  name VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  auth VARCHAR(15) NOT NULL,
  role VARCHAR(50) NOT NULL,
  company_name VARCHAR(120),
  company_website VARCHAR(120),
  company_region VARCHAR(120),
  team VARCHAR(100),
  crm_id VARCHAR(250),
  refresh_token VARCHAR(250),
  refresh_token_expiration TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP
)