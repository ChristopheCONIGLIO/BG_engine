class BG_coreObjectBasic {
	constructor(bg,onBoard,pX,pY,sX,sY,color) {
		this.p_bg		= bg;
		this.stat		= bg.bg_g_stat;
		this.p_ctx		= bg.bg_g_context;
		this.p_onBoard	= onBoard;
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
	}
	
	enterFrame(){
	}
	
	
	setColor(color){
		this.p_color 	= color; 
	}
	setAlpha(value){
		this.alpha = value;
		if( value < 0) value = 0;
		if( value > 1) value = 1;
	}

	setVisible(arg){
		this.visible =  arg;
	}

	setRotation(arg){
		this.rotation = arg;
		if( arg < 0) this.rotation = 0;
		if( arg > 360) this.rotation = 0;
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