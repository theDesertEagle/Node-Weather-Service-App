const request = require('request');

// const apiKeyValue = 'ForecastAPIKey';

var retrieveWeather = (latitude, longitude, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${apiKeyValue}/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('<ERROR> Unable to connect to Forecast.io Servers');
		}
		else if (!error && response.statusCode == 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		} else {
			callback('<ERROR> Unable to fetch weather data for given address');
		}
	});
};

module.exports.retrieveWeather = retrieveWeather;
