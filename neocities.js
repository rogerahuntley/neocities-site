import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import Neocities from 'async-neocities';

const dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), 'build')

async function deploySite () {
  //const token = await Neocities.getKey('sitename', 'password')
  const token = process.env.NEOCITIES_API_KEY;
  const client = new Neocities(token)

  const report = await client.deploy(dirname, {cleanup: true, statsCb: (stats) => { console.log(`${stats.stage}: ${stats.status}`) }});
  console.log('\nsuccessfully uploaded', `\nfiles uploaded: ${report.filesToUpload.length}`, `\nfiles deleted: ${report.filesToDelete.length}`,`\nfiles skipped: ${report.filesSkipped.length}`);
}

// this is *kind of* hacky but it will let me run multiple functions from the same file
const func = process.argv[2];
switch(func){
  case 'deploy':
    deploySite();
    break;
}