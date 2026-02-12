ALTER TABLE team_collaborators ADD email VARCHAR(36) NULL;
ALTER TABLE team_collaborators ADD status VARCHAR(36) NOT NULL DEFAULT 'ACCEPTED';
ALTER TABLE team_collaborators ALTER COLUMN user_id DROP NOT NULL;

DROP TABLE team_invitations;