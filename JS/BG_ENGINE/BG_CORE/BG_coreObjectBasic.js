class BG_coreObjectBasic {
	constructor(stat,context,pX,pY,sX,sY,color) {
		this.stat		= stat;
		this.p_ctx		= context;
		this.p_sX 		= sX;
		this.p_sY		= sY;
		this.p_pX		= pX;
		this.p_pY		= pY;  
		this.p_color 	= color; 				
	}
	
	
	drawObj(decX,decY,zoom){
	}
	
	enterFrame(){
	}
	
	
	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
	}
}