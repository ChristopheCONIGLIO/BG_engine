/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_rect extends BG_coreObjectBasic{
	constructor(bg,onBoard,layer,pX,pY,sX,sY,color) {
		super(bg,onBoard,layer,pX,pY,sX,sY,color);
		this.p_bg.addObject(this,this.p_layer);
	}
	
	drawObj(decX,decY,zoom){
		if( this.visible == true){
			let px,py,pSX,pSY;
			if( this.p_onBoard == true){
				// calcul limit of form
				px = decX+this.p_pX*zoom;
				py = decY+this.p_pY*zoom;
				pSX = this.p_sX*zoom;
				pSY = this.p_sY*zoom;
			}
			else{
				// calcul limit of form
				px = this.p_pX;
				py = this.p_pY;
				pSX = this.p_sX;
				pSY = this.p_sY;
			}
			//determine if form must be draw
			if( px-pSX > this.stat.getScreenWidth())	return;
			if( py-pSY > this.stat.getScreenHeight())	return;
			if( px + pSX < 0)		return;
			if( py + pSY < 0)		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px-pSX*0.20,py-pSY*0.20,pSX+pSX*0.40,pSY+pSX*0.40);
			// draw the form
			this.drawRect(px,py,pSX,pSY,this.p_color);
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	
	/* 

		public function

	*/
	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
	}
	setDim(sX,sY){
		this.p_sX = sX;
		this.p_sY = sY;
	}
	/* 

		local function

	*/
	drawRect(x, y, width, height ,color) {
		
		if( this.rotation != 0){
			this.p_ctx.translate(x+width/2,y+height/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-x-width/2,-y-height/2);
		}
		
		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.rect(x,y ,width,height);
		this.p_ctx.fillStyle = color;
		this.p_ctx.fill(); 
		this.p_ctx.globalAlpha = 1;
					
		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}

	}
	
		
}
