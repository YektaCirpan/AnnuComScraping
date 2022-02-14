const xlsx = require('xlsx')

const loadFile = (filename) => {
	return new Promise((resolve, reject) =>{
		const workbook = xlsx.readFile(`./annuaires/${filename}.csv`)
		const worksheet = workbook.Sheets[workbook.SheetNames[0]]
		resolve({worksheet, workbook})
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


const getEmptyLineIndex = (worksheet) => {
	return Object.keys(worksheet).filter(a => a.match(/B/)).length + 1
}

const addLineData = (workbook, worksheet, data, line, filename) => {
	const {
		id, 
		lat,
		lon,
		houseNumber,
		address,
		postalCode,
		city
	} = data
	xlsx.utils.sheet_add_aoa(worksheet, [[`${id}`]], {origin: `A${line}`})
	xlsx.utils.sheet_add_aoa(worksheet, [[`${lat}`]], {origin: `B${line}`})
	xlsx.utils.sheet_add_aoa(worksheet, [[`${lon}`]], {origin: `C${line}`})
	xlsx.utils.sheet_add_aoa(worksheet, [[`${houseNumber}`]], {origin: `D${line}`})
	xlsx.utils.sheet_add_aoa(worksheet, [[`${address}`]], {origin: `E${line}`})
	xlsx.utils.sheet_add_aoa(worksheet, [[`${postalCode}`]], {origin: `F${line}`})
	xlsx.utils.sheet_add_aoa(worksheet, [[`${city}`]], {origin: `G${line}`})
	
	xlsx.writeFile(workbook, `./annuaires/${filename}.xlsx`);
}


module.exports = { loadFile, getLineData, getEmptyLineIndex, addLineData }