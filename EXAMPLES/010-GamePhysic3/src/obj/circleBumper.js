        // --------------------------------------------------- //
        // --------------------------------------------------- //
        class circleBumper extends circleBase{
            // ---------------------
            constructor(bg,onBoard,layer,pX,pY,size,color,power) {
                super(bg,onBoard,layer,pX,pY,size,color);
                
                // local data of circle
                this.type = "Bumper";

                // handle data of circle
                this.p_power = power;

                this.setPhysicMovable(true);

                this.dragAndDrop_decMouseX = 0;
                this.dragAndDrop_decMouseY = 0;

                this.img = new BG_drawImage(this.getRefEngine(),true,10,50,50,100,100,"./bumper.png");
   
            }
            // ---------------------
            destructor(){
                super.destructor();
            }
            // ---------------------
            enterFrame(){
                
                this.img.setDim(this.getDim(),this.getDim());
                this.img.setPos(this.getPosX(),this.getPosY());


                if( _dragAndDroEnable == true && _currentObjSelected==this){
                    
                        this.setPosX(this.getRefEngine().bg_g_stat.getMouseXBoard() +this.getDim()/2+ this.dragAndDrop_decMouseX);
                        this.setPosY(this.getRefEngine().bg_g_stat.getMouseYBoard() +this.getDim()/2+ this.dragAndDrop_decMouseY);
                    
                    
                }
        
                //console.log(this.p_power);

                /*for(var k = 0 ; k < this.p_physicListLastContact.length ; k++){
                    if( this.p_physicListLastContact[k].p_physicStatic == true){
                        if( this.p_physicListLastContact[k].p_power >= 2){
                            
                            
                            this.p_physicListLastContact[k].p_physicVx*=this.p_power;
                            this.p_physicListLastContact[k].p_physicVy*=this.p_power;

                            //this.p_physicVx*=this.p_physicListLastContact[k].p_power;
                            //this.p_physicVy*=this.p_physicListLastContact[k].p_power;
                            //this.p_physicVx*=this.p_power;
                            //this.p_physicVy*=this.p_power;
                            //console.log(this.p_power);
                            
                        }
                    }
                }*/
                //this.forceMaxVelocity();
                
            }
            // ---------------------
            
            // ---------------------
            // ---------------------
            determineIfClicOfMe(){
                var mouseOver = this.getMouseOver();
                if( mouseOver == false) return [false,-1];
                return [true,1];
            }
            // ---------------------
            // ---------------------
            // ---------------------
            // ---------------------
            //permet de définir la distance entre la souris et la mire pour garder ce décalage pendent le dragAndDrop
            // ---------------------
            // ---------------------
            initDragandDrop(){
                
                this.dragAndDrop_decMouseX = this.getPosX()-this.getRefEngine().bg_g_stat.getMouseXBoard();
                this.dragAndDrop_decMouseY = this.getPosY()-this.getRefEngine().bg_g_stat.getMouseYBoard();
                
                
            }
            // ---------------------
            // ---------------------
        }