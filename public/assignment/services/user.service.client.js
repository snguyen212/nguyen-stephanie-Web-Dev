//UPDATED

//factory allows you to create services
//service is where you find, update, remove any data


//MOVE everything to SERVICE side -----

(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    // $http allows you to interact with SERVER
    function UserService($http) {

        // var users = [
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ];

        //server asks for requests and client sends response
        //if you don't ask for a specific user, we will assume u want all
        app.get("/allusers", function (request, response) {
            request.send(users)
        });

        //if you ask for JUST alice in URL, server will come back with
        //just alice
        //example:     local:3000/allusers/bob
        app.get("/allusers/:username", function (request, response) {
            var username = request.params['username'];
            for (var i in users) {
                if (users[i].username === username) {
                    reseponse.send(users[i]);
                }
            }
            //     request.send(users)
        });


        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,

            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function updateUser(id, newUser) {
            // /api/user/:userId is the URL we want from the assignment
            var url = "/api/user/" + id;
            //generate PUT
            //newUser contains info (name, user, pw) of new user
            $http.put(url, newUser);

            //move all this logic to SERVER side
            /*
             for(var i in users) {
             if(users[i]._id === id) {
             users[i].firstName = newUser.firstName;
             users[i].lastName = newUser.lastName;
             return true;
             }
             }
             return false;
             }
             */

            //IMPLEMENT CREATE USEr ----------------------- !!!!!!!!!!!!!!!!!!

            function createUser(user) {
            }

            //  -----------DELETE USER -------------DELETE USER -----------
            
//         //will iterate over the id,find the id and delete it
            function deleteUser(id) {
                var url = "/api/user" + id;
                return $http.delete(url);
            }


            //find user by username and password function -------------------------
            function findUserByUsernameAndPassword(username, password) {
                var url = "/api/user?username=" + username & "password=" + password;
                return $http.get(url);
            }

            function findUserById(id) {
                var url = "api/user/" + id;
                $http.get(url);

            }

            //     for(var i in users) {
            //         if(users[i]._id === id) {
            //             return users[i];
            //         }
            //     }
            //     return null;
            // }

        }
    }
})();