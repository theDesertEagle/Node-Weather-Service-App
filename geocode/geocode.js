const request = require('request');

// const apiKeyValue = 'googleAPIKey'; 

var extractGeocodeAddress = (userAddress, callback) => {
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(userAddress)}&key=${apiKeyValue}`,
		json: true //json object coming from http request sent to google geolocation api => this converts json to js obj
	}, (error, response, body) => {
	// machine errors + google server errors handling
		if (error){
			callback('<ERROR> Unable to connect to Gooogle Servers');
		} else if (body.status == 'ZERO_RESULTS'){
			callback('<ERROR> Unable to find the given geographical address');
		} else if (body.status == 'OK'){
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
};

module.exports.extractGeocodeAddress = extractGeocodeAddress;
