class BG_coreObjectBasic {
	constructor(stat,context,pX,pY,sX,sY,color) {
		this.stat		= stat;
		this.p_ctx		= context;
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
	
	
	drawObj(decX,decY,zoom){
	}
	
	enterFrame(){
	}
	
	
	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
	}
	setDim(sX,sY){
		this.p_sX = sX;
		this.p_sY = sY;
	}
	setDimX(sX){
		this.p_sX = sX;
	}
	setDimY(sY){
		this.p_sY = sY;
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

}