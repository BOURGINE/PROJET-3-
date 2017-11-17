/*--------------------------
        SECTION CARTE (MAP)
---------------------------*/
var maCarte = {
    
    map: null,
    arrayMarkers:[],
    
    init: function(){
        // la carte                                                   Les options de la carte 
         this.map = new google.maps.Map(document.getElementById("map"),{
            zoom: 13,
            scrollwheel: false, // Pour enlever le message d'infos de google
            center: {
                lat: 48.864716, 
                lng: 2.349014
            }
         });
        // Appel de mes différentes fonctions dans maCarte
        maCarte.ajaxMarker();
        maCarte.regrouperMarker();
        maCarte.canvasShow(station); // Je montre mon canvas au clic (reserver)
        maCarte.validerSignature();
        maCarte.effacerTimer(); // Ne marche pas. A effacer
       
        
        
        // Je cache mon canvas dès l'initialisation de la carte
        $("#case_canvas").hide();
        $("#reservation").hid();
        
    },// fin initMap
    
    // Accès au serveur
    ajaxMarker: function(requetAjax){
        $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=2dc6b7f33ab4d89f0f9f26486515ec6297ae4b54", function(reponse){
            $.each(reponse, function(i, propriete){
                maCarte.creerMarker(reponse[i]);
            });
        });
    }, // Fin AjaxMarker
    
    
    creerMarker: function(station){
        // je déclare des variables utiles
        var marker;
        var markerId = station.number;
        var infoGeo = {
            lat: station.position.lat,
            lng: station.position.lng
        }; // Fin  déclaration des variable
        
        // Création des markers sous conditions ouvert ou fermé
        if((station.status === "CLOSED") || (station.available_bikes === 0)){
            // je crée un marker vert
            marker = new google.maps.Marker({
                id: markerId,
                position: infoGeo,
                map: this.map,
                icon: "img/map-marker-rouge.png"
            });
            
            // je regroupe les Markers
            markerCluster.addMarker(marker);      
        }// Fin if
        
        else{
            marker = new google.maps.Marker({
                id: markerId,
                position: infoGeo,
                map: this.map,
                icon: "img/map-marker-vert.png"
            });
            // je regroupe les Markers
            markerCluster.addMarker(marker);      
        }// Fin else
        
        // Evenement sur les markers
        marker.addListener("click",function(){
            maCarte.infoStation(station);
            
            // Je stock le nom de la station en question dans le navigateur
            localStorage.setItem("nomStation", station.name);
            // on appelle la validation de la signature
            maCarte.canvasShow(station);
            maCarte.validerSignature(station);
        });
    },// fin creerMarkers 
    
    // Une fois les markers créés, je les regroupe dans un clusterer
    regrouperMarker: function(){
        markerCluster = new MarkerClusterer(this.map, this.arrayMarkers, {
            imagePath:"img/mc/m"
        });
    },
    
    infoStation: function(station){
        
    // Faire apparaitre la div station
        $("#station").css("display", "block");
    // Pour le statut de la station (rappeller le code couleur) et gestion de mon bouton reserver
      if(station.status === "OPEN"){ 
          $("#statusStation").text("STATION OUVERTE");
          
      }
        else{
            $("#statusStation").text("STATION FERMEE");
        }
    // Pour les autres informations sur la station 
        $("#nomStation").text(station.name);
        $("#adresseStation").text(station.address);
        $("#veloDispo").text(station.available_bikes);
        $("#standDispo").text(station.available_bike_stands);  
        
    // gestion du bouton reserver (sous deux conditions: stations est fermée ou vélos non disponibles)
    // je veux désactiver le bouton de servation les conditions de reservation ne sont pas remplis.
        
    if((station.status === "CLOSED") || (station.available_bikes === 0)){
        // je ne peux pas réserver
        $("#bouttonReserver").css("display", "none");
        $("#erreur").text("Station fermée ou vélo non disponible");
        $("#erreur").css("background-color","red");
        $("#case_canvas").hide();// pour cacher au cas ou l'utilisateur reviens sur une station fermée ou une station 0 vélos.
        
    } // fin if gestion de boutton reservation
        
        else{
        // je peux réserver
            $("#bouttonReserver").css("display", "block");
            $("#erreur").text("Vous pouvez réserver de vélo");
            $("#erreur").css("background-color","lime");
            
        } // fin else gestion de boutton reservation
        
      },  // fin infoStation
    
    canvasShow: function(station){
        // Je stock les infos de la station et j'affiche le case canvas au click du boutton reserver.
        $("#bouttonReserver").click(function(){
            
            // je stock les informations du vélos
            sessionStorage.setItem("statutStation", station.status);
            sessionStorage.setItem("nomStation", station.name);
            sessionStorage.setItem("adresseStation", station.adress);
            sessionStorage.setItem("veloDispo", station.available_bikes);
            sessionStorage.setItem("standDispo", station.available_bikes_stands);

            // je montre le canvas
            $("#case_canvas").show();
            
            
        });   
    }, // fin canvasShow
    
    validerSignature: function(station){ // test
        
    // Se declance au clic sur le botton valider
    
        $("#valider").click(function(){ 
            
            // effacer des elements
            $("#bouttonReserver").css("display", "none");
            $("#erreur").hide();
            $("#case_canvas").hide();
            $("#reservation").show();
             
            // Afficher un message de confirmation
           var monVelos = sessionStorage.getItem("nomStation");
            
            $("#text_final").text("Vous avez réservé un vélo à la station : " + monVelos);
            $("#text_final2").text("Votre réservation expire dans: ");                   
            // affichier le timer
            
            // stocker des information dans le timer
            
        // 
                 
        }); // fin event click
    },
    // Ne marche pas--A effacer
    effacerTimer: function(){
        $("#annuler_rese").click(function(){
           clearInterval(setInterval);
        });
    }
    
}; // fin Objet carte Map
