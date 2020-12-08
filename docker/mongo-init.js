db.createUser(
    {
        user: "cms",
        pwd: "cmsPass",
        roles: [
            {
                role: "readWrite",
                db: "cms"
            }
        ]
    }
);