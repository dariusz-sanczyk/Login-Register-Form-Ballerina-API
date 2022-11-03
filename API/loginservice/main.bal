import ballerina/http;

public type User record {|
    int id?;
    string email;
    string password;
|};

public type LoginData record {|
    string email;
    string password;
|};

public type Email record {|
    string email;
|};

User[] users = [
        {id: 1, email: "johndoe@gmail.com", password: "Johndoe1"},
        {id: 2, email: "johncarmack@gmail.com", password: "Johncarmack1"},
        {id: 3, email: "johnromero@gmail.com", password: "Johnromero1"}
    ];

int NEW_ID = users.length();

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: false,
        allowHeaders: ["Access-Control-Allow-Origin", "Content-Type"]

    }
}

service / on new http:Listener(7070) {

    resource function get users() returns User[] {
        return users;
    }

    resource function get users/[int id]() returns User|http:NotFound {
        foreach User user in users {
            if user.id == id {
                return user;
            }
        }
        return http:NOT_FOUND;
    }

    resource function post users(@http:Payload User user) returns http:Created {
        NEW_ID += 1;
        user.id = NEW_ID;

        users.push(user);
        return http:CREATED;
    }

    resource function post users/resetPassword(@http:Payload Email emailData) returns http:Accepted|http:BadRequest {
        foreach User user in users {
            if user.email == emailData.email {
                return http:ACCEPTED;
            }
        }
        return http:BAD_REQUEST;
    }
    resource function post auth/login(@http:Payload LoginData data) returns http:Ok|http:Unauthorized {
        foreach User user in users {
            if user.email == data.email && user.password == data.password {
                return http:OK;
            }
        }
        return http:UNAUTHORIZED;
    }

}

