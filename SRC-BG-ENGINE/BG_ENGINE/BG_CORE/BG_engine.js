class BG_engine{
	//----------------------------------

	constructor(elmentHTML,nbLayer,nombreDeFPS) {
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// debug option
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.debugContour = false;
		this.debugCollisionContour = false;
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
		this.bg_g_listObjMoveLayer = new Array();
		this.bg_g_listScript = new Array();
		this.bg_g_listScriptUnload = new Array();
		this.bg_g_stat = new BG_coreStatistique(this);
		this.bg_g_targetFps = nombreDeFPS;
		this.bg_g_stopEnterFrame = false;
		this.bg_g_manualControl = true;

		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// gestion des collisions
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.bg_g_collisionEngine;
		this.bg_g_collisionEngineOffSetX;
		this.bg_g_collisionEngineOffSetY;
		this.initCollisionEngine(6000,6000,30);
	 	this.setOffSetCollisionengine(-2000,-2000);
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// gestion evenement
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.zoomLevel = 1.0;
		this.mouseEventwheel = new BG_eventWheel(this);
	
		this.decX = 0;
		this.decY = 0;
		this.decXwithZoom = 0;
		this.decYwithZoom = 0;
		this.mouseDownX = -1;
		this.mouseDownY;
		this.mouseX = 0;
		this.mouseY = 0;

		this.mouseEventMouse = new BG_eventMouse(this);
		this.mouseEventTouch = new BG_eventTouch(this);

		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		// Lancement
		//-----------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------//
		this.launchEnterFrame();
	}
	//----------------------------------


	//----------------------------------
	// OBSELETE
	/*initialisation(){
		this.bg_g_coreRoutine = new BG_coreRoutine(this);
		this.bg_g_coreRoutine.initialisation();
	}*/
 	//----------------------------------
	 //future update : cr???? ?? la vol?? les layer mais attention pour cela il faut attendre que l'enterfame a fini comme pour la destruction
	addObject(obj,layer){
		try{
			this.bg_g_listObj[layer].push( obj );
		}
		catch (error) {
			console.log("[B]ack[g]round ERROR : bad initialisation object: Object rejected");
		}
		
	}
	//----------------------------------
	deleteObject(obj){
		this.bg_g_listObjUnload.push(obj);
	}
	//----------------------------------
	changeLayer(obj,newLayer){
		var arr = new Array();
		this.bg_g_listObjMoveLayer.push([obj,newLayer]);
	}
	//----------------------------------
	addScript(obj){
		this.bg_g_listScript.push( obj );
	}
	//----------------------------------
	deleteScript(obg){
		this.bg_g_listScriptUnload.push(obj);
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
		this.decXwithZoom = decXs+this.decX;
		this.decYwithZoom = decYs+this.decY;
		if( this.debugCollisionContour ) this.bg_g_collisionEngine.drawDebug(decXs+this.decX, decYs+this.decY,this.zoomLevel);
		// handle objetc
		for(var i = 0 ; i < this.bg_g_nbLayer ; i++){
			for(var k = 0 ; k < this.bg_g_listObj[i].length ; k++){
				
				this.bg_g_listObj[i][k].drawObj( decXs+this.decX, decYs+this.decY,this.zoomLevel);
				this.bg_g_listObj[i][k].enterFrame();
			}
		}



		//gere le d??aplcement des couche graphique des objets
		for(var k = 0 ; k < this.bg_g_listObjMoveLayer.length ; k++){
			var index = -1;
			var layer = -1;
			for(var i = 0 ; i < this.bg_g_nbLayer ; i++){
				for(var j = 0 ; j < this.bg_g_listObj[i].length ; j++){
					if( this.bg_g_listObj[i][j] == this.bg_g_listObjMoveLayer[k][0] ){
						index = j;
						layer = i;
					}
				}
			}
			if( index != -1 && layer != -1){
				this.bg_g_listObj[layer].splice(index, 1);
				this.bg_g_listObj[this.bg_g_listObjMoveLayer[k][1]].push( this.bg_g_listObjMoveLayer[k][0] );
			}
			
		}
		this.bg_g_listObjMoveLayer.splice(0, this.bg_g_listObjMoveLayer.length); //? new Array not ?
		

		// optimisable parcque on connait la position dans le tableau pas besoin de chercher dans toute les couches ?
		//gere le d??chargement des objets graphique
		//
		//
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
				this.bg_g_listObjUnload[k].destructor();
				this.bg_g_listObj[layer].splice(index, 1);
			}
		}
		this.bg_g_listObjUnload.splice(0, this.bg_g_listObjUnload.length); //? new Array not ?


		//handle script
		for(var k = 0 ; k < this.bg_g_listScript.length ; k++){
				this.bg_g_listScript[k].enterFrame();
		}
		for(var k = 0 ; k < this.bg_g_listScriptUnload.length ; k++){
			var index = -1;
			for(var j = 0 ; j < this.bg_g_listScript.length ; j++){
				if( this.bg_g_listScript[j] == this.bg_g_listScriptUnload[k] ){
						index = j;
				}
			}
			if( index != -1 ){
				this.bg_g_listScriptUnload[k].destructor();
				this.bg_g_listObj.splice(index, 1);
			}
		}
		
		this.bg_g_stat.setMouseClick(0);
		
		this.bg_g_stat.setRenderEngineTime( (new Date() - processingTimeEngine) );
		this.bg_g_stat.setRenderEngineObject(0);
		
		var me = this;
		if( this.bg_g_stopEnterFrame == false){
			if( this.bg_g_stat.getRenderEngineTime() < 1000/this.bg_g_targetFps ){
				this.bg_g_stat.setRenderEngineFps(this.bg_g_targetFps);
				setTimeout(function () {me.launchEnterFrame()}, (1000/this.bg_g_targetFps)-this.bg_g_stat.getRenderEngineTime() );
			}
			else{	// cas ou le rendu 2d est surcharg??, on ajoute un d??lai de 10ms pour ne pas bloquer le navigateur
				this.bg_g_stat.setRenderEngineFps(1000/(10+this.bg_g_stat.getRenderEngineTime()));
				setTimeout(function () {me.launchEnterFrame()}, 10);
			}
		}
	}
 	//----------------------------------
	 
		
	//----------------------------------
	//----------------------------------
	// Method for handle specific 2d collision engine
	//----------------------------------
	//----------------------------------
	initCollisionEngine(sizeX,sizeY,incrementArray){
		this.bg_g_collisionEngine = new BG_collision(this,true,sizeX,sizeY,incrementArray);
	}
	setOffSetCollisionengine(offSetX,offSetY){
		this.bg_g_collisionEngineOffSetX = offSetX;
		this.bg_g_collisionEngineOffSetY = offSetY;	
	}	
	//----------------------------------


}

