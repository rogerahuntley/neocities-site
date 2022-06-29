// returns basic info from neocities
import Neocities from 'neocities';
export const get = async () => {
  const data = await new Promise((resolve) => {
    const api = new Neocities();
    api.info('stealdog', (response) => {
      resolve(response);
    });
  });

  return {
    body: data
  };
};

// // returns data from neocities
// export const get = async () => {
//   let data = {};
//   await fetch('https://neocities.org/api/info?sitename=stealdog', {
//     credentials: 'include',
//     headers: {'Content-Type': 'application/json', },
//   })
//   .then(response => response.json())
//   .then(json => data = json)

//   return {
//     body: data
//   }
// }
