CREATE TABLE IF NOT EXISTS user_agents (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    owner_id VARCHAR(36) NOT NULL,
    agent_name VARCHAR(150) NOT NULL,
    fleet_mode BOOLEAN DEFAULT FALSE,
    vehicle_ids TEXT[] NULL,

    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,

     CONSTRAINT user_fk
        FOREIGN KEY(owner_id)
            REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_agent_tools(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    user_agent_id VARCHAR(36) NOT NULL,
    tool_id VARCHAR(36) NOT NULL,
    uses_own_credentials BOOLEAN DEFAULT FALSE,
    credential_schema JSONB NULL,

    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,

     CONSTRAINT user_agent_fk
        FOREIGN KEY(user_agent_id)
            REFERENCES user_agents(id),

     CONSTRAINT tool_fk
        FOREIGN KEY(tool_id)
            REFERENCES tools(id)
);