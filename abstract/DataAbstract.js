class DataDto {

    id

    nom

    prenom

    numTel

    latitude

    longitude

    adresse

    codePostal

    ville

    get toCsv() {
        return `"${this.id}";"${this.nom}";"${this.prenom}";"${this.numTel}";"${this.latitude}";"${this.longitude}";"${this.adresse}";"${this.codePostal}";"${this.ville}";`
    }

}

module.exports = DataDto