class BG_coreObjectBasic {
	constructor(bg,onBoard,layer,pX,pY,sX,sY,color) {
		this.p_bg		= bg;
		this.stat		= bg.bg_g_stat;
		this.p_ctx		= bg.bg_g_context;
		this.p_onBoard	= onBoard;
		this.p_layer	= layer; 
		this.p_sX 		= sX;
		this.p_sY		= sY;
		this.p_pX		= pX;
		this.p_pY		= pY;  
		this.p_color 	= color; 

		//attribut local spécifique
		this.alpha			= 1;
		this.visible 		= true;
		this.rotation 		= 0;	

	}
	
	/* 

		local function

	*/
	drawObj(decX,decY,zoom){
		//mettre le code qui trace des objet graphic "contex"
	}
	
	enterFrame(){
		// mettre son code
	}
	
	destructor(){
		// appeler quand l'objet est détruit
		// (permet de supprimer d'autre objet graphique compris dans l'objet lui meme)
	}
	
	//
	// Manipuler l'aspect graphique générique à tout les objets
	//

	// ref du moteur
	// on porpose pas de "set" pour l'instant mais peut etre plus tard
	getRefEngine(){
		return this.p_bg; 
	}

	//calque
	setLayer(layer){
		this.p_layer = layer;
		this.p_bg.changeLayer(this,this.p_layer);
	}
	getLayer(){
		return this.p_layer; 
	}

	//color
	setColor(color){
		this.p_color 	= color; 
	}
	getColor(){
		return this.p_color; 
	}
	
	//transparence
	setAlpha(value){
		this.alpha = value;
		if( value < 0) value = 0;
		if( value > 1) value = 1;
	}
	getAlpha(){
		return this.alpha;
	}

	//visible ou non
	setVisible(arg){
		this.visible =  arg;
	}
	getVisible(arg){
		return this.visible;
	}

	//rotation
	setRotation(arg){
		this.rotation = arg;
		if( arg < 0) this.rotation = 0;
		if( arg > 360) this.rotation = 0;
	}
	getRotation(){
		return this.rotation;
	}





	/* 

		** PRIVATE **

		local function

	*/
	
	// function for debug DO NOT USE
	drawLimitContour(x, y, width, height){
		this.p_ctx.beginPath();
		this.p_ctx.rect(x,y ,width,height);
		this.p_ctx.lineWidth = 1;
		this.p_ctx.strokeStyle = "#FF0000";
		this.p_ctx.stroke();
	}


}