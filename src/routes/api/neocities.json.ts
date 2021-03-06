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