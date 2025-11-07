CREATE TABLE IF NOT EXISTS configurations(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    configuration_name VARCHAR(255) NOT NULL,
    owner_id VARCHAR(36) NOT NULL,
    client_id VARCHAR(36) NOT NULL,
    configuration JSONB NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,

    CONSTRAINT owner_fk
        FOREIGN KEY(owner_id)
            REFERENCES users(id)
);