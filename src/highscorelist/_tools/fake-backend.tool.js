const state = JSON.parse(
  '{"seasons":{"byId":{"season1":{"id":"season1","title":"Season 1","races":["season1_race1","season1_race2","season1_race3"]},"season2":{"id":"season2","title":"Season 2","races":["season2_race1","season2_race2","season2_race3"]},"season3":{"id":"season3","title":"Season 3","races":[]}},"order":["season1","season2","season3"]},"races":{"season1_race1":{"id":"season1_race1","season_id":"season1","title":"Race 1 (Season 1)","results":["season1_race1_result1","season1_race1_result2","season1_race1_result3","season1_race1_result4"]},"season1_race2":{"id":"season1_race2","season_id":"season1","title":"Race 2 (Season 1)","results":["season1_race2_result1","season1_race2_result2","season1_race2_result3","season1_race2_result4"]},"season1_race3":{"id":"season1_race3","season_id":"season1","title":"Race 3 (Season 1)","results":["season1_race3_result1","season1_race3_result2","season1_race3_result3","season1_race3_result4"]},"season2_race1":{"id":"season2_race1","season_id":"season2","title":"Race 1 (Season 2)","results":["season2_race1_result1","season2_race1_result2","season2_race1_result3","season2_race1_result4"]},"season2_race2":{"id":"season2_race2","season_id":"season2","title":"Race 2 (Season 2)","results":["season2_race2_result1","season2_race2_result2","season2_race2_result3","season2_race2_result4"]},"season2_race3":{"id":"season2_race3","season_id":"season2","title":"Race 3 (Season 2)","results":["season2_race3_result1","season2_race3_result2","season2_race3_result3","season2_race3_result4"]}},"results":{"season1_race1_result1":{"id":"season1_race1_result1","race_id":"season1_race1","name":"Quaese","time":310123,"time_string":"05:10:123"},"season1_race1_result2":{"id":"season1_race1_result2","race_id":"season1_race1","name":"Pichel","time":305456,"time_string":"05:05:456"},"season1_race1_result3":{"id":"season1_race1_result3","race_id":"season1_race1","name":"q","time":307789,"time_string":"05:07:789"},"season1_race1_result4":{"id":"season1_race1_result4","race_id":"season1_race1","name":"p","time":180012,"time_string":"03:00:012"},"season1_race2_result1":{"id":"season1_race2_result1","race_id":"season1_race2","name":"Quaese","time":310123,"time_string":"05:10:123"},"season1_race2_result2":{"id":"season1_race2_result2","race_id":"season1_race2","name":"Pichel","time":305456,"time_string":"05:05:456"},"season1_race2_result3":{"id":"season1_race2_result3","race_id":"season1_race2","name":"q","time":307789,"time_string":"05:07:789"},"season1_race2_result4":{"id":"season1_race2_result4","race_id":"season1_race2","name":"p","time":180012,"time_string":"03:00:012"},"season1_race3_result1":{"id":"season1_race3_result1","race_id":"season1_race3","name":"Quaese","time":310123,"time_string":"05:10:123"},"season1_race3_result2":{"id":"season1_race3_result2","race_id":"season1_race3","name":"Pichel","time":305456,"time_string":"05:05:456"},"season1_race3_result3":{"id":"season1_race3_result3","race_id":"season1_race3","name":"q","time":307789,"time_string":"05:07:789"},"season1_race3_result4":{"id":"season1_race3_result4","race_id":"season1_race3","name":"p","time":180012,"time_string":"03:00:012"},"season2_race1_result1":{"id":"season2_race1_result1","race_id":"season2_race1","name":"Quaese","time":310123,"time_string":"05:10:123"},"season2_race1_result2":{"id":"season2_race1_result2","race_id":"season2_race1","name":"Pichel","time":305456,"time_string":"05:05:456"},"season2_race1_result3":{"id":"season2_race1_result3","race_id":"season2_race1","name":"q","time":307789,"time_string":"05:07:789"},"season2_race1_result4":{"id":"season2_race1_result4","race_id":"season2_race1","name":"p","time":180012,"time_string":"03:00:012"},"season2_race2_result1":{"id":"season2_race2_result1","race_id":"season2_race2","name":"Quaese","time":310123,"time_string":"05:10:123"},"season2_race2_result2":{"id":"season2_race2_result2","race_id":"season2_race2","name":"Pichel","time":305456,"time_string":"05:05:456"},"season2_race2_result3":{"id":"season2_race2_result3","race_id":"season2_race2","name":"q","time":307789,"time_string":"05:07:789"},"season2_race2_result4":{"id":"season2_race2_result4","race_id":"season2_race2","name":"p","time":180012,"time_string":"03:00:012"},"season2_race3_result1":{"id":"season2_race3_result1","race_id":"season2_race3","name":"Quaese","time":310123,"time_string":"05:10:123"},"season2_race3_result2":{"id":"season2_race3_result2","race_id":"season2_race3","name":"Pichel","time":305456,"time_string":"05:05:456"},"season2_race3_result3":{"id":"season2_race3_result3","race_id":"season2_race3","name":"q","time":307789,"time_string":"05:07:789"},"season2_race3_result4":{"id":"season2_race3_result4","race_id":"season2_race3","name":"p","time":180012,"time_string":"03:00:012"}}}'
);

export function configureFakeBackend() {
  let realFetch = window.fetch;

  window.fetch = function(url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate
        if (url.endsWith("/highscore/state") && opts.method === "POST") {
          // get parameters from post request
          // let params = JSON.parse(opts.body);

          if (new Date().getTime() > 1) {
            let responseJson = {};
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson))
            });
          } else {
            // else return error
            reject("Error message");
          }

          return;
        }

        // get state for highscore
        if (url.endsWith("/highscore/state") && opts.method === "GET") {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (new Date().getTime() > 1) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(state))
            });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        /*
        // get user by id
        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter(user => {
              return user.id === id;
            });
            let user = matchedUsers.length ? matchedUsers[0] : null;

            // respond 200 OK with user
            resolve({ ok: true, text: () => JSON.stringify(user) });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // register user
        if (url.endsWith("/users/register") && opts.method === "POST") {
          // get new user object from post body
          let newUser = JSON.parse(opts.body);

          // validation
          let duplicateUser = users.filter(user => {
            return user.username === newUser.username;
          }).length;
          if (duplicateUser) {
            reject('Username "' + newUser.username + '" is already taken');
            return;
          }

          // save new user
          newUser.id = users.length
            ? Math.max(...users.map(user => user.id)) + 1
            : 1;
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));

          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });

          return;
        }

        // delete user
        if (url.match(/\/users\/\d+$/) && opts.method === "DELETE") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
              if (user.id === id) {
                // delete user
                users.splice(i, 1);
                localStorage.setItem("users", JSON.stringify(users));
                break;
              }
            }

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }
*/
        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}
