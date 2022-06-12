// https://neocities.org/api/info?sitename=stealdog

// returns data from neocities
export const get = async () => {
  let data = {};
  await fetch('https://neocities.org/api/info?sitename=stealdog', {
    credentials: 'include',
    headers: {'Content-Type': 'application/json', },
  })
  .then(response => response.json())
  .then(json => data = json)

  return { 
    body: data
  }
}