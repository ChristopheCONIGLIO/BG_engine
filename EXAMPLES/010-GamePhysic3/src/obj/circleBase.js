        // --------------------------------------------------- //
        // --------------------------------------------------- //
        class circleBase extends BG_circle{
            // ---------------------
            constructor(bg,onBoard,layer,pX,pY,size,color) {
                super(bg,onBoard,layer,pX,pY,size,color);
                
                // local data of circle
                this.p_maxVelocity = 50;
                this.type = "base";
                this.setPhysicEnable();

                // handle data of circle
                this.p_power = 0;


            }
            // ---------------------
            destructor(){
                super.destructor();
            }
            // ---------------------
            enterFrame(){
            }
            // ---------------------
            forceMaxVelocity(){
                var veloActual = Math.sqrt(this.p_physicVx*this.p_physicVx+this.p_physicVy*this.p_physicVy);
                if( veloActual > this.p_maxVelocity){
                    var correction = this.p_maxVelocity/veloActual;
                    this.p_physicVx *= correction;
                    this.p_physicVy *= correction;
                }
            }
            // ---------------------
        }