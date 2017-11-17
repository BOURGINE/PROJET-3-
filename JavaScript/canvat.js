var canvasObject = {
    
    mouseX: null,
    mouseY: null,
    
    clickX: null,
    clickY:null,
    clickDrag: null,
    
    paint: null,
    
    evtX: null,
    evtY: null,
    
    init: function(){ 
        context = document.querySelector("#canvas").getContext("2d");
        context.font = "15px Arial";
        context.fillText("signez ici",90,10);         
           
        // Mes variables locales
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
        
        // Appel de mes différentes function
        canvasObject.mouseDown();
        canvasObject.mouseMove();
        canvasObject.mouseUp();
        canvasObject.mouseLeave();
        canvasObject.addClick();
        canvasObject.reDraw();
        
        // Fonctions event             
        $("#annuler").click(function(){
            canvasObject.effacerCancas();
        });
    
    },
        
    mouseDown: function(){
        $("#canvas").on("vmousedown", function(e) {
            this.paint = true;
            var evtX = e.offsetX;
            var  evtY = e.offsetY;
            
            if(evtX == undefined && evtY == undefined){
                evtX = e.clientX - $(e.target).offset().left;
                evtY = e.pageY - $(e.target).offset().top;
                canvasObject.addClick(evtX, evtY);
            } else{
                canvasObject.addClick(evtX, evtY);
            }
            canvasObject.reDraw();
        });  
    
    },// fin fonction mousedouwn
    
    
    mouseMove: function(){
        $('#canvas').on("vmousemove", function(e){
            if(this.paint){
                var evtX = e.offsetX;
                var evtY = e.offsetY;
                if(evtX == undefined && evtY == undefined){
                     evtX = e.clientX - $(e.target).offset().left;
                    evtY = e.pageY - $(e.target).offset().top;
                    canvasObject.addClick(evtX, evtY, true);
                } else {
                    canvasObject.addClick(evtX, evtY, true);
                }
                e.preventDefault();
                canvasObject.reDraw();
            }
        });
     },
    
    mouseUp: function(){
        $('#canvas').on("vmouseup", function(){
            this.paint = false;
        });
    },
    
    mouseLeave: function(){
        $('#canvas').on("vmouseout", function(){
            this.paint = false;
        });
        
    },
    
    addClick: function(x, y, dragging) {
        
            this.clickX.push(x);
            this.clickY.push(y);
            this.clickDrag.push(dragging);
    },
    
    reDraw: function(){
        
        // Si je veux effacer la canvas à chaque nouvel appel
        context.clearRect(0,0, context.canvas.width, context.canvas.height); 

          context.strokeStyle = "#000000";
          context.lineJoin = "round";
          context.lineWidth = 4;

          for(var i=0; i < this.clickX.length; i++) {		
            context.beginPath();
            if(this.clickDrag[i] && i){
              context.moveTo(this.clickX[i-1], this.clickY[i-1]);
             }else{
               context.moveTo(this.clickX[i]-1, this.clickY[i]);
             }
              
             context.lineTo(this.clickX[i], this.clickY[i]);
             context.closePath();
             context.stroke();
          }
    },// fin redraw  
    
    effacerCancas: function(){
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        
        context.clearRect(0,0, context.canvas.width, context.canvas.height); 
    }// fin effacer canvas
    
           
} // fin object canvas



$(function(){
   canvasObject.init();
})
