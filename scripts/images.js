import { join, extname, parse } from 'path';
import { existsSync, lstatSync, readdirSync, writeFileSync } from 'fs';
import imageThumbnail from 'image-thumbnail';

const imageExtensions = ['.png']; // do not include jpeg or jpg
const newFormat = '.jpeg';
const jpegOptions = { force: true, quality: 80 };

const _options = { percentage: 30, jpegOptions };
const _rawTag = '-raw'; // removes whatever string is there
const _newTag = '-compressed'; // replaces with this

const inFolder = 'src/images';
const outFolder = 'static/images';

async function formatImage(path, pathOut = path, options = _options, newTag = _newTag, rawTag = _rawTag) {
  path = join(inFolder, path);
  pathOut = join(outFolder, pathOut);

  // get if directory
  if (!existsSync(path) || !lstatSync(path).isDirectory()) {
    console.error('not a valid directory');
    return;
  }

  // get image files
  const files = readdirSync(path).filter((file) => imageExtensions.includes(extname(file)));

  if (files.length == 0) {
    console.error('no images found!');
    return;
  }

  files.map(async (oldFile, i) => {
    try {
      const oldPath = join(path, oldFile);
      const newFile = `${parse(oldFile).name.replace(rawTag, newTag)}${newFormat}`;
      const newPath = join(pathOut, newFile);
      const isNew = existsSync(newPath);

      console.log(`input: ${oldFile}`);

      const thumbnail = await imageThumbnail(oldPath, options);
      writeFileSync(newPath, thumbnail);

      isNew ? console.log(`${newFile} exists... overwriting`) : console.log(`output: ${newFile}`);
    } catch (err) {
      console.error(err);
    }
  });
}

// this is *kind of* hacky but it will let me run multiple functions from the same file
const func = process.argv[2];
switch (func) {
  case 'compress':
    formatImage(process.argv[3], process.argv[4]); // arguments: pathIn, pathOut (assumed pathIn)
    break;
  case 'thumb':
    formatImage(
      process.argv[3], process.argv[4],
      { ..._options, percentage: 10, width: 300, height: 300, fit: 'cover' },
      '-thumb'
    ); // formatImage will error if null
    break;
}
