const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs //chained calls indentation
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Provide your geographical address',
			string: true //always parse the address as a string
		} 
	})
	.help()
	.alias('help', 'h')
	.argv;

geocode.extractGeocodeAddress(argv.address, (errorMsg, geocodeRes) => {
	if (errorMsg){
		console.log(errorMsg);
	} else {
		weather.retrieveWeather(geocodeRes.latitude, geocodeRes.longitude, (errorMsg, weatherRes) => {
			if (errorMsg) {
				console.log(errorMsg);
			} else {
				console.log(`\nThe temperature in '${geocodeRes.address}' is currently ${weatherRes.temperature}°F, although it feels like ${weatherRes.apparentTemperature}°F.\n`);
				// console.log(JSON.stringify(weatherRes, undefined, 2)); //2nd args => to filter properties, not needed in this case, 3rd for formatting with spaces
			}
		});
	}
}); 
