// returns path exposed in json
export const toPublicPath = (localPath) => {
  return localPath.replace('../../posts/','').replace('.svx', '');
}

// uses public path to find local folder
export const toLocalPath = (publicPath) => {
  // this is sketchy but its statically rendered
  // so this function isn't exposed to the public
  // it makes a lot of assumptions and assumes safety

  // use param data to find file folder
  return `@/posts/${publicPath}.svx`;
}