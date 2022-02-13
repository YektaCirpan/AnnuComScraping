const xlsx = require('xlsx')


const loadFile = (filename) => {
	return new Promise((resolve, reject) =>{
		const workbook = xlsx.readFile(`./annuaires/${filename}.xlsx`)
		const worksheet = workbook.Sheets[workbook.SheetNames[0]]
		resolve(worksheet)
	})
} 
const getLineData = (worksheet,line) => {

	return {
		id:  worksheet[`A${line}`].v,
		lat: worksheet[`B${line}`].v,
		lon: worksheet[`C${line}`].v,
		houseNumber: worksheet[`D${line}`].v,
		address: worksheet[`E${line}`].v,
		postalCode: worksheet[`F${line}`].v,
		city: worksheet[`G${line}`].v,

	}
}

module.exports = {loadFile, getLineData}