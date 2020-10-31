

// const postData =[
//     {
//     "userId": 1,
//     "id": 85,
//     "title": "Tasnim Ahmed",
//     "body": "At last I have seen something! Good Lord!"
//     }
// ]
// const getPosts = () => {
//     return postData;
//   };

// export { getPosts };

import { JPClient } from "./../clients/JPClient";

const post_endpoint = "/posts";
const getPosts = () => {
  return JPClient.get(post_endpoint);
};

export { getPosts };