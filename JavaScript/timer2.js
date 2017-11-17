var compteurEltSec = $("#sec");
var compteurEltMin = $("#min");

// Diminue les secondes jusqu'à 0
function diminuerCompteur() {
    // Conversion en nombre du texte du compteur
    var compteurSec = Number(compteurEltSec.text());
    var compteurMin = Number(compteurEltMin.text());
    
    if (compteurMin > 0 || compteurSec > 0){
     
        if (compteurSec > 0) {
            compteurEltSec.text(compteurSec - 1);
        } 
        else {
                compteurEltSec.text(60);
                compteurEltMin.text(compteurMin - 1);
            } 
    }// fin compteur minutes
        
    else {
        // Annule l'exécution répétée
        clearInterval(intervalId);
        $("#annuler_rese").text("réservation annulé");
    }
}

// Appelle la fonction diminuerCompteur toutes les secondes (1000 millisecondes)
var intervalId = setInterval(diminuerCompteur, 1000);

$("#annuler_rese").click(function(){
    clearInterval(intervalId);
    $("#annuler_rese").text("réservation annulé");
    
});