# mvp_project


# ERD Link

https://lucid.app/lucidchart/697dc1d0-813b-4faa-adcb-4bf7f54c361c/edit?viewport_loc=-187%2C-11%2C2219%2C1065%2C0_0&invitationId=inv_432522a5-afdf-4cdf-8408-b898456681eb

# Wireframe Link

https://lucid.app/lucidchart/ebf4e5c1-c767-488d-9756-dbf9cb2d063a/edit?viewport_loc=-248%2C-21%2C3245%2C1558%2CuP1BopAARZY8&invitationId=inv_56e3480e-a17e-45c4-a4f6-f147ea1e718a

# edit package.json
package.json
    "main": "app.js",
    "scripts": {
        "start": "nodemon server.js", //edit this
        "start:production": "node server.js",//edit this
        "start:dev": "NODE_ENV=dev nodemon server.js",//edit this
        "start:test": "NODE_ENV=test nodemon server.js"  //edit this
    },
    "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.16.1",
        "pg": "^8.8.0"
    }

# connect remote database to docker desktop
-take URL from PSQL Command
Looks like this:
    PGPASSWORD=hWHWAr2tLBe5DCmRixzkcbhjbYKh02Fb psql -h dpg-cdmmtfun6mppacsvd6bg-a.oregon-postgres.render.com -U mvp_db_6e1s_user mvp_db_6e1s

Then open a docker container and Run it
EXAMPLE : jonathan@DESKTOP-8IV1IMO:~$ docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
//c25f345df8231e4da00dd645217b2f85b6f5735e27e3c8a735d2680be378a62f

jonathan@DESKTOP-8IV1IMO:~$ docker exec -it c bash

Then run the psql command
root@c25f345df823:/# PGPASSWORD=hWHWAr2tLBe5DCmRixzkcbhjbYKh02Fb psql -h dpg-cdmmtfun6mppacsvd6bg-a.oregon-postgres.render.com -U mvp_db_6e1s_user mvp_db_6e1s

//psql (15.0 (Debian 15.0-1.pgdg110+1))
//SSL connection (protocol: TLSv1.3, cipher: TLS_AES_128_GCM_SHA256, compression: off)
//Type "help" for help.

mvp_db_6e1s=>

# Render Steps for Backend
-create and name database ex: school_db
-don't need to specify username/password,etc. just the database name
-save external database URL //this will be used for the POSTGRES_CONNECTION_STRING environmental variable in the school-api-server

-create school-api-server (Web Service)
-set root directory to file containing server.js

# Render steps for frontend
-Create new Static Site
-for the settings
    -set publish directory to the folder containing the index.html file
    -leave everything else blank
    -don't forget the app.js server that launches the static site