/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_polygone extends BG_coreObjectBasic{
	constructor(bg,onBoard,arrayPoint,color) {
		super(bg,onBoard,0,0,0,0,color);
		this.setArrayPoint(arrayPoint);
	}
	


	drawObj(decX,decY,zoom){
		if( this.visible == true){
			if( this.p_onBoard == true){
				// calcul if form must be drawed
				// basé sur les dimensions max du polygone 
				let px = decX+this.p_pX*zoom;
				let py = decY+this.p_pY*zoom;
				let pSX = this.p_sX*zoom;
				let pSY = this.p_sY*zoom;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;
				
				this.drawPoly(decX,decY,zoom);			
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			}
			else{
				// calcul if form must be drawed
				// basé sur les dimensions max du polygone 
				let px = this.p_pX;
				let py = this.p_pY;
				let pSX = this.p_sX;
				let pSY = this.p_sY;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;
				
				this.drawPoly(1,1,1.0);			
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			}
		}
	}


	/*

		public function

	*/
	setArrayPoint(arrayPoint){
		this.p_arrayPoint = arrayPoint;
		let minX = arrayPoint[0][0];
		let minY = arrayPoint[0][1];
		let maxX = arrayPoint[0][0];
		let maxY = arrayPoint[0][1];
		// un peu d'algo ... (a optimiser ,)
		for(var j = 0; j < this.p_arrayPoint.length; j++){
			if( arrayPoint[j][0] < minX) minX = arrayPoint[j][0];
			if( arrayPoint[j][1] < minY) minY = arrayPoint[j][1];
			if( arrayPoint[j][0] > maxX) maxX = arrayPoint[j][0];
			if( arrayPoint[j][1] > maxY) maxY = arrayPoint[j][1];
		}
		this.p_pX 		= minX;
		this.p_pY		= minY;
		this.p_sX		= maxX-minX;
		this.p_sY		= maxY-minY; 
	}


	
	/* 

		local function

	*/
	drawPoly(decX,decY,zoom) {
		
			var x = decX+this.p_pX*zoom;
			var y = decY+this.p_pY*zoom;
			var width = this.p_sX*zoom;
			var height = this.p_sY*zoom;

			if( this.rotation != 0){
				this.p_ctx.translate(x+width/2,y+height/2);
				this.p_ctx.rotate(this.rotation * Math.PI / 180);
				this.p_ctx.translate(-x-width/2,-y-height/2);
			}

			this.p_ctx.beginPath();
			this.p_ctx.globalAlpha = this.alpha;
			for(var j = 0; j < this.p_arrayPoint.length; j++){
				if( j == 0) this.p_ctx.moveTo(decX+this.p_arrayPoint[j][0]*zoom, decY+this.p_arrayPoint[j][1]*zoom);
				else		this.p_ctx.lineTo(decX+this.p_arrayPoint[j][0]*zoom, decY+this.p_arrayPoint[j][1]*zoom);
			}
			this.p_ctx.fillStyle = this.p_color;
			this.p_ctx.fill();
			this.p_ctx.globalAlpha = 1;

			if( this.rotation != 0){
				this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
			

	}
	
		
}
