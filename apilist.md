# devtinder APIs

## authrouter
- post/signup
- post/login
- post/logout

## profilerouter
- Get/profile/ view
- patch/profile/ edit
- patch/profile/ password

## connectionrequestrouter
- post/request/send/intrested/:userid
- post/request/send/ignored/:userid
- post/request/review/:status/:requestId

- post/request/review/accepted/:requestId
- post/request/review/ rejected/:requestId

## userrouter
- get/connections
- get/requests/recived
- get/feed - gets you the profile of other users on platform


status:ignore, intrested, accepted, rejected