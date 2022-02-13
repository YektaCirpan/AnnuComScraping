const xlsx = require('xlsx')
const workbook = xlsx.readFile('./annuaire.xlsx')
let worksheet = workbook.Sheets[workbook.SheetNames[0]]



const getLineData = (line) => {
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

module.exports = {getLineData}