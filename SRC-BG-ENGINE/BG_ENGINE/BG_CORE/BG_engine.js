class BG_engine{
	//----------------------------------

	constructor(elmentHTML,nbLayer,nombreDeFPS) {
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// debug option
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.debugContour = false;
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// basic variable scene
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.g_canvasDoc = document.getElementById(elmentHTML);    
		this.bg_g_context = this.g_canvasDoc.getContext("2d");
		this.bg_g_context.canvas.width  = this.g_canvasDoc.clientWidth;
		this.bg_g_context.canvas.height = this.g_canvasDoc.clientHeight;
		
		this.bg_g_width = this.g_canvasDoc.width;
		this.bg_g_height = this.g_canvasDoc.height;
		this.bg_g_nbLayer = nbLayer;
		this.bg_g_listObj = new Array(this.bg_g_nbLayer);
		for(var k = 0 ; k < this.bg_g_nbLayer ; k++){
			this.bg_g_listObj[k] = new Array();
		}
		this.bg_g_listObjUnload = new Array();
		this.bg_g_stat = new BG_coreStatistique(this);
		this.bg_g_targetFps = nombreDeFPS;
		this.bg_g_stopEnterFrame = false;
		this.bg_g_manualControl = true;

		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// gestion des collisions
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		/*this.bg_g_collisionEngine = new BG_collision(this,true,400,400,400);
		this.BG_collisionEngCir1 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir2 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir3 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir4 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir5 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir6 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir7 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir8 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir9 = new BG_collisionEngCir(this.bg_g_collisionEngine);
		this.BG_collisionEngCir10 = new BG_collisionEngCir(this.bg_g_collisionEngine);*/



		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// gestion evenement
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.zoomLevel = 1.0;
		this.mouseEventwheel = new BG_eventWheel(this);
	
		this.decX = 0;
		this.decY = 0;
		this.mouseDownX = -1;
		this.mouseDownY;
		this.mouseX = 0;
		this.mouseY = 0;

		this.mouseEventMouse = new BG_eventMouse(this);



	}
	//----------------------------------


	//----------------------------------
	// OBSELETE
	/*initialisation(){
		this.bg_g_coreRoutine = new BG_coreRoutine(this);
		this.bg_g_coreRoutine.initialisation();
	}*/
 	//----------------------------------
	 //future update : créé à la volé les layer mais attention pour cela il faut attendre que l'enterfame a fini comme pour la destruction
	addObject(obj,layer){
		this.bg_g_listObj[layer].push( obj );
	}
	//----------------------------------
	deleteObject(obg){
		this.bg_g_listObjUnload.push(obj);
	}
	//----------------------------------
	stopEnterFrame(){
		this.bg_g_stopEnterFrame = true;
	}
	//----------------------------------
	launchEnterFrame(){
		var processingTimeEngine = new Date();
		this.bg_g_context.canvas.width  = this.g_canvasDoc.clientWidth;
		this.bg_g_context.canvas.height = this.g_canvasDoc.clientHeight;
		this.bg_g_width = this.g_canvasDoc.width;
		this.bg_g_height = this.g_canvasDoc.height;
		this.bg_g_stat.setScreenWitdh(this.bg_g_width);
		this.bg_g_stat.setScreenHeight(this.bg_g_height);
		var decXs = (-this.decX+this.bg_g_width/2) * (1-this.zoomLevel);
		var decYs = (-this.decY+this.bg_g_height/2) * (1-this.zoomLevel);
		
		//this.bg_g_collisionEngine.drawDebug(decXs+this.decX, decYs+this.decY,this.zoomLevel);
		for(var i = 0 ; i < this.bg_g_nbLayer ; i++){
			for(var k = 0 ; k < this.bg_g_listObj[i].length ; k++){
				this.bg_g_listObj[i][k].enterFrame();
				this.bg_g_listObj[i][k].drawObj( decXs+this.decX, decYs+this.decY,this.zoomLevel);
			}
		}
		//this.bg_g_coreRoutine.enterFrame(); // OBSELTTE
		/*this.BG_collisionEngCir1.enterFrame();
		this.BG_collisionEngCir2.enterFrame();
		this.BG_collisionEngCir3.enterFrame();
		this.BG_collisionEngCir4.enterFrame();
		this.BG_collisionEngCir5.enterFrame();
		this.BG_collisionEngCir6.enterFrame();
		this.BG_collisionEngCir7.enterFrame();
		this.BG_collisionEngCir8.enterFrame();
		this.BG_collisionEngCir9.enterFrame();
		this.BG_collisionEngCir10.enterFrame();
		*/
		

		for(var k = 0 ; k < this.bg_g_listObjUnload.length ; k++){
			var index = -1;
			var layer = -1;
			for(var i = 0 ; i < this.bg_g_nbLayer ; i++){
				for(var j = 0 ; j < this.bg_g_listObj[i].length ; j++){
					if( this.bg_g_listObj[i][j] == this.bg_g_listObjUnload[k] ){
						index = j;
						layer = i;
					}
				}
			}
			if( index != -1 && layer != -1){
				this.bg_g_listObj[layer].splice(index, 1);

			}
		}
		this.bg_g_listObjUnload.splice(0, this.bg_g_listObjUnload.length);
		this.bg_g_stat.setMouseClick(0);
		
		this.bg_g_stat.setRenderEngineTime( (new Date() - processingTimeEngine) );
		this.bg_g_stat.setRenderEngineObject(0);
		
		var me = this;
		if( this.bg_g_stopEnterFrame == false){
			if( this.bg_g_stat.getRenderEngineTime() < 1000/this.bg_g_targetFps ){
				this.bg_g_stat.setRenderEngineFps(this.bg_g_targetFps);
				setTimeout(function () {me.launchEnterFrame()}, (1000/this.bg_g_targetFps)-this.bg_g_stat.getRenderEngineTime() );
				
			}
			else{	// cas ou le rendu 2d est surchargé, on ajoute un délai de 10ms pour ne pas bloquer le navigateur
				this.bg_g_stat.setRenderEngineFps(1000/(10+this.bg_g_stat.getRenderEngineTime()));
				setTimeout(function () {me.launchEnterFrame()}, 10);
			}
		}
	}
 	//----------------------------------
}

