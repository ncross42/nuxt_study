-- Up
CREATE INDEX IDX_name ON users (name);

-- Down
DROP INDEX IDX_name;