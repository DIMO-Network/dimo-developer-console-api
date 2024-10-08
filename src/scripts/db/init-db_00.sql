CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  auth VARCHAR(15) NOT NULL,
  auth_login VARCHAR(100),
  avatar_url VARCHAR(250),
  role VARCHAR(50) NOT NULL,
  refresh_token VARCHAR(250),
  refresh_token_expiration TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(120) NOT NULL,
  website VARCHAR(120),
  region VARCHAR(120) NOT NULL,
  type VARCHAR(50) NOT NULL,
  build_for VARCHAR(50) NOT NULL,
  build_for_text VARCHAR(150),
  crm_id VARCHAR(100),
  created_by VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teams (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(150) NOT NULL,
  company_id VARCHAR(36) NOT NULL,
  created_by VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_user
      FOREIGN KEY(created_by) 
        REFERENCES users(id),
  CONSTRAINT fk_company
      FOREIGN KEY(company_id) 
        REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS team_collaborators (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  team_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_team
      FOREIGN KEY(team_id) 
        REFERENCES teams(id),
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
        REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS team_invitations (
  id VARCHAR(36) PRIMARY KEY NOT NULL,
  team_id VARCHAR(36) NOT NULL,
  email VARCHAR(36) NOT NULL,
  role VARCHAR(50) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  status VARCHAR(36) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_team
      FOREIGN KEY(team_id) 
        REFERENCES teams(id)
);