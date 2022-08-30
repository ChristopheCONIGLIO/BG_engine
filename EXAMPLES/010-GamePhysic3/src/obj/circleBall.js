        // --------------------------------------------------- //
        // --------------------------------------------------- //
        class circleBall extends circleBase{
            // ---------------------
            constructor(bg,onBoard,layer,pX,pY,size,color,refScript) {
                super(bg,onBoard,layer,pX,pY,size,color);
                
                // local data of circle
                this.type = "Ball";
                this.totalBounce = 0;

                this.refScript = refScript;
                this.p_objText = new BG_text(this.p_bg,true,50,0,0,30,"#000000");
                //console.log(this.p_objText);
                this.p_objText.setText("0");

            }
            // ---------------------
            destructor(){
                super.destructor();
                this.p_bg.deleteObject(this.p_objText);
            }
            // ---------------------
            enterFrame(){
                
                this.p_objText.setPos(this.getPosX(),this.getPosY());
                //this.p_objText.setPos(0,0);

                if( this.getPosY()>2000){
                    this.p_bg.deleteObject(this);
                    this.refScript.inc--;
                }

                for(var k = 0 ; k < this.p_physicListLastContact.length ; k++){
                    if( this.p_physicListLastContact[k].p_physicStatic == true){
                        if( this.p_physicListLastContact[k].p_power >= 1){
                            
                            
                            
                            this.p_physicVx*=this.p_physicListLastContact[k].p_power;
                            this.p_physicVy*=this.p_physicListLastContact[k].p_power;
                            
                            this.totalBounce++;
                            //console.log(this.p_power);
                            
                        }
                    }
                }
                //console.log(this.totalBounce);
                this.p_objText.setText(this.totalBounce);
                this.forceMaxVelocity();
            }
            // ---------------------
        }