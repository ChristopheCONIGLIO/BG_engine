        // --------------------------------------------------- //
        // --------------------------------------------------- //
        class unity extends BG_rect{
            // ---------------------
            constructor(bg,onBoard,fixed,layer,pX,pY,sX,sY,color) {
                super(bg,onBoard,fixed,layer,pX,pY,sX,sY,color);

                this.camp = 0;
                this.posX = 0;
                this.posY = 0;
                this.birth = 0;
                this.keyCurrentFrame = 0;
            }
            // ---------------------
            destructor(){
                super.destructor();
                
            }
            // ---------------------
            enterFrame(){
                
            }



            initUnity($key,$camp,$posX,$posY){
                this.keyCurrentFrame = $key;
                this.posX = $posX;
                this.posY = $posY;
                this.changeCamp($key,$camp);
            }
            changeCamp($key,$camp){
                this.keyCurrentFrame = $key;
                this.camp = $camp;
                this.birth = -1;
                this.updateColorCamp();
            }

            updateUnity($key){
                console.log($key);
                if( $key == this.keyCurrentFrame) return;
                this.keyCurrentFrame = $key;
                
                
                //naissance
                if( this.birth <= 0 )   this.birth++; 

                //attaque
                if( this.birth == 1 && this.camp >= 1 ){
                    //console.log(this.posX ,this.posY);
                    if( this.posX >= 1 ){
                        if( arr[this.posX-1][this.posY].camp == 0){
                            arr[this.posX-1][this.posY].changeCamp($key,this.camp);
                            
                        }
                    }
                   if( this.posX + 1 < counterX ){
                        if( arr[this.posX+1][this.posY].camp == 0){
                            arr[this.posX+1][this.posY].changeCamp($key,this.camp);
                            
                        }
                    }
                    if( this.posY >= 1 ){
                        if( arr[this.posX][this.posY-1].camp == 0){
                            arr[this.posX][this.posY-1].changeCamp($key,this.camp);
                            
                        }
                    }
                   if( this.posY + 1 < counterY ){
                        if( arr[this.posX][this.posY+1].camp == 0){
                            arr[this.posX][this.posY+1].changeCamp($key,this.camp);
                            
                        }
                    }
                }
                
            }
            

            getColorCamp(){
                if( this.camp == 1) return "#FF0000";
                if( this.camp == 2) return "#0000FF";
                return "#333333"; 
            }
            updateColorCamp(){
                this.setColor(this.getColorCamp());
            }
            // ---------------------
        }