/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_rect extends BG_coreObjectBasic{
	constructor(bg,onBoard,pX,pY,sX,sY,color) {
		super(bg,onBoard,pX,pY,sX,sY,color);
	}
	
	drawObj(decX,decY,zoom){
		if( this.visible == true){

			if( this.p_onBoard == true){
				// calcul if form must be drawed
				let px = decX+this.p_pX*zoom;
				let py = decY+this.p_pY*zoom;
				let pSX = this.p_sX*zoom;
				let pSY = this.p_sY*zoom;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;
				
				// draw the form
				this.drawRect(px,py,pSX,pSY,this.p_color);
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			}
			else{
				// calcul if form must be drawed
				let px = this.p_pX;
				let py = this.p_pY;
				let pSX = this.p_sX;
				let pSY = this.p_sY;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;
				
				// draw the form
				this.drawRect(px,py,pSX,pSY,this.p_color);
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			}
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
