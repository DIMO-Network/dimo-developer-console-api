CREATE TABLE IF NOT EXISTS connections (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  connection_license_public_key TEXT,
  connection_license_private_key TEXT,
  device_issuance_key TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_company
      FOREIGN KEY(company_id) 
        REFERENCES companies(id)
); 