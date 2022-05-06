/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_circle extends BG_coreObjectBasic{
	constructor(bg,onBoard,pX,pY,size,color) {
		super(bg,onBoard,pX,pY,size,size,color);
	}
	
	//PS : Rotation has not action of thius form so it's not managed :)
	drawObj(decX,decY,zoom){
		if( this.visible == true){
			let px,py,pS;
			if( this.p_onBoard == true){
				// calcul limit of form
				px = decX+this.p_pX*zoom;
				py = decY+this.p_pY*zoom;
				pS = this.p_sX*zoom;
			}
			else{
				// calcul limit of form
				px = this.p_pX;
				py = this.p_pY;
				pS = this.p_sX;
			}
			//determine if form must be draw
			if( px-pS > this.stat.getScreenWidth())	return;
			if( py-pS > this.stat.getScreenHeight())	return;
			if( px + pS < 0)		return;
			if( py + pS < 0)		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pS,pS);
			// draw the form
			this.drawCircle(px,py,pS,this.p_color);
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	
	/* 
		
		public function

	*/
	setDim(value){
		this.p_sX = value;
	}
	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
	}




	/* 
		
		local function

	*/
	drawCircle(x, y, size ,color) {
		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.arc(x+size/2, y+size/2, size/2, 0, 2*Math.PI, 0);
		this.p_ctx.fillStyle = color;
		this.p_ctx.fill(); 
		this.p_ctx.globalAlpha = 1;
	}
	
		
}

