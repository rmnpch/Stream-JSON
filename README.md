# JSON Stream Processing
This project was created to parse large JSON files that hold location data from Google Maps Timeline History. 
Before processing and extracting the latitude and longitude positions from the data, the structure of the objects had to be determined. 
    The function keySet() takes an object or array and saves the keys of the the objects on a set. This set can be saved on a CSV file for further exploring
For the file `20240606 Timeline.csv` most objects had latitudeE7, longitudeE7 and timestamp properties that were extracted from each object. The values were concatenated on a string that would represent each line on the ultimate CSV file.
Once all the information has been extracted, the headers for the CSV are added using `unshift()`
The locations array is joined with a line break between the lines and the result can be saved as a CSV file.