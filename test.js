const fs = require('fs');

const write = function(date, action){
    fs.appendFile('medicalLog.txt', date + action, (err) => 
        err ? console.log('error') : console.log('File successfuly updated.'));
}

class Doktor {
    constructor(ime, prezime, specijalnost, pacijenti){
        let date = new Date();
        new.target === Doktor ? write('[' 
        + (date.getDay() + 1) + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() 
        + ' ' + date.getHours() + ':' + date.getMinutes() + ']', 
        ' Kreiran doktor ' + '"' + ime + '"\n') : null;
        this._ime = ime;
        this._prezime = prezime;
        this._specijalnost = specijalnost;
        this._pacijenti = pacijenti;
    }

    set ime(ime){
        this._ime = ime;
    }

    set prezime(prezime){
        this._prezime = prezime;
    }

    set specijalnost(specijalnost){
        this._specijalnost = specijalnost;
    }

    set pacijenti(pacijenti){
        this._pacijenti = pacijenti;
    }

    get ime(){
        return this._ime;
    }

    get prezime(){
        return this._prezime;
    }

    get specijalnost(){
        return this._specijalnost;
    }

    get pacijenti(){
        return this._pacijenti;
    }

    zakaziPregled(pacijent, datum, tipPregleda){
        let pregled;
        if (tipPregleda === "pritisak"){
            pregled = {gornji:0, donji:0, puls:0};
        } else
            pregled = {vrednost:0, vremePoslednjegObroka:''};
        return {datum: '[' 
        + (datum.getDay() + 1) + '.' + (datum.getMonth() + 1) + '.' + datum.getFullYear() 
        + ' ' + datum.getHours() + ':' + datum.getMinutes() + ']', pacijent:pacijent, tipPregleda:tipPregleda, pregled:pregled}
    }
}

class Pacijent{
    constructor(ime, prezime, jmbg, brojZdravstvenogKartona){
        let date = new Date();
        new.target === Pacijent ? write('[' 
        + (date.getDay() + 1) + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() 
        + ' ' + date.getHours() + ':' + date.getMinutes() + ']', 
        ' Kreiran pacijent ' + '"' + ime + '"\n') : null;
        this._ime = ime;
        this._prezime = prezime;
        this._jmbg = jmbg;
        this._brojZdravstvenogKartona = brojZdravstvenogKartona;
        this._izabraniLekar = null;
    }

    set ime(ime){
        this._ime = ime;
    }

    set prezime(prezime){
        this._prezime = prezime;
    }

    set jmbg(jmbg){
        this._jmbg = jmbg;
    }

    set brojZdravstvenogKartona(brojZdravstvenogKartona){
        this._brojZdravstvenogKartona = brojZdravstvenogKartona;
    }

    get ime(){
        return this._ime;
    }

    get prezime(){
        return this._prezime;
    }

    get jmbg(){
        return this._jmbg;
    }

    get brojZdravstvenogKartona(){
        return this._brojZdravstvenogKartona;
    }

    izaberiLekara(lekar){
        let date = new Date();
        this._izabraniLekar = lekar;
        lekar.pacijenti.push(this._jmbg);
        write('[' 
        + (date.getDay() + 1) + '.' + (date.getMonth() + 1) + '.' 
        + date.getFullYear() + ' ' + date.getHours() + ':' 
        + date.getMinutes() + ']', ' Pacijent "' + this._ime 
        + '", bira lekara "' + lekar.ime + '"\n');
    }

    obaviPregled(pregled){
        let date = new Date();
        pregled.pregled = pregled.tipPregleda === 'pritisak' ? 
        'gornji:129, donji:98, puls:70}' : 
        'vrednost:2, vremePoslednjegObroka:"12:10"';
        
        write('[' 
        + (date.getDay() + 1) + '.' + (date.getMonth() + 1) + '.' 
        + date.getFullYear() + ' ' + date.getHours() + ':' 
        + date.getMinutes() + ']', ' Obavljen pregled ' + pregled.tipPregleda 
        + ', vrednosti: ' + pregled.pregled + '\n');
    }
}

var doktor1 = new Doktor("Dragan", "Draganic", "Nesto", []);
var pacijent1 = new Pacijent("Milan", "Milanovic", "0900665444333", 45);
pacijent1.izaberiLekara(doktor1);
var pregled1 = doktor1.zakaziPregled(pacijent1, new Date(), "pritisak");
var pregled2 = doktor1.zakaziPregled(pacijent1, new Date(), "secer");
pacijent1.obaviPregled(pregled1);
pacijent1.obaviPregled(pregled2);

