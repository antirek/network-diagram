#!/usr/bin/node

const image2base64 = require('image-to-base64');
const fs = require('fs');
const images = [
  {
    name: 'smartphone',
    file: 'images/black/smartphone.png',
  },
  {
    name: 'server',
    file: 'images/black/server.png',
  },
  {
    name: 'database',
    file: 'images/black/database.png',
  },
  {
    name: 'person',
    file: 'images/black/person.png',
  },
  {
    name: 'worker',
    file: 'images/black/worker.png',
  },
  {
    name: 'cloud',
    file: 'images/black/cloud.png',
  },
  {
    name: 'notebook',
    file: 'images/black/notebook.png',
  },
  {
    name: 'desktop',
    file: 'images/black/desktop.png',
  },
];

const cv = async function(image) {
  return {
    name: image.name,
    data: await image2base64(image.file),
  };
}

const run2 = async function () {
  let imagesData = [];
  for (const image of images){
    imagesData.push(await cv(image));
  }

  var stream = fs.createWriteStream("icons.js", {flags:'w'});
  stream.write('const icons = {\n');
  imagesData.map(image => {
    stream.write('  ' + image.name + ': ' + '"data:image/png;base64,' + image.data + '",\n');
  })
  stream.write('};\n');
  stream.end;
};

try {
  run2();
} catch (e) {
  console.log(e);
}