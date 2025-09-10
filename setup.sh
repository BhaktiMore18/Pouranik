
#!/bin/bash
set -e

# Pouranik Project Full Setup Script
echo "\n🚀 Setting up Pouranik Project..."

# --- Node.js & npm ---
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Installing Node.js 18 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Installing npm..."
    sudo apt-get install -y npm
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node --version)"
    exit 1
fi
echo "✅ Node.js version: $(node --version)"

# --- MongoDB ---
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed. Installing MongoDB Community Edition..."
    # Detect Ubuntu version
    . /etc/os-release
    MONGO_UBUNTU_CODENAME=$VERSION_CODENAME
    if [ "$MONGO_UBUNTU_CODENAME" = "noble" ]; then
        echo "⚠️  MongoDB does not officially support Ubuntu 24.04 (noble) yet. Using Ubuntu 22.04 (jammy) repository as a workaround."
        MONGO_UBUNTU_CODENAME="jammy"
    fi
    # Import the public key used by the package management system
    if ! sudo apt-key list | grep -q "MongoDB 6.0 Release Signing Key"; then
        curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-6.0.gpg
    fi
    # Create the list file for MongoDB
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu $MONGO_UBUNTU_CODENAME/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    sudo apt-get update
    if ! sudo apt-get install -y mongodb-org; then
        echo "❌ Failed to install MongoDB. Please see https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/ for manual instructions."
        exit 1
    fi
    sudo systemctl enable mongod
    sudo systemctl start mongod
fi
echo "✅ MongoDB version: $(mongod --version | head -n1)"

# --- Backend dependencies ---
echo "\n📦 Installing backend dependencies..."
pushd backend > /dev/null
if [ -f package-lock.json ]; then
    npm ci
else
    npm install
fi
if [ -f package-lock.json ]; then
    npm audit fix || true
fi
popd > /dev/null

# --- Frontend dependencies ---
echo "\n📦 Installing frontend dependencies..."
pushd frontend > /dev/null
if [ -f package-lock.json ]; then
    npm ci
else
    npm install
fi
if [ -f package-lock.json ]; then
    npm audit fix || true
fi
popd > /dev/null

# --- .env files ---
if [ ! -f "backend/.env" ]; then
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo "✅ backend/.env created from example. Please review and update values."
    else
        echo "⚠️  Backend .env file not found and no example exists. Please create backend/.env manually."
    fi
else
    echo "✅ backend/.env exists."
fi

if [ ! -f "frontend/.env" ]; then
    if [ -f "frontend/.env.example" ]; then
        cp frontend/.env.example frontend/.env
        echo "✅ frontend/.env created from example. Please review and update values."
    else
        echo "⚠️  Frontend .env file not found and no example exists. Please create frontend/.env manually."
    fi
else
    echo "✅ frontend/.env exists."
fi

# --- Google Books API Key ---
echo "\n🔑 To use Google Books API, you need an API key."
if [ -n "$BROWSER" ]; then
    echo "Opening Google Cloud Console in your browser..."
    "$BROWSER" https://console.cloud.google.com/ || echo "(Could not open browser, please visit the URL manually.)"
else
    echo "(Set the BROWSER environment variable to auto-open links)"
    echo "Google Cloud Console: https://console.cloud.google.com/"
fi

# --- Final instructions ---
echo "\n✅ Project setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Review and update your environment variables in backend/.env and frontend/.env as needed."
echo "2. Start MongoDB: sudo systemctl start mongodb (or 'mongod' if running manually)"
echo "3. Start backend: cd backend && npm start"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
