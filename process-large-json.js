const path = require('path');
const JSONStream = require('jsonstream');
const fs = require('fs');

const timelinePath = path.join(__dirname, 'Old Coordinates (JSON, CSV, Macro)/Timeline20240606.json');

// The keySet function will build a set of the unique keys present on the inputData object
const keySet = (inputData) => {
  const structureSet = new Set()
  if (Array.isArray(inputData)) {
    for (const obj of inputData) {
      const keySignature = Object.keys(obj).sort().join(',')
      structureSet.add(keySignature)
    }
  }
  else if (typeof inputData === 'object') {
    const keySignature = Object.keys(inputData).sort().join(',')
    structureSet.add(keySignature)
  } else {
    console.log('Input data is neither an array nor an object')
  }
  console.log(structureSet)
  // The line below creates a CSV file listing the keys present on the objects. They will help understand how to extract the values present on the objects
  // fs.writeFileSync('result.csv', [...structureSet].join('\n'));

}


const stream = fs.createReadStream(timelinePath, { encoding: 'utf8' })
  .pipe(JSONStream.parse('*')) // Adjust this based on your JSON structure
  .on('data', (data) => {
    // Before start working on the data, use keySet to understand the format of the objects
    // keySet(data)
    // Use only objects that have the latitude property
    const filtered = data.filter(element => element.latitudeE7)
    // Mapping the filtered array to grab only the spatial coordinates and timestamp and return it as a string
    // The element that comes after the timestamp helps trace back where the data came from, ie. the file TimelineYYYYMMDD.json
    const locations = filtered.map(({ latitudeE7, longitudeE7, timestamp }) => {
      return `${latitudeE7 / 10 ** 7},${longitudeE7 / 10 ** 7},${timestamp}, Timeline20240606.json`
    })
    // Add what will ultimately be the headers of the CSV file
    locations.unshift('latitude, longitude, timestamp, origin')
    // Save the data as CSV and adding a line break between the array elements
    fs.writeFileSync('result.csv', locations.join('\n'));

  }
  )
  .on('error', (err) => {
    console.error('Error:', err);
  })
  .on('end', (data) => {
    // console.log(data[1])
    console.log('Processing complete');
  });
