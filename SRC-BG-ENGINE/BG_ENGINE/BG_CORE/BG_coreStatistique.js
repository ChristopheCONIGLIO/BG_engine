class BG_coreStatistique {
	constructor(bg) {
		
		// TODO
		//
		// Cette class a pour objetif de fournir des accès bas niveau a l'utilisateur
		// Il faudrait faire un peu le tri et revoir le wording sur certain élèments
		//
		this.g_bg= bg;
		
		// variable local
		// statistique
		this.bg_g_renderEngineTime = 0;			// Permet d'obtenir la stastistique sur la temps de rendu d'une frame
		this.bg_g_renderEngineFps = 0;			// Permet d'obtenir la stastistique sur les fps
		this.bg_g_renderEngineTimeLisse = 0;	// Permet d'obtenir la stastistique sur la temps de rendu d'une frame
		this.bg_g_renderEngineFpsLisse = 0;		// Permet d'obtenir la stastistique sur les fps
		this.bg_g_renderEngineObject = 0;		// Permet d'obtenir la stastistique sur le nombre d'objet tracer dans la frame
		this.bg_g_width = 0;					// taille de l'écran (width)
		this.bg_g_height = 0;					// taille de l'écran  (height)
		this.bg_g_mouseXScreen = 0;				// position souris sur l'écran (x)
		this.bg_g_mouseYScreen = 0;				// position souris sur l'écran (y)
		this.bg_g_mouseXBoard = 0;				// position souris sur la board (x)
		this.bg_g_mouseYBoard = 0;				// position souris sur la board (y)
		this.bg_g_mouseClick = 0;				//permet de savoir si un click et présent 
		this.bg_g_mouseDown = 0;				//permet de savoir si le bouton est enfoncé ou pas 
	
		//limit camera
		this.bg_g_limitCameraZoomMin = 20;	//limit camera zoom Min
		this.bg_g_limitCameraZoomMax = 0.1;	//limit camera zoom Max
		this.bg_g_limitCameraPosXMin = -0;		//limit camera position X
		this.bg_g_limitCameraPosXMax = 1000;		//limit camera position Y
		this.bg_g_limitCameraPosYMin = -1000;		//limit camera position X
		this.bg_g_limitCameraPosYMax = 1000;		//limit camera position Y
	
	}
	
	//fonction limitCamera
	setLimitCameraZoomMin(val){
		this.bg_g_limitCameraZoomMin = val;
	}
	setLimitCameraZoomMax(val){
		this.bg_g_limitCameraZoomMax = val;
	}
	setLimitCameraPosXMin(val){
		this.bg_g_limitCameraPosXMin = val;
	}
	setLimitCameraPosXMax(val){
		this.bg_g_limitCameraPosXMax = val;
	}
	setLimitCameraPosYMin(val){
		this.bg_g_limitCameraPosYMin = val;
	}
	setLimitCameraPosYMax(val){
		this.bg_g_limitCameraPosYMax = val;
	}
	
	getLimitCameraZoomMin(val){
		return this.bg_g_limitCameraZoomMin;
	}
	getLimitCameraZoomMax(val){
		return this.bg_g_limitCameraZoomMax;
	}
	getLimitCameraPosXMin(val){
		return this.bg_g_limitCameraPosXMin;
	}
	getLimitCameraPosXMax(val){
		return this.bg_g_limitCameraPosXMax;
	}
	getLimitCameraPosYMin(val){
		return this.bg_g_limitCameraPosYMin;
	}
	getLimitCameraPosYMax(val){
		return this.bg_g_limitCameraPosYMax;
	}

	
	//fonctions attaquant directement les bonne class depuis BG_engine alias g_bg

	setManualControl(value){
		this.g_bg.bg_g_manualControl = value;
	}

	setCameraPositionX(value){
		this.g_bg.decX = value;
	}
	setCameraPositionY(value){
		this.g_bg.decY = value;
	}
	setCameraPositionZoom(value){
		this.g_bg.zoomLevel = value;
	}
	getCameraPositionX(){
		return this.g_bg.decX;
	}
	getCameraPositionY(){
		return this.g_bg.decY;
	}
	getCameraPositionZoom(){
		return this.g_bg.zoomLevel;
	}


	//
	//fonction de conversion
	//

	convertPointScreenToBoard([px,py]){
		let decXs = (-this.g_bg.decX+this.g_bg.bg_g_width/2) * (1-this.g_bg.zoomLevel);
		let decYs = (-this.g_bg.decY+this.g_bg.bg_g_height/2) * (1-this.g_bg.zoomLevel);
		let pxl = ((px-(this.g_bg.decX+decXs))/this.g_bg.zoomLevel);
		let pyl = ((py-(this.g_bg.decY+decYs))/this.g_bg.zoomLevel);
		return [pxl,pyl];
	}
	convertPointScreenToBoardX(px){
		let decXs = (-this.g_bg.decX+this.g_bg.bg_g_width/2) * (1-this.g_bg.zoomLevel);
		let pxl = ((px-(this.g_bg.decX+decXs))/this.g_bg.zoomLevel);
		return pxl;
	}
	convertPointScreenToBoardY(py){
		let decYs = (-this.g_bg.decY+this.g_bg.bg_g_height/2) * (1-this.g_bg.zoomLevel);
		let pyl = ((py-(this.g_bg.decY+decYs))/this.g_bg.zoomLevel);
		return pyl;
	}
	convertPointBoardToScreen([px,py]){ // !!!!!!!!!!!!!
		let decXs = (-this.g_bg.decX+this.g_bg.bg_g_width/2) * (1-this.g_bg.zoomLevel);
		let decYs = (-this.g_bg.decY+this.g_bg.bg_g_height/2) * (1-this.g_bg.zoomLevel);
		let pxl = (px*this.g_bg.zoomLevel)+this.g_bg.decX+decXs;
		let pyl = (py*this.g_bg.zoomLevel)+this.g_bg.decY+decYs;
		return [pxl,pyl];
	}
	convertPointBoardToScreenX(px){ // !!!!!!!!!!!!!
		let decXs = (-this.g_bg.decX+this.g_bg.bg_g_width/2) * (1-this.g_bg.zoomLevel);
		let pxl = (px*this.g_bg.zoomLevel)+this.g_bg.decX+decXs;
		return pxl;
	}
	convertPointBoardToScreenY(py){ // !!!!!!!!!!!!!
		let decYs = (-this.g_bg.decY+this.g_bg.bg_g_height/2) * (1-this.g_bg.zoomLevel);
		let pyl = (py*this.g_bg.zoomLevel)+this.g_bg.decY+decYs;
		return pyl;
	}

	//foncrtion issu des variables locales


	getRenderEngineTime(){
		return this.bg_g_renderEngineTime;
	}
	setRenderEngineTime(value){
		this.bg_g_renderEngineTime = value;
		this.bg_g_renderEngineTimeLisse = this.bg_g_renderEngineTimeLisse*0.95 + value *0.05;
	}

	getRenderEngineFps(){
		return this.bg_g_renderEngineFps;
	}
	setRenderEngineFps(value){
		this.bg_g_renderEngineFps = value;
		this.bg_g_renderEngineFpsLisse = this.bg_g_renderEngineFpsLisse*0.95 + value *0.05;
	}

	getRenderEngineTimeLisse(){
		return Math.floor(this.bg_g_renderEngineTimeLisse);
	}
	setRenderEngineTimeLisse(value){
		this.bg_g_renderEngineTimeLisse = value;
	}

	getRenderEngineFpsLisse(){
		return Math.floor(this.bg_g_renderEngineFpsLisse);
	}
	setRenderEngineFpsLisse(value){
		this.bg_g_renderEngineFpsLisse = value;
	}
	
	getRenderEngineObject(){
		return this.bg_g_renderEngineObject;
	}
	setRenderEngineObject(value){
		this.bg_g_renderEngineObject = value;
	}

	getScreenWidth(){
		return this.bg_g_width;
	}
	setScreenWitdh(value){
		this.bg_g_width = value;
	}

	getScreenHeight(){
		return this.bg_g_height;
	}
	setScreenHeight(value){
		this.bg_g_height = value;
	}

	getMouseXScreen(){
		return this.bg_g_mouseXScreen;
	}
	setMouseXScreen(value){
		this.bg_g_mouseXScreen = value;
	}
	getMouseYScreen(){
		return this.bg_g_mouseYScreen;
	}
	setMouseYScreen(value){
		this.bg_g_mouseYScreen = value;
	}
	getMouseXBoard(){
		return this.bg_g_mouseXBoard;
	}
	setMouseXBoard(value){
		this.bg_g_mouseXBoard = value;
	}
	getMouseYBoard(){
		return this.bg_g_mouseYBoard;
	}
	setMouseYBoard(value){
		this.bg_g_mouseYBoard = value;
	}
	getMouseClick(){
		return this.bg_g_mouseClick;
	}
	setMouseClick(value){
		this.bg_g_mouseClick = value;
	}
	getMouseDown(){
		return this.bg_g_mouseDown;
	}
	setMouseDown(value){
		this.bg_g_mouseDown = value;
	}
}

