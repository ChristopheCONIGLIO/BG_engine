/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_text extends BG_coreObjectBasic{
	constructor(bg,onBoard,fixed,layer,pX,pY,size,color) {
		
		if( color == undefined){
			super(bg,onBoard,false,fixed,layer,pX,0,0,size);
			this.p_size = pY;
		}
		else{
			super(bg,onBoard,fixed,layer,pX,pY,0,0,color);
			this.p_size = size;
		}
			
		this.p_bg.addObject(this,this.p_layer);

		this.font = "Arial";
		this.text = "";
		this.bold = false;

	}
	
	/* 
		fonctions public
	*/

	setFont(value){
		this.font = value; 
	}
	getFont(){
		return this.font;
	}
	setBold(value){
		if( value != true && value != false) this.bold = false;
		this.bold = value; 
	}
	getBold(){
		return this.bold;
	}

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
	getWidthText(){	//la taille sans le zoom
		this.p_ctx.font = this.macroTraceCssText(1);
		return this.p_ctx.measureText(this.text).width;
	}
	getWidthTextWithZoom(zoom){	//la taille dépend du zoom de la carte !!!!!
		this.p_ctx.font = this.macroTraceCssText(zoom);
		return this.p_ctx.measureText(this.text).width;
	}
 	//----------------------------------






	
	drawObj(decX,decY,zoom){
		if( this.visible == true){
			
			var info = this.getLocalInfo();
			let px  = info[0];
			let py  = info[1];
			let pSX = info[2];
			let pSY = info[3];
			let size = info[4];
			
			//determine if form must be draw
			/*if( px-pSX > this.stat.getScreenWidth())	return;
			if( py-this.p_size-pSY > this.stat.getScreenHeight())	return;
			if( px + pSX < 0)		return;
			if( py-this.p_size + pSY < 0)		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py-this.p_size,pSX,pSY);
			*/ // commentaire :  A revoir car problèle sur gros texte
			// draw the form
			this.drawText(px,py,pSX,pSY,size);	
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	
	 
	/* 
		locales functions 
	*/
	macroTraceCssText(zoom){
		if( this.bold == true)	return "bold "+(zoom*this.p_size) +"px "+this.font;
		else					return (zoom*this.p_size) +"px "+this.font;
	}
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
		this.p_ctx.font = this.macroTraceCssText(zoom);
		this.p_ctx.fillStyle = this.p_color;
		this.p_ctx.fillText(this.text,x,y);
		
		
		this.p_ctx.fill(); 
		
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		this.p_ctx.globalAlpha = 1;

		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}

	getLocalInfo(){
		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;
		
		
		let px,py,pSX,pSY,size;
		if( this.p_fixedSize == true){
			
			pSX = this.getWidthTextWithZoom(1.0);
			pSY = this.p_size;
			px = decX+this.p_pX*zoom - pSX/2;
			py = decY+this.p_pY*zoom + pSY/2;
			size = 1.0;
		}
		else if( this.p_onBoard == true){
			// calcul limit of form
			px = decX+this.p_pX*zoom;
			py = (zoom*this.p_size) + decY+this.p_pY*zoom;
			pSX = this.getWidthTextWithZoom(zoom);
			pSY = zoom*this.p_size;
			size = zoom;	
		}
		else{
			// calcul limit of form
			px = this.p_pX;
			py = this.p_size + this.p_pY;
			pSX = this.getWidthTextWithZoom(1.0);
			pSY = this.p_size;
			size = 1.0;
		}

		return [px,py,pSX,pSY,size];
	}

	

	getInfoPoints(){

		var info = this.getLocalInfo();
		let px  = info[0];
		let py  = info[1];
		let pSX = info[2];
		let pSY = info[3];

		//local corection ?		
		py = py - pSY;
		//with this adjustment the 4 poitns are very correct Good !!!

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
		return array4points;
	}


	getMouseOver(){
		var array4points = this.getInfoPoints();
		//this.drawExactContour(array4points);
		this.mouseOver = this.tools_pointInsidePolygone(
				array4points,
				this.p_bg.mouseX,
				this.p_bg.mouseY
				);
		return this.mouseOver;
	}

	
	drawExactContour(arr){	 //arr = tab of four points	
		this.p_ctx.beginPath();
		this.p_ctx.moveTo(arr[0][0],arr[0][1]);
		this.p_ctx.lineTo(arr[1][0],arr[1][1]);
		this.p_ctx.lineTo(arr[2][0],arr[2][1]);
		this.p_ctx.lineTo(arr[3][0],arr[3][1]);
		this.p_ctx.lineTo(arr[0][0],arr[0][1]);
		this.p_ctx.lineWidth = 4;
		this.p_ctx.strokeStyle = "#FF0000";
		this.p_ctx.stroke();
	}


}
