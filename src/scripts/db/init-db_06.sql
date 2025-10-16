CREATE TABLE payment_receipts (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    receipt_link TEXT NOT NULL,
    owner_id VARCHAR(36) NOT NULL,
    beneficiary VARCHAR(100) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,

    CONSTRAINT owner_fk
        FOREIGN KEY(owner_id)
            REFERENCES users(id)
);
