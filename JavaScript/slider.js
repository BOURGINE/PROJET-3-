/*--------------------------
        SECTION SLIDER
---------------------------*/
/*
// L'INCREMENTATION
var slide = document.getElementsByClassName("slide");
var i=0;

function avancer(){
    slide[i].style.display="none";

    if(i===3){
        i=0;
    }
    else{
        i++;
    }
    slide[i].style.display="block";
}

var boutonNext = document.getElementById("next");

//Appel de la fonction lors de l'appel du bouton next
boutonNext.addEventListener("click", avancer);

// La décrémentation

function reculer(){
    slide[i].style.display="none";
    // Pour reculer, si on est à la première image, on retourne à la dernière.
    // Cela parait logique. lorsqu'on fait une boucle de [0-3] puis [3-0].
    // Autrement dit: le premier element en reculant de 0, c'est 3.
    if(i===0){
        i=3;
    }
    else{
        i--;
    }
    slide[i].style.display="block";
}

var boutonPrev = document.getElementById("prev");
boutonPrev.addEventListener("click", reculer);

*/
/*---------------------------------
*       SECTION SLIDESHOW
            en POO      *
----------------------------------*/


// Mon object slideshow
var slideshow = {
    // Mes deux paramettres var de départ
    slide: document.getElementsByClassName("slide"),
    
    i:0,
    
    // Mes paramettres methodes
    // 1- METHODE: Fonction avancer
    avancer: function(){
            this.slide[this.i].style.display="none";

            if(this.i===4){
                this.i=0;
            }
            else{
                this.i++;
            }
            this.slide[this.i].style.display="block";
    },
    
    // 2- METHODE: Fonction reculer
    reculer: function(){
            this.slide[this.i].style.display="none";
            // Pour reculer, si on est à la première image, on retourne à la dernière.
            // Cela parait logique. lorsqu'on fait une boucle de [0-3] puis [3-0].
            // Autrement dit: le premier element en reculant de 0, c'est 3.
            if(this.i===0){
                this.i=4;
            }
            else{
                this.i--;
            }
            this.slide[this.i].style.display="block";
    },
    
    // 3- METHODE: Fonction clavier
    clavier: function(e){
            if(e.keyCode === 39){
                document.addEventListener("keydown", this.avancer());
            }
            else if(e.keyCode === 37){
                document.addEventListener("keydown", this.reculer());
            }
    }

};//fin de mon objet 


//Appel des fonction avec différents evenements

// Avec la souris.
document.getElementById("next").addEventListener("click", slideshow.avancer.bind(slideshow));
document.getElementById("prev").addEventListener("click", slideshow.reculer.bind(slideshow));   

// Avec le clavier
document.addEventListener("keydown", slideshow.clavier.bind(slideshow));
    
