import axios from 'axios';

const fetchCommands = () => {
  const myResp = axios.get('/api/command/show/all').then((response) => console.log(response.data));
  // console.log(myResp.data);
  return myResp.data;
};

const data = fetchCommands();

export default data;

// [
//   {
//     id: 1,
//     commande: 'Shutdown',
//     description: 'Cette commande d eteindre l equipement'
//   }
// ];
