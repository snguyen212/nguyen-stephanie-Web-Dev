//UPDATED

//factory allows you to create services
//service is where you find, update, remove any data


//MOVE everything to SERVICE side -----

(function () {
    angular
        .module("jamn")
        .factory("UserService", UserService);

    // $http allows you to interact with SERVER
    function UserService($http) {
        
       
        

        var api = {
            login: login,
            createUser: createUser,
            logout: logout,
            checkLoggedIn: checkLoggedIn,
            register: register, //registers creates user AND logs you in
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;
        
        //LOGIN -------------------------------------
        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
            
        }
        
        function checkLoggedIn() {
            return $http.get("/api/loggedin");
        }
        
        function register(username, password) {
            var url = "api/register";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
            
        }
        
        function logout() {
           return $http.post("/api/logout");
        }

        // CREATE USER ----------------------------------------
        function createUser(username, password) {
            var url = "/api/user";
            var newUser = {
                username: username,
                password: password
            };
            return $http.post(url, newUser);

        }

        // UPDATE USER --------------------------------------

        function updateUser(id, newUser) {
            // /api/user/:userId is the URL we want from the assignment
            var url = "/api/user/" + id;
            //generate PUT
            //newUser contains info (name, user, pw) of new user
            return $http.put(url, newUser);
        }

       

        //DELETE USER -----------------------------------
            
//         //will iterate over the id,find the id and delete it
            function deleteUser(id) {
                var url = "/api/user" + id;
                return $http.delete(url);
            }

        

            //find user by username and password function -------------------------
            function findUserByUsernameAndPassword(username, password) {
                var url = "/api/user?username=" + username + "&password=" + password;
                return $http.get(url);
            }

            function findUserByUsername(username) {
                var url = "/api/user?username=" + username;
                return $http.get(url);
            }
        

            function findUserById(id) {
                var url = "/api/user/" + id;
                return $http.get(url);

            }

            
        }
})();