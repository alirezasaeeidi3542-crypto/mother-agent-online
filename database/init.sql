CREATE TABLE Agents (
    id SERIAL PRIMARY KEY,
    config JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    agent_id INT REFERENCES Agents(id),
    task JSONB,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Logs (
    id SERIAL PRIMARY KEY,
    agent_id INT REFERENCES Agents(id),
    log TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
