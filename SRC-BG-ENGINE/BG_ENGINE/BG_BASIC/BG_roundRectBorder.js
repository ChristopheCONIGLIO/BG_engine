/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_roundRectBorder extends BG_coreObjectBasic{
			 
	constructor(bg,onBoard,fixed,layer,pX,pY,sX,sY,round,color,border,colorBorder,fond) {
		super(bg,onBoard,fixed,layer,pX,pY,sX,sY,color);
		this.p_round	= round;
		this.p_border 	= border;
		this.p_colorBorder = colorBorder;
		this.p_fond		=  fond;
		/*if( border != undefined){
			super(bg,onBoard,fixed,layer,pX,pY,sX,sY,color);
			this.p_round	= round;
			this.p_border = border;
			this.p_fillcolor = fillcolor;
		}
		else{
			super(bg,onBoard,fixed,layer,pX,pY,sX,sY,color);
			this.p_round	= round;
			this.p_border = border;
			this.p_fillcolor = undefined;
		}*/
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
	setRound(round){
		this.p_round = round;
	}
	getRound(){
		return this.p_round;
	}
	setFond(value){
		this.p_fond = value;
	}
	getFond(){
		return this.p_fond;
	}
	setColorBorder(value){
		this.p_colorBorder = value;
	}
	getColorBorder(){
		return this.p_colorBorder;
	}
	setBorder(value){
		this.p_border = value;	
	}
	getBorder(){
		return this.p_border;
	}


	drawObj(decX,decY,zoom){
		if( this.visible == true){
			
			var info = this.getLocalInfo();
			let px  = info[0];
			let py  = info[1];
			let pSX = info[2];
			let pSY = info[3];
			let radius = info[4];
			let border = info[5];

			//determine if form must be draw
			if( px-pSX > this.stat.getScreenWidth())	return;
			if( py-pSY > this.stat.getScreenHeight())	return;
			if( px + pSX < 0)		return;
			if( py + pSY < 0)		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pSX,pSY);

			// draw the form
			this.roundRect(px,py,pSX,pSY, radius,this.p_color,border);
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );

		}
	}
	


	/* 
	
		local function

	*/
	roundRect(x, y, width, height, radius,color,border) {
		
		if( this.rotation != 0){
			this.p_ctx.translate(x+width/2,y+height/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-x-width/2,-y-height/2);
		}
		
		/*if (typeof stroke == 'undefined') {
		stroke = true;
		}
		if (typeof radius === 'undefined') {
		radius = 5;
		}*/
		if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
		} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius) {
		  radius[side] = radius[side] || defaultRadius[side];
		}
		}
		this.p_ctx.globalAlpha = this.alpha;
		//this.p_ctx.fillStyle = color;
		this.p_ctx.beginPath();
		this.p_ctx.strokeStyle = this.p_colorBorder;
		if( border > 0) this.p_ctx.lineWidth = border;
		if( border > 0)this.p_ctx.stroke();
		this.p_ctx.moveTo(x + radius.tl, y);
		this.p_ctx.lineTo(x + width - radius.tr, y);
		this.p_ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		this.p_ctx.lineTo(x + width, y + height - radius.br);
		this.p_ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		this.p_ctx.lineTo(x + radius.bl, y + height);
		this.p_ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		this.p_ctx.lineTo(x, y + radius.tl);
		this.p_ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		this.p_ctx.closePath();
		
		
		if( this.p_fond){
			this.p_ctx.fillStyle = color;
			this.p_ctx.fill(); 
		}
		if( border > 0)this.p_ctx.stroke();
		this.p_ctx.globalAlpha = 1;

		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}
	getLocalInfo(){
		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;
		let px,py,pSX,pSY,radius,border;
		
		if( this.p_fixedSize == true){
			px = decX+this.p_pX*zoom-this.p_sX/2;
			py = decY+this.p_pY*zoom-this.p_sY/2;
			pSX = this.p_sX;
			pSY = this.p_sY;
			radius = this.p_round;
			border = this.p_border;
		}
		else if( this.p_onBoard == true){
			// calcul limit of form
			px = decX+this.p_pX*zoom;
			py = decY+this.p_pY*zoom;
			pSX = this.p_sX*zoom;
			pSY = this.p_sY*zoom;
			radius = this.p_round*zoom;
			border = this.p_border*zoom;
		}
		else{
			// calcul limit of form
			px = this.p_pX;
			py = this.p_pY;
			pSX = this.p_sX;
			pSY = this.p_sY;
			radius = this.p_round;
			border = this.p_border;
		}
		return [px,py,pSX,pSY,radius,border];
	}

	getMouseOver(){
		var info = this.getLocalInfo();
		let px  = info[0];
		let py  = info[1];
		let pSX = info[2];
		let pSY = info[3];
		let border =info[5];
		let array4points = new Array([0,0],[0,0],[0,0],[0,0]); //limit position
		//calcul 4 points
		let cx = px+pSX/2;
		let cy = py+pSY/2;
		array4points[0][0] =  cx + pSX/2 + border/2;
		array4points[0][1] =  cy + pSY/2 + border/2;
		array4points[1][0] =  cx - pSX/2 - border/2;
		array4points[1][1] =  cy + pSY/2 + border/2;
		array4points[3][0] =  cx + pSX/2 + border/2;
		array4points[3][1] =  cy - pSY/2 - border/2;
		array4points[2][0] =  cx - pSX/2 - border/2;
		array4points[2][1] =  cy - pSY/2 - border/2;
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
		
		//this.tools_drawExactContour(array4points);

		this.mouseOver = this.tools_pointInsidePolygone(
				array4points,
				this.p_bg.mouseX,
				this.p_bg.mouseY
				);
		return this.mouseOver;
	}

	/*
		drawExactContour(){		
		this.p_ctx.beginPath();
		this.p_ctx.moveTo(this.array4points[0][0],this.array4points[0][1]);
		this.p_ctx.lineTo(this.array4points[1][0],this.array4points[1][1]);
		this.p_ctx.lineTo(this.array4points[2][0],this.array4points[2][1]);
		this.p_ctx.lineTo(this.array4points[3][0],this.array4points[3][1]);
		this.p_ctx.lineTo(this.array4points[0][0],this.array4points[0][1]);
		this.p_ctx.lineWidth = 4;
		this.p_ctx.strokeStyle = "#FF0000";
		this.p_ctx.stroke();
	}*/
	
}
