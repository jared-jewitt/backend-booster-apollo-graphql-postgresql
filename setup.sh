# Setup database host
if [ -n "$(grep database /etc/hosts)" ]
 then
  echo "database host already exists"
else
  sudo -- sh -c -e "echo 127.0.0.1'\t'database >> /etc/hosts";
fi

# Setup server host
if [ -n "$(grep server /etc/hosts)" ]
 then
  echo "server host already exists"
else
  sudo -- sh -c -e "echo 127.0.0.1'\t'server >> /etc/hosts";
fi

# Create .env.production.local file
cat > .env.production.local << EOF
APP_ENV=local
JWT_SECRET=PrettyShittySecret
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_USERNAME=admin
DATABASE_PASSWORD=password
DATABASE_NAME=prod
EOF

# Create .env.development.local file
cat > .env.development.local << EOF
APP_ENV=local
JWT_SECRET=PrettyShittySecret
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_USERNAME=admin
DATABASE_PASSWORD=password
DATABASE_NAME=dev
EOF

# Create .env.test.local file
cat > .env.test.local << EOF
APP_ENV=local
JWT_SECRET=PrettyShittySecret
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_USERNAME=admin
DATABASE_PASSWORD=password
DATABASE_NAME=test
EOF
