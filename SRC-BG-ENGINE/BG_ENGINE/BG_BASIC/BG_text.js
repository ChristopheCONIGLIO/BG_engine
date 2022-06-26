/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_text extends BG_coreObjectBasic{
	constructor(bg,onBoard,layer,pX,pY,size,color) {
		super(bg,onBoard,layer,pX,pY,0,0,color);
		this.p_bg.addObject(this,this.p_layer);
		
		this.p_size = size;
		this.font = "Arial";
		this.text = "";

	}
	
	/* 
		fonctions public
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

	setDim(arg){
		this.p_size = arg;
	}
	getDim(){
		return this.p_size;
	}

	setText(text){
		this.text = text;
	}
	getText(text){
		return this.text;
	}
	getWidthText(zoom){	//la taille sans le zoom
		this.p_ctx.font = (this.p_size) +"px "+this.font;
		return this.p_ctx.measureText(this.text).width;
	}
	getWidthTextWithZoom(zoom){	//la taille dépend du zoom de la carte !!!!!
		this.p_ctx.font = (zoom*this.p_size) +"px "+this.font;
		return this.p_ctx.measureText(this.text).width;
	}
 	//----------------------------------






	
	drawObj(decX,decY,zoom){
		if( this.visible == true){
			let px,py,pSX,pSY,size;
			if( this.p_onBoard == true){
				// calcul limit of form
				px = decX+this.p_pX*zoom;
				py = (zoom*this.p_size) + decY+this.p_pY*zoom;
				pSX = this.getWidthTextWithZoom(zoom);
				pSY = zoom*this.p_size;
				size = zoom;	
				//determine if form must be draw
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-(zoom*this.p_size)-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py-(zoom*this.p_size) + pSY < 0)		return;
				if( this.p_bg.debugContour == true) this.drawLimitContour(px,py-(zoom*this.p_size),pSX,pSY);
			}
			else{
				// calcul limit of form
				px = this.p_pX;
				py = this.p_size + this.p_pY;
				pSX = this.getWidthTextWithZoom(1.0);
				pSY = this.p_size;
				size = 1.0;
				//determine if form must be draw
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-this.p_size-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py-this.p_size + pSY < 0)		return;
				if( this.p_bg.debugContour == true) this.drawLimitContour(px,py-this.p_size,pSX,pSY);
			}
			// draw the form
			this.drawText(px,py,pSX,pSY,size);	
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	
	 
	/* 
		locales functions 
	*/
	drawText(x,y,width,height,zoom){
		if( this.rotation != 0){
			this.p_ctx.translate(x+width/2,y-height/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-x-width/2,-y+height/2);
			/*
			this.p_ctx.translate(x+width/2,y+height/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-x-width/2,-y-height/2);
			*/
		}

		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.font = (zoom*this.p_size) +"px "+this.font;
		this.p_ctx.fillStyle = this.p_color;
		this.p_ctx.fillText(this.text,x,y);
		
		this.p_ctx.fill(); 
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		this.p_ctx.globalAlpha = 1;

		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}





}
