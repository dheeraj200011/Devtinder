DevTinder

1️⃣ Create an account
2️⃣ Login
3️⃣ Update your profile
4️⃣ Feed Page – explore
5️⃣ Send connection request
6️⃣ See our matches
7️⃣ See the requests we've sent/received
8️⃣ Update your profile

DevTinder API

# DevTinder APIs

// authRouter

- POST /signup : done
- POST /login : done
- POST /logout : done

// profile Router

- GET /profile/view : done
- PATCH /profile/edit : done
- PATCH /profile/password : done

// requestRouter

- POST /request/send/:status/:userId : done
- POST /request/review/:status/:requestId: done

// userrouter

- GET /user/connections : Done
- GET /user/requests : Done
- GET /user/feed - Gets you the profiles of other users on platform : Done

Status: ignore, interested, accepted, rejected
