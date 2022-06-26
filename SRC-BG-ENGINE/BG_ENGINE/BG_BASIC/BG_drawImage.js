/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_drawImage extends BG_coreObjectBasic{
	constructor(bg,onBoard,layer,pX,pY,sX,sY,urlImage) {
		super(bg,onBoard,layer,pX,pY,sX,sY,0);
		this.p_bg.addObject(this,this.p_layer);

		this.img = document.createElement("img");
		this.img.src = urlImage;
	}

	/* 

		public function accesseur get/set

	*/
	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
	}
	setPosX(pX){
		this.p_pX = pX;
	}
	setPosY(pY){
		this.p_pY = pY;
	}
	getPosX(){
		return this.p_pX;
	}
	getPosY(){
		return this.p_pY;
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
	getDimX(){
		return this.p_sX;
	}
	getDimY(){
		return this.p_sY;
	}


	/*


	*/

	drawObj(decX,decY,zoom){
		if( this.visible == true){
			let px,py,pSX,pSY;
			if( this.p_onBoard == true){
				// calcul limit of form
				px = decX+this.p_pX*zoom;
				py = decY+this.p_pY*zoom;
				pSX = this.p_sX*zoom;
				pSY = this.p_sY*zoom;
			} else{
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
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pSX,pSY);
			// draw the form
			this.drawImage(px,py,pSX,pSY);
		}
	}


	
	/* 
		
		local function

	*/
	drawImage(x,y,width,height){
		if( this.rotation != 0){
			this.p_ctx.translate(x+width/2,y+height/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-x-width/2,-y-height/2);
		}

		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.drawImage(this.img, x,y,width,height);
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		this.p_ctx.globalAlpha = 1;
		
		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}


}
