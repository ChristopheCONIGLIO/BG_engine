/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_polygoneBorder extends BG_coreObjectBasic{
	constructor(bg,onBoard,fixed,layer,arrayPoint,color,border,colorBorder,fond) {
		
		super(bg,onBoard,fixed,layer,0,0,0,0,color);
		this.setArrayPoint(arrayPoint);
		this.p_border 	= border;
		this.p_colorBorder = colorBorder;
		this.p_fond		=  fond;
		/*
		if( border != undefined){
			super(bg,onBoard,fixed,layer,0,0,0,0,color);
			this.setArrayPoint(arrayPoint);
			this.p_border = border;
			this.p_fillcolor = fillcolor;
		}
		else{
			super(bg,onBoard,fixed,layer,0,0,0,0,color);
			this.setArrayPoint(arrayPoint);
			this.p_border = border;
		}*/
		
		this.p_bg.addObject(this,this.p_layer);
		
	
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
	getArrayPoint(){
		return this.p_arrayPoint;
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


	/*

	*/

	drawObj(decX,decY,zoom){
		if( this.visible == true){
			
			var info = this.getLocalInfo();
			let px  = info[0];
			let py  = info[1];
			let pSX = info[2];
			let pSY = info[3];
			let size = info[4];
			let ldecX = info[5];
			let ldecY = info[6];
			let border = info[7];
			
			if( px-pSX > this.stat.getScreenWidth())	return;
			if( py-pSY > this.stat.getScreenHeight())	return;
			if( px + pSX < 0)		return;
			if( py + pSY < 0)		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pSX,pSY);
			
			// draw the form
			this.drawPoly(ldecX,ldecY,size,border);		
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}





	
	/* 

		local function

	*/
	

	drawPoly(decX,decY,zoom,border) {
		
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
			let ptsOsave = undefined;
			let pts1save = undefined;
			if( this.p_fixedSize == true){
				var cx = x+width/2;
				var cy = y+height/2;
				
				for(var j = 0; j < this.p_arrayPoint.length; j++){
					
					var pts = this.tools_scalePointFromCenter (
								decX+this.p_arrayPoint[j][0]*zoom,
								decY+this.p_arrayPoint[j][1]*zoom,
								cx,
								cy,
								1/zoom);
					var ptmpX = pts[0];
					var ptmpY = pts[1];
					
					if( j == 0) {
						this.p_ctx.moveTo(ptmpX,ptmpY);
						ptsOsave = pts;
					}
					else		{
						this.p_ctx.lineTo(ptmpX,ptmpY);
						if( j == 1) pts1save = pts;
					}
				}
				if( ptsOsave )this.p_ctx.lineTo(ptsOsave[0],ptsOsave[1]);
				if( pts1save )this.p_ctx.lineTo(pts1save[0],pts1save[1]); // ? how to better optimize ???
			}
			else{
				for(var j = 0; j < this.p_arrayPoint.length; j++){
					if( j == 0) {
						this.p_ctx.moveTo(decX+this.p_arrayPoint[j][0]*zoom, decY+this.p_arrayPoint[j][1]*zoom);
						ptsOsave = [decX+this.p_arrayPoint[j][0]*zoom, decY+this.p_arrayPoint[j][1]*zoom];
					}
					else		{
						this.p_ctx.lineTo(decX+this.p_arrayPoint[j][0]*zoom, decY+this.p_arrayPoint[j][1]*zoom);
						if( j == 1) pts1save = [decX+this.p_arrayPoint[j][0]*zoom, decY+this.p_arrayPoint[j][1]*zoom];
					}
				}
				if( ptsOsave )this.p_ctx.lineTo(ptsOsave[0],ptsOsave[1]);
				if( pts1save )this.p_ctx.lineTo(pts1save[0],pts1save[1]); // ? how to better optimize ???
			}
			if( border > 0)this.p_ctx.lineWidth = border;
			this.p_ctx.strokeStyle = this.p_colorBorder;

			if( this.p_fond){
				this.p_ctx.fillStyle = this.p_color;
				this.p_ctx.fill(); 
			}

			if( border > 0) this.p_ctx.stroke();
			this.p_ctx.globalAlpha = 1;
			
			if( this.rotation != 0){
				this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
			
	}
	//info locales
	getLocalInfo(){
		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;
		let px,py,pSX,pSY,size,ldecX,ldecY;
		let border;
		
		if( this.p_onBoard == true){
			// calcul if form must be drawed
			// basé sur les dimensions max du polygone 
			px = decX+this.p_pX*zoom;
			py = decY+this.p_pY*zoom;
			pSX = this.p_sX*zoom;
			pSY = this.p_sY*zoom;
			size = zoom;
			ldecX = decX;
			ldecY = decY;
			border = this.p_border*zoom;
			if( this.p_fixedSize == true)	border = this.p_border;
		}
		else{
			// calcul if form must be drawed
			// basé sur les dimensions max du polygone 
			px = this.p_pX;
			py = this.p_pY;
			pSX = this.p_sX;
			pSY = this.p_sY;
			size = 1.0;
			ldecX = 1;
			ldecY = 1;
			border = this.p_border;
			
		}
		return [px,py,pSX,pSY,size,ldecX,ldecY,border];
	}


	getInfoPoints(){
		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;

		var x = decX+this.p_pX*zoom;
		var y = decY+this.p_pY*zoom;
		var width = this.p_sX*zoom;
		var height = this.p_sY*zoom;


		let arrayXpoints = new Array(); 
		
		if( this.p_fixedSize == true){
			let cx = decX + (this.p_pX+this.p_sX/2)*zoom;
			let cy = decY + (this.p_pY+this.p_sY/2)*zoom;

			for(var k = 0; k < this.p_arrayPoint.length ; k++){
				var px = decX+this.p_arrayPoint[k][0]*zoom;
				var py = decY+this.p_arrayPoint[k][1]*zoom;
				var tab = this.tools_rotatePointFromCenter (px,py, cx,cy, this.rotation);
				var pts = this.tools_scalePointFromCenter (tab[0],tab[1],cx,cy,1/zoom);
				arrayXpoints.push( [pts[0],pts[1]]);
			}
		}
		else if( this.p_onBoard == true){

			let cx = decX + (this.p_pX+this.p_sX/2)*zoom;
			let cy = decY + (this.p_pY+this.p_sY/2)*zoom;

			for(var k = 0; k < this.p_arrayPoint.length ; k++){
				var px = decX+this.p_arrayPoint[k][0]*zoom;
				var py = decY+this.p_arrayPoint[k][1]*zoom;
				var tab = this.tools_rotatePointFromCenter (px,py, cx,cy, this.rotation);
				arrayXpoints.push( [tab[0],tab[1]]);
			}
		}
		else{
			let cx =  (this.p_pX+this.p_sX/2);
			let cy =  (this.p_pY+this.p_sY/2);

			for(var k = 0; k < this.p_arrayPoint.length ; k++){
				var px = this.p_arrayPoint[k][0];
				var py = this.p_arrayPoint[k][1];
				var tab = this.tools_rotatePointFromCenter (px,py, cx,cy, this.rotation);
				arrayXpoints.push( [tab[0],tab[1]]);
			}
		}
		return arrayXpoints;		
	}

	getMouseOver(){
		
		var arrayXpoints = this.getInfoPoints();
		//this.tools_drawExactContour(arrayXpoints);
		
		let border = this.p_border;
		if( this.p_onBoard == true && this.p_fixedSize == false) border *= this.p_bg.zoomLevel;
		var enveloppeArr =new Array();
		let tmpArr,dis;

		for(var k = 0; k < arrayXpoints.length ; k++){
			//j'ai mes pts
			var P1 = [arrayXpoints[k][0],arrayXpoints[k][1]];
			if( k == arrayXpoints.length-1)	var P2 = [arrayXpoints[0][0],arrayXpoints[0][1]];
			else							var P2 = [arrayXpoints[k+1][0],arrayXpoints[k+1][1]];
			
			//calcul celui de gauche
			tmpArr = this.tools_rotatePointFromCenter (P2[0],P2[1], P1[0],P1[1], -90);
			dis = this.distance(tmpArr[0],tmpArr[1], P1[0],P1[1]);
			tmpArr = this.tools_scalePointFromCenter (tmpArr[0],tmpArr[1], P1[0],P1[1], (border/2)/dis); 
			enveloppeArr.push(tmpArr);
			//calucl celui de droite
			tmpArr = this.tools_rotatePointFromCenter (P1[0],P1[1], P2[0],P2[1], 90);
			dis = this.distance(tmpArr[0],tmpArr[1], P2[0],P2[1]);
			tmpArr = this.tools_scalePointFromCenter (tmpArr[0],tmpArr[1], P2[0],P2[1], (border/2)/dis); 
			enveloppeArr.push(tmpArr);
		}

		//this.tools_drawExactContour(enveloppeArr);
		
		this.mouseOver = this.tools_pointInsidePolygone(
				enveloppeArr,
				this.p_bg.mouseX,
				this.p_bg.mouseY
				);
		return this.mouseOver;
	}
	tools_drawExactContour(arr){	 //arr = tab of X points	
		this.p_ctx.beginPath();
		for(var j = 0; j < arr.length; j++){
			if( j == 0) this.p_ctx.moveTo(arr[j][0], arr[j][1]);
			else		this.p_ctx.lineTo(arr[j][0], arr[j][1]);
		}
		this.p_ctx.lineTo(arr[0][0], arr[0][1]);

		this.p_ctx.lineWidth = 4;
		this.p_ctx.strokeStyle = "#FF0000";
		this.p_ctx.stroke();
	}

	distance($c1Px,$c1Py,$c2Px,$c2Py){
		return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
	}

}
