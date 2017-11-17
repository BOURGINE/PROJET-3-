var compteurEltSec = document.getElementById("sec");
var compteurEltMin = document.getElementById("min");

// Diminue les secondes jusqu'à 0
function diminuerCompteur() {
    // Conversion en nombre du texte du compteur
    var compteurSec = Number(compteurEltSec.textContent);
    var compteurMin = Number(compteurEltMin.textContent);
    
    if (compteurMin > 0 || compteurSec > 0){
     
        if (compteurSec > 0) {
            compteurEltSec.textContent = compteurSec - 1;
        } 
        else {
                compteurEltSec.textContent = 60;
                compteurEltMin.textContent= compteurMin - 1;
            } 
    }// fin compteur minutes
        
    else {
        // Annule l'exécution répétée
        clearInterval(intervalId);
        document.getElementById("annuler_rese").textContent = " Réservation annulée";
    }
}

// Appelle la fonction diminuerCompteur toutes les secondes (1000 millisecondes)
var intervalId = setInterval(diminuerCompteur, 1000);