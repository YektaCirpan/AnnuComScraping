const DataAbstract = require('./abstract/DataAbstract')

class AnnuCom extends DataAbstract {
    

    constructor($, position) {
        super()
        this.extract($, position)
    }

    extract($, position) {

		if($.html().match(/Aucun particulier correspondant à votre recherche n'a été trouvé/gm)) {
			this.nom = ''
        	this.prenom = ''
        	this.numTel = ''
        	this.adresse = position?.address
        	this.codePostal = position?.postalCode
        	this.ville = position?.city
			this.latitude = position?.lat
			this.longitude = position?.lon
		} else {
			const fullName = $('.adr').text().trim().split('\n')[0].match(/[a-zA-Z -]+/gm)[0].trim().split(' ')
        	this.nom = fullName[0]
        	this.prenom = fullName[1]
        	this.numTel = $('.phone').text().trim().match(/\d\d \d\d \d\d \d\d \d\d/)[0].replace(/ /gm, '')
        	this.adresse = position?.address
        	this.codePostal = position?.postalCode
        	this.ville = position?.city
			this.latitude = position.lat
			this.longitude = position.lon
		}
        
    }



}

module.exports = AnnuCom