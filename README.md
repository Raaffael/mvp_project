# mvp_project


# ERD Link

https://lucid.app/lucidchart/697dc1d0-813b-4faa-adcb-4bf7f54c361c/edit?viewport_loc=-187%2C-11%2C2219%2C1065%2C0_0&invitationId=inv_432522a5-afdf-4cdf-8408-b898456681eb

# Wireframe Link

https://lucid.app/lucidchart/ebf4e5c1-c767-488d-9756-dbf9cb2d063a/edit?viewport_loc=-248%2C-21%2C3245%2C1558%2CuP1BopAARZY8&invitationId=inv_56e3480e-a17e-45c4-a4f6-f147ea1e718a


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



Render Steps
-create and name database ex: school_db
-don't need to specify username/password,etc. just the database name
-save external database URL //this will be used for the POSTGRES_CONNECTION_STRING environmental variable in the school-api-server

-create school-api-server (Web Service)
-set root directory to file containing server.js