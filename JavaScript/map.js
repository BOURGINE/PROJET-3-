/*--------------------------
        SECTION CARTE (MAP)
---------------------------*/
// Fonction carte et un markers
function initMap(){ 
    // Coordonnées de Paris
    var latLng = {lat: 48.864716, lng: 2.349014};
    // le map ()                                                 Les options de la carte 
    var map = new google.maps.Map(document.getElementById('map'),{ 
        zoom: 13, 
        center: latLng
    });
    // Fonction de création des Markers
    function addMarkers(coord){  
      var marker = new google.maps.Marker({
            position: coord, // A utiliser en parametre lors de l'appelle de la fonction
            map: map
      });
    }// fin addMarkers
    
    // Exécute un appel  de la fonction "générique" AJAXGET relié dans mon fichier HTML
    ajaxGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=1250", accesReponse);
    // Fonction accès la réponse de ma requette 
    function accesReponse(reponse){
    // Transforme la réponse en tableau d'objets JavaScript
        var reponseOject = JSON.parse(reponse);
        var i=0; // Très important
        
    // je récupère les positions de chaque stations (lat et lng)
    // ce n'est pas important mais ça m'aide à comprendre le processus. 
        reponseOject.records.forEach(function (position){
           var lati = reponseOject.records[i].fields.position[0];
           var lngi = reponseOject.records[i].fields.position[1];    
        });// Fin reponseObject
        
    // Boucle pour appeller tous les marqueurs
    for(var i=0; i<1250; i++){ 
       addMarkers({
           lat: reponseOject.records[i].fields.position[0],
           lng: reponseOject.records[i].fields.position[1]
        }); // fin addMarkers 
        
        
    } // Fin ce la boucle for     
        
    }// Fin AccèsReponse

  // test
    
    
}//Fin fonction initialiser
    
