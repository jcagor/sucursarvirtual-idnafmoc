#!/bin/sh

CONTAINER_ALREADY_STARTED="./dist/RANN_CONTAINER_STARTED"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then    
    echo "-- First container startup --"
    # run on first start only
    echo "Migrate database"
    sleep 5 # await db full start.
    npx prisma migrate dev && touch $CONTAINER_ALREADY_STARTED
else
    echo "-- Not first container startup --"
fi

echo "Start production service"
npm --max_old_space_size=1024 run start
