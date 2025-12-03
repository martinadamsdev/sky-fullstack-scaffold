#!/usr/bin/env bash

set -e

echo "🚀 Shalom Monorepo Setup Script"
echo "================================"
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed"
    echo "Please install Bun first: https://bun.sh"
    exit 1
fi

echo "✅ Bun is installed: $(bun --version)"
echo ""

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed"
    echo "Docker is optional but recommended for local development"
    echo "Install Docker: https://www.docker.com"
    echo ""
else
    echo "✅ Docker is installed: $(docker --version)"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
bun install
echo "✅ Dependencies installed"
echo ""

# Copy environment files
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env file to configure your environment"
else
    echo "✅ .env file already exists"
fi
echo ""

# API environment
if [ ! -f apps/api/.env ]; then
    echo "📝 Creating apps/api/.env file..."
    cp apps/api/.env.example apps/api/.env
    echo "✅ apps/api/.env file created"
else
    echo "✅ apps/api/.env file already exists"
fi
echo ""

# Web environment
if [ ! -f apps/web/.env ]; then
    echo "📝 Creating apps/web/.env file..."
    cp apps/web/.env.example apps/web/.env
    echo "✅ apps/web/.env file created"
else
    echo "✅ apps/web/.env file already exists"
fi
echo ""

# Admin environment
if [ ! -f apps/admin/.env ]; then
    echo "📝 Creating apps/admin/.env file..."
    cp apps/admin/.env.example apps/admin/.env
    echo "✅ apps/admin/.env file created"
else
    echo "✅ apps/admin/.env file already exists"
fi
echo ""

# Mobile environment
if [ ! -f apps/mobile/.env ]; then
    echo "📝 Creating apps/mobile/.env file..."
    cp apps/mobile/.env.example apps/mobile/.env
    echo "✅ apps/mobile/.env file created"
else
    echo "✅ apps/mobile/.env file already exists"
fi
echo ""

# Start Docker services if available
if command -v docker &> /dev/null; then
    echo "🐳 Starting Docker services..."
    cd packages/deployment
    docker-compose up -d postgres redis
    cd ../..
    echo "✅ Docker services started"
    echo ""

    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    sleep 5
    echo "✅ Database should be ready"
    echo ""

    # Run migrations
    echo "🔄 Running database migrations..."
    bun db:migrate
    echo "✅ Migrations completed"
    echo ""
fi

echo "✨ Setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit .env files to configure your environment"
echo "2. Run 'bun dev' to start all services"
echo "3. Or run specific services:"
echo "   - bun dev:api    (API service at http://localhost:3000)"
echo "   - bun dev:web    (Web frontend at http://localhost:3001)"
echo "   - bun dev:admin  (Admin dashboard at http://localhost:3002)"
echo "   - bun dev:mobile (Mobile H5 at http://localhost:3003)"
echo ""
echo "Happy coding! 🎉"
