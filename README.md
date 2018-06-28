# Weather Service Node.js Application 
This quick and handy tool utilizes the Google Geolocation API coupled with the Forecast.io API to fetch the current temperature-data of a geographical address passed as an argument. Moreover, Javascript's latest ES6 features such as arrow functions, promises and template strings have been incorporated to design this application.

## Instructions
1. Install the module dependencies using the command: `npm install`
2. Run the application using either of the following commands: </br>
   - `node app.js --option geoGraphicalAddress` : Utilizes a modular callback-approach using the **request** module
   - `node app-promise.js --option geoGraphicalAddress` : Utilizes promise-supported **axios** module
3. The option argument flag, powered by the **yargs** module, is quite robust to the argument-format as mentioned above and can take the following possible values:
   - -a, --address : Provide your geographical address
   - -h, --help : Show the available commands
4. The geographical address can be a zip code, partial or complete street address. The closest match will be picked up for this service.
