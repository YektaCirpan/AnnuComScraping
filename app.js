// const AxiosService = require('./axios')
const ProcessQueueService = require('./queue')
const axios = require('axios')
const cheerio = require('cheerio');
const qs = require('qs');

const processQueue = new ProcessQueueService();
processQueue.push({
    url: "https://www.annu.com/includes/resultats.php",
    data: qs.stringify(
        {
            'q': 'rue+de+la+paix',
            'page': '2',
            'type': '1' 
        })
});

const { url, data } = processQueue.get()[0]
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
    for (let i = 0; i < 1; i++) {
        console.log(i, "-- started")
        const response = await axios({ method: "post", url, data, headers })
        const cheerioParsedData = cheerio.load(response.data)
        const client = new AnnuCom(cheerioParsedData)
        client.id = 1
        console.log(client)
        console.log(i, "-- finished")
    }
})();
