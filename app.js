// const AxiosService = require('./axios')
const ProcessQueueService = require('./queue')
const axios = require('axios')
const cheerio = require('cheerio');
const qs = require('qs');
const processQueue = new ProcessQueueService();
const { loadFile, getLineData } = require('./utils/readExcel');
const { getAddress } = require('./services/geolocation.api');

const headers = {
    'Connection': 'keep-alive', 
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"', 
    'Accept': '*/*', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'X-Requested-With': 'XMLHttpRequest', 
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36', 
    'Sec-Fetch-Dest': 'empty'
};

const AnnuCom = require('./annu.com.js');

(async() => {

    const request = {
        url: "https://www.annu.com/includes/resultats.php",
        data: qs.stringify(
            {
                'q': 'rue+de+la+paix',
                'page': '1',
                'type': '1' 
            })
    }

    const { worksheet } = await loadFile('annuaire000')
    let line = 1

    while (true) {
        try {
            let { houseNumber, address, postalCode, city, lat, lon } = getLineData(worksheet, line)
            // il faut enlevé les accents et les ^
			if(!!houseNumber && !!address && !!postalCode && !!city) {
				request.data = qs.stringify({
					'q': `${houseNumber} ${address} ${postalCode} ${city}`,
					'page': '1',
					'type': '1' 
				});

				request.position = { houseNumber, address, postalCode, city, lat, lon }

			} else {
				const address = await getAddress(lat, lon)
				request.data = qs.stringify({
					'q': address,
					'page': '1',
					'type': '1' 
				});

				request.position = { address, lat, lon }

			}
			
            processQueue.push(request);
            if(line === 20) break;
            line++; 
        } catch (error) {
            console.log(error)
            break;
        }
    }

    let i = 0
    while(processQueue.count()) {
        console.log(i, "-- started")
        const { url, data, position } = processQueue.get()[i]
        const response = await axios({ method: "post", url, data, headers })
        console.log(response.data)
        const cheerioParsedData = cheerio.load(response.data)
        const client = new AnnuCom(cheerioParsedData, position)
        client.id = 1
        console.log(client)
        console.log(client.toCsv)
        console.log(i, "-- finished")
        i++
        processQueue.pop()
    }

    console.log('imhere')

    // const { url, data } = processQueue.get()[0]


    // for (let i = 0; i < 1; i++) {
    //     console.log(i, "-- started")
    //     const response = await axios({ method: "post", url, data, headers })
    //     const cheerioParsedData = cheerio.load(response.data)
    //     const client = new AnnuCom(cheerioParsedData)
    //     client.id = 1
    //     console.log(client)
    //     console.log(client.toCsv)
    //     console.log(i, "-- finished")
    // }
})();
