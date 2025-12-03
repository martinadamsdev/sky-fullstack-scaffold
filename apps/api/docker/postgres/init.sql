-- PostgreSQL initialization script for Shalom API
-- This script runs automatically when the container is first created

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create database if not exists (usually already created by POSTGRES_DB env var)
-- But we can create additional databases here if needed

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Database initialized successfully';
END $$;
