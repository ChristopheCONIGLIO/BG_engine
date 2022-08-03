        // --------------------------------------------------- //
        // --------------------------------------------------- //
        class circleBall extends circleBase{
            // ---------------------
            constructor(bg,onBoard,layer,pX,pY,size,color,refScript) {
                super(bg,onBoard,layer,pX,pY,size,color);
                
                // local data of circle
                this.type = "Ball";
                
                this.refScript = refScript;
                    
            }
            // ---------------------
            destructor(){
                super.destructor();
            }
            // ---------------------
            enterFrame(){
                if( this.getPosY()>2000){
                    this.p_bg.deleteObject(this);
                    this.refScript.inc--;
                }

                for(var k = 0 ; k < this.p_physicListLastContact.length ; k++){
                    if( this.p_physicListLastContact[k].p_physicStatic == true){
                        if( this.p_physicListLastContact[k].p_power >= 2){
                            
                            
                            
                            this.p_physicVx*=this.p_physicListLastContact[k].p_power;
                            this.p_physicVy*=this.p_physicListLastContact[k].p_power;
                            
                            //console.log(this.p_power);
                            
                        }
                    }
                }
                this.forceMaxVelocity();
            }
            // ---------------------
        }