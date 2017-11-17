var timerObject = {
 
    compteurEltSec : $("#sec"),
    compteurEltMin :  $("#min"),
    
    init: function(){    
        timerObject.diminuerCompteur();
        
        $("#annuler_rese").click(function(){
        timerObject.stopTimer();
        });
    },
    
    diminuerCompteur: function(){

        // Conversion en nombre du texte du compteur
    var  compteurSec = Number(this.compteurEltSec.text());
    var  compteurMin = Number(this.compteurEltMin.text());

    if(compteurMin > 0 || compteurSec > 0){

            if (compteurSec > 0) {
                this.compteurEltSec.text(compteurSec - 1);  
            } 
            else {
                    this.compteurEltSec.text(60);
                    this.compteurEltMin.text(compteurMin - 1);       
                }
    }// fin compteur minutes
    else 
        {  // Annule l'exécution répétée
            clearInterval(setInterval);
            $("#annuler_rese").text("Réservation expirée");
        }
         
         
     },// fin function diminuerCompteur
    
    stopTimer: function(){
        var  compteurSec = Number(this.compteurEltSec.text());
        var  compteurMin = Number(this.compteurEltMin.text());
        
           this.compteurEltSec.text(0);
            this.compteurEltMin.text(0);     
    }
        
}// Fin object  

// POUR ESSAI RAPIDE SANS VALIDATION
//$(function(){
  // var intervalId = setInterval(timerObject.init, 1000);
// });

// FONCTION AVEC PROCESSUS DE VALIDATION

$("#valider").click(function(){
   var intervalId = setInterval(timerObject.init, 1000);
});


