if [ ! -f ".env" ]; then
  echo "POSTGRES=\"Server=devps-app-postgres;Port=5432;Database=todo;User Id=todo;Password=MyPass01;\"" >> .env
fi

if [ ! -f "./front/.env" ]; then
  echo "VITE_BASE_URL=https://localhost:7153/api" >> ./front/.env
fi


docker compose up --build --remove-orphans --force-recreate -d

echo "Acesse: http://localhost:3000"