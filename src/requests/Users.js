

// const userData =[
//     {
//         "id": 85,
//         "name": "Ashiqur Rahman",
//         "username": "XLR8",
//         "email": "joy@gmail.com",
//         "address": {
//           "street": "Gazipur",
//           "suite": "Apt. 420",
//           "city": "BoardBazar",
//           "zipcode": "1216",
//           "geo": {
//             "lat": "-37.3159",
//             "lng": "81.1496"
//           }
//         },
//         "phone": "01521430135",
//         "website": "heheh.com",
//         "company": {
//           "name": "IUT",
//           "catchPhrase": "ANYWAY",
//           "bs": "Bujha gelo ki?"
//         }
//     }
// ]
// const getUsers= () =>{
//     return userData;
// }

// export { getUsers };

import { JPClient } from "./../clients/JPClient";

const user_endpoint = "/users";
const getUsers = () => {
  return JPClient.get(user_endpoint);
};

export { getUsers };