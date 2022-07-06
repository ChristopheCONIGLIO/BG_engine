/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_rect extends BG_coreObjectBasic{
	constructor(bg,onBoard,fixed,layer,pX,pY,sX,sY,color) {
		if( color == undefined){
			super(bg,onBoard,false,fixed,layer,pX,pY,sX,sY);
		}
		else{
			super(bg,onBoard,fixed,layer,pX,pY,sX,sY,color);
		}

		
		this.p_bg.addObject(this,this.p_layer);
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
			
			var info = this.getLocalInfo();
			let px  = info[0];
			let py  = info[1];
			let pSX = info[2];
			let pSY = info[3];

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

	getLocalInfo(){
		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;
		let px,py,pSX,pSY;
		
		if( this.p_fixedSize == true){
			px = decX+this.p_pX*zoom-this.p_sX/2;
			py = decY+this.p_pY*zoom-this.p_sY/2;
			pSX = this.p_sX;
			pSY = this.p_sY;
		}
		else if( this.p_onBoard == true){
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
		return [px,py,pSX,pSY];
	}

	getMouseOver(){
		var info = this.getLocalInfo();
		let px  = info[0];
		let py  = info[1];
		let pSX = info[2];
		let pSY = info[3];
		let array4points = new Array([0,0],[0,0],[0,0],[0,0]); //limit position
		//calcul 4 points
		let cx = px+pSX/2;
		let cy = py+pSY/2;
		array4points[0][0] =  cx + pSX/2;
		array4points[0][1] =  cy + pSY/2;
		array4points[1][0] =  cx - pSX/2;
		array4points[1][1] =  cy + pSY/2;
		array4points[3][0] =  cx + pSX/2;
		array4points[3][1] =  cy - pSY/2;
		array4points[2][0] =  cx - pSX/2;
		array4points[2][1] =  cy - pSY/2;
		var tab = this.tools_rotatePointFromCenter (array4points[0][0],array4points[0][1], cx,cy, this.rotation);
		array4points[0][0] = tab[0];
		array4points[0][1] = tab[1];
		tab = this.tools_rotatePointFromCenter (array4points[1][0],array4points[1][1], cx,cy, this.rotation);
		array4points[1][0] = tab[0];
		array4points[1][1] = tab[1];
		tab = this.tools_rotatePointFromCenter (array4points[2][0],array4points[2][1], cx,cy, this.rotation);
		array4points[2][0] = tab[0];
		array4points[2][1] = tab[1];
		tab = this.tools_rotatePointFromCenter (array4points[3][0],array4points[3][1], cx,cy, this.rotation);
		array4points[3][0] = tab[0];
		array4points[3][1] = tab[1];
		
		this.mouseOver = this.tools_pointInsidePolygone(
				array4points,
				this.p_bg.mouseX,
				this.p_bg.mouseY
				);
		return this.mouseOver;
	}
		
}
