class BG_engine{
	//----------------------------------

	constructor(elmentHTML,nombreDeLayer,nombreDeFPS) {
		
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// basic variable scene
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.g_canvasDoc = document.getElementById(elmentHTML);    
		this.bg_g_context = this.g_canvasDoc.getContext("2d");
		this.bg_g_context.canvas.width  = window.innerWidth;
		this.bg_g_context.canvas.height = window.innerHeight;
		this.bg_g_width = this.g_canvasDoc.width;
		this.bg_g_height = this.g_canvasDoc.height;
		this.bg_g_nbLayer = nombreDeLayer;
		this.bg_g_listObj = new Array(this.bg_g_nbLayer);
		for(var k = 0 ; k < this.bg_g_nbLayer ; k++){
			this.bg_g_listObj[k] = new Array();
		}
		this.bg_g_listObjUnload = new Array();
		this.bg_g_stat = new BG_coreStatistique();
		this.bg_g_targetFps = nombreDeFPS;

		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// gestion evenement
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//

		this.zoomLevel = 1.0;
		this.mouseEventwheel = new BG_eventWheel(this.g_canvasDoc);
	
		this.decX = 0;
		this.decY = 0;
		this.mouseDownX = -1;
		this.mouseDownY;
		this.mouseX = 0;
		this.mouseY = 0;

		this.mouseEventMouse = new BG_eventMouse(this.g_canvasDoc);



	}
	//----------------------------------


	//----------------------------------
	initialisation(){
		this.bg_g_coreRoutine = new BG_coreRoutine(this.bg_g_stat,this.bg_g_context,this.bg_g_listObj,this.bg_g_listObjUnload);
		this.bg_g_coreRoutine.initialisation();
	}
 	//----------------------------------


	//----------------------------------
	enterFrame(){
		var processingTimeEngine = new Date();
		this.bg_g_context.canvas.width  = window.innerWidth;
		this.bg_g_context.canvas.height = window.innerHeight;
		this.bg_g_width = this.g_canvasDoc.width;
		this.bg_g_height = this.g_canvasDoc.height;
		this.bg_g_stat.setScreenWitdh(this.bg_g_width);
		this.bg_g_stat.setScreenHeight(this.bg_g_height);
		var decXs = (-this.decX+this.bg_g_width/2) * (1-this.zoomLevel);
		var decYs = (-this.decY+this.bg_g_height/2) * (1-this.zoomLevel);
		
		for(var i = 0 ; i < this.bg_g_nbLayer ; i++){
			for(var k = 0 ; k < this.bg_g_listObj[i].length ; k++){
				this.bg_g_listObj[i][k].enterFrame();
				this.bg_g_listObj[i][k].drawObj( decXs+this.decX, decYs+this.decY,this.zoomLevel);
			}
		}
		this.bg_g_coreRoutine.enterFrame();

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
		bg_engine.bg_g_stat.setMouseClick(0);
		
		this.bg_g_stat.setRenderEngineTime( (new Date() - processingTimeEngine) );
		this.bg_g_stat.setRenderEngineObject(0);
		
		if( this.bg_g_stat.getRenderEngineTime() < 1000/this.bg_g_targetFps ){
			this.bg_g_stat.setRenderEngineFps(this.bg_g_targetFps);
			setTimeout(function () {bg_engine.enterFrame()}, (1000/this.bg_g_targetFps)-this.bg_g_stat.getRenderEngineTime() );
			
		}
		else{	// cas ou le rendu 2d est surchargé, on ajoute un délai de 10ms pour ne pas bloquer le navigateur
			this.bg_g_stat.setRenderEngineFps(1000/(10+this.bg_g_stat.getRenderEngineTime()));
			setTimeout(function () {bg_engine.enterFrame()}, 10);
		}
		
	}
 	//----------------------------------
}

