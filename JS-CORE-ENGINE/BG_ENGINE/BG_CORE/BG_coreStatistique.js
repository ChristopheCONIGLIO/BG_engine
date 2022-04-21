class BG_coreStatistique {
	constructor() {	
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
	}
	
	
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
		return this.bg_g_renderEngineTimeLisse;
	}
	setRenderEngineTimeLisse(value){
		this.bg_g_renderEngineTimeLisse = value;
	}

	getRenderEngineFpsLisse(){
		return this.bg_g_renderEngineFpsLisse;
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

