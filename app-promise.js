const yargs = require('yargs');
const axios = require('axios');

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

const googleApiKeyValue = 'googleAPIKey'; 
const forecastApiKeyValue = 'forecastAPIKey';

geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}&key=${googleApiKeyValue}`;
var formattedAddress;

axios.get(geocodeURL).then((response) => {
	if (response.data.status == 'ZERO_RESULTS'){
		throw new Error('<ERROR> Unable to find the given address');
	}
	var latitude = response.data.results[0].geometry.location.lat;
	var longitude = response.data.results[0].geometry.location.lng;
	formattedAddress = response.data.results[0].formatted_address;
	weatherURL = `https://api.darksky.net/forecast/${forecastApiKeyValue}/${latitude},${longitude}`;
	return axios.get(weatherURL);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`\nThe temperature in '${formattedAddress}' is currently ${temperature}°F, although it feels like ${apparentTemperature}°F.\n`);	
}) .catch((e) => {
	if (e.code == 'ENOTFOUND'){
		console.log('<ERROR> Unable to connect to API Servers');
	} else {
		console.log(e.message);
	}
});