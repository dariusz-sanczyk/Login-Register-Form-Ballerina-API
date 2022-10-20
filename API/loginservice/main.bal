import ballerina/http;


public type UserData record {|
    int id?;
    string email;
    string password;
|};

public type LoginData record {|
    string email;
    string password;
|};

UserData[] users =  [
        {id: 1, email: "johndoe@gmail.com", password: "Johndoe1" },
        {id: 2, email: "johncarmack@gmail.com", password: "Johncarmack1" },
        {id: 3, email: "johnromero@gmail.com", password: "Johnromero1" }     
    ];

int NEW_ID = users.length();

service / on new http:Listener(7070) {
    resource function get users() returns UserData[] {
        return users;
    }

    resource function get users/[int id]() returns UserData|http:NotFound {
        foreach UserData user in users{
            if user.id == id {
                return user;
            }
        }
        return http:NOT_FOUND;
    }

    resource function post users(@http:Payload UserData user) returns http:Created {
        NEW_ID += 1;
        user.id = NEW_ID;  
        
        
        users.push(user);
        return http:CREATED;
    }

    resource function post users/resetPassword(@http:Payload  string email) returns http:Accepted|http:BadRequest {
        foreach UserData user in users{
            if user.email == email {
                return http:ACCEPTED;
            }
        }
        return http:BAD_REQUEST;
    }
    resource function post auth/login(@http:Payload LoginData data) returns http:Ok|http:Unauthorized {
        foreach UserData user in users{
            if user.email == data.email && user.password == data.password {
                return http:OK;
            }
        }
        return http:UNAUTHORIZED;
    }
        
}
