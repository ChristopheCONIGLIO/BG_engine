        // --------------------------------------------------- //
        // --------------------------------------------------- //
        class script extends BG_script{
            constructor(bg) {
                super(bg);// bg accès by this variable -> this.p_bg
                this.counterSlowMax = 2;
                this.counterSlow = 0;
            }
            enterFrame(){
                this.counterSlow++;
                if( this.counterSlow == this.counterSlowMax){
                    var key = Math.round(Math.random()*1000);
                    for(var j = 0; j < counterY ; j++){
                        for(var i = 0 ; i < counterX ; i++){
                            arr[i][j].updateUnity( key );
                        }
                    }
                    this.counterSlow = 0;
                }
                
                
                
                //console.log(this.p_bg.bg_g_stat.getRenderEngineTimeLisse());
               

            }
        }
        // --------------------------------------------------- //
        // --------------------------------------------------- //