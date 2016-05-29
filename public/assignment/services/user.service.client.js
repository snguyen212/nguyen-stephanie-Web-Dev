

// //factory allows you to create services
// //service is where you find, update, remove any data

(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function updateUser(id, newUser) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        //IMPLEMENT CREATE USEr ----------------------- !!!!!!!!!!!!!!!!!!

        function createUser(user) {}

        // IMPLEMENT DELETE USERR -------------------!!!!!!!!!!!!!!!!!!
//         //will iterate over the id,find the id and delete it
        function deleteUser(id) {}


        //find user by username and password function -------------------------
        function findUserByUsernameAndPassword(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }
        function findUserById(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }

    }
})();