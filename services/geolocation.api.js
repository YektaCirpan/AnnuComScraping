const axios = require('axios')
require('dotenv').config()


const getAddress = (lat, lon) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.key}`).then(res => {
			resolve(res.data.results[0].formatted)
		}).catch(err => {
			reject(err)
		})	
	})		  
}


module.exports = { getAddress }