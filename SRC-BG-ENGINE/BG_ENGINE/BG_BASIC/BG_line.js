/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_line extends BG_coreObjectBasic{
	constructor(bg,onBoard,fixed,layer,p1X,p1Y,p2X,p2Y,thickness,color) {
		
		if( color == undefined){
			super(bg,onBoard,false,fixed,layer,p1X,p1Y,p2X,thickness);
			this.setThickness(p2Y);
			this.setPoint(layer,p1X,p1Y,p2X);
		}
		else{
			super(bg,onBoard,fixed,layer,p1X,p1Y,p2X,p2Y,color);
			this.setThickness(thickness);
			this.setPoint(p1X,p1Y,p2X,p2Y);
		}
		
		/*super(bg,onBoard,layer,p1X,p1Y,p2X,p2Y,color);
		this.setThickness(thickness);
		this.setPoint(p1X,p1Y,p2X,p2Y);
*/

		this.p_bg.addObject(this,this.p_layer);

		
	}
	

	/* 

		public function accesseur get/set

	*/
	setThickness(thickness){
		this.p_thickness = thickness;
	}
	getThickness(){
		return this.p_thickness;
	}
	setPoint(p1X,p1Y,p2X,p2Y){
		this.p_p1X		= p1X;
		this.p_p1Y		= p1Y;
		this.p_p2X		= p2X;
		this.p_p2Y		= p2Y;
	}
	setPoint1(p1X,p1Y){
		this.p_p1X		= p1X;
		this.p_p1Y		= p1Y;
	}
	setPoint2(p2X,p2Y){
		this.p_p2X		= p2X;
		this.p_p2Y		= p2Y;
	}
	getPoints(){
		return [[this.p_p1X,this.p_p1Y],[this.p_p2X,this.p_p2Y]];
	}
	getPoint1(){
		return [this.p_p1X,this.p_p1Y];
	}
	getPoint2(){
		return [this.p_p2X,this.p_p2Y];
	}

	/*


	*/

	drawObj(decX,decY,zoom){
		if( this.visible == true){
			
			//on calcule un carré autour de la ligne
			// 1 - Tout dabord on cherche le point le plus en haut a gauche
			let minX = this.p_p1X;
			let minY = this.p_p1Y;
			if( this.p1X > this.p_p2X) minX =  this.p_p2X;
			if( this.p1Y > this.p_p2Y) minY =  this.p_p2X;
			// 2 - On calcul la distance entre les deux points
			let dis = Math.sqrt((this.p_p1X - this.p_p2X) * (this.p_p1X - this.p_p2X) + (this.p_p1Y - this.p_p2Y) * (this.p_p1Y - this.p_p2Y));
			
			if( this.p_fixedSize == true){
				let px = decX + (minX-dis/2) * zoom;
				let py = decY + (minY-dis/2) * zoom;
				let pSX = dis*2 * zoom;
				let pSY = dis*2 * zoom;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;

				let px1 = decX+this.p_p1X*zoom;
				let py1 = decY+this.p_p1Y*zoom;
				let px2 = decX+this.p_p2X*zoom;
				let py2 = decY+this.p_p2Y*zoom;
				let cx  = (px1+px2)/2;
				let cy  = (py1+py2)/2;

				var pts1 = this.tools_disPointFromCenter (px1,py1, cx,cy, dis/2);
				var pts2 = this.tools_disPointFromCenter (px2,py2, cx,cy, dis/2);

				if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pSX,pSY);
				this.drawLine(pts1[0],pts1[1],pts2[0],pts2[1],this.p_color,1);
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			} 
			else if( this.p_onBoard == true){
				let px = decX + (minX-dis/2) * zoom;
				let py = decY + (minY-dis/2) * zoom;
				let pSX = dis*2 * zoom;
				let pSY = dis*2 * zoom;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;

				if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pSX,pSY);
				this.drawLine(decX+this.p_p1X*zoom,decY+this.p_p1Y*zoom,decX+this.p_p2X*zoom,decY+this.p_p2Y*zoom,this.p_color,zoom);
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			} else {
				let px = (minX-dis/2);
				let py = (minY-dis/2);
				let pSX = dis*2;
				let pSY = dis*2;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;
				if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pSX,pSY);
				this.drawLine(this.p_p1X,this.p_p1Y,this.p_p2X,this.p_p2Y,this.p_color,1);
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			}

		}
	}
	





	/* 
		
		local function

	*/

	drawLine(p1X,p1Y,p2X,p2Y,color,zoom) {

		if( this.rotation != 0){
			this.p_ctx.translate(p1X+(p2X-p1X)/2,p1Y+(p2Y-p1Y)/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-p1X-(p2X-p1X)/2,-p1Y-(p2Y-p1Y)/2);
		}

		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.moveTo(p1X,p1Y);
		this.p_ctx.lineTo(p2X,p2Y);
		this.p_ctx.lineWidth = this.p_thickness*zoom;
		this.p_ctx.strokeStyle = color;
		this.p_ctx.stroke();
		this.p_ctx.globalAlpha = 1;

		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}

	}
	
	getInfo2Points(){
		var arrayXpoints = this.getInfoPoints();
		let pt1 = [
			(arrayXpoints[0][0]+arrayXpoints[1][0])/2,
			(arrayXpoints[0][1]+arrayXpoints[1][1])/2
		];
		let pt2 = [
			(arrayXpoints[2][0]+arrayXpoints[3][0])/2,
			(arrayXpoints[2][1]+arrayXpoints[3][1])/2
		];
		return [pt1,pt2];
	}
	getInfoPoints(){

		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;

		let arrayXpoints = new Array(); 
		
		if( this.p_fixedSize == true){
			let px1 = decX+this.p_p1X*zoom;
			let py1 = decY+this.p_p1Y*zoom;
			let px2 = decX+this.p_p2X*zoom;
			let py2 = decY+this.p_p2Y*zoom;
			let cx  = (px1+px2)/2;
			let cy  = (py1+py2)/2;
			let dis = Math.sqrt((this.p_p1X - this.p_p2X) * (this.p_p1X - this.p_p2X) + (this.p_p1Y - this.p_p2Y) * (this.p_p1Y - this.p_p2Y));
			

			var pts1 = this.tools_disPointFromCenter (px1,py1, cx,cy, dis/2);
			var pts2 = this.tools_disPointFromCenter (px2,py2, cx,cy, dis/2);
			
			var tab = this.tools_rotatePointFromCenter (pts2[0],pts2[1], pts1[0],pts1[1], -90);
			var pts = this.tools_disPointFromCenter (tab[0],tab[1],pts1[0],pts1[1],(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (pts2[0],pts2[1], pts1[0],pts1[1], 90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],pts1[0],pts1[1],(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (pts1[0],pts1[1], pts2[0],pts2[1], -90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],pts2[0],pts2[1],(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (pts1[0],pts1[1], pts2[0],pts2[1], 90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],pts2[0],pts2[1],(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

		}
		else if( this.p_onBoard == true){
			let px1 = decX+this.p_p1X*zoom;
			let py1 = decY+this.p_p1Y*zoom;
			let px2 = decX+this.p_p2X*zoom;
			let py2 = decY+this.p_p2Y*zoom;
			let cx  = (px1+px2)/2;
			let cy  = (py1+py2)/2;


			var tab = this.tools_rotatePointFromCenter (px2,py2, px1,py1, -90);
			var pts = this.tools_disPointFromCenter (tab[0],tab[1],px1,py1,(this.p_thickness*zoom)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (px2,py2, px1,py1, 90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],px1,py1,(this.p_thickness*zoom)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (px1,py1, px2,py2, -90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],px2,py2,(this.p_thickness*zoom)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (px1,py1, px2,py2, 90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],px2,py2,(this.p_thickness*zoom)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	
			
			
		}
		else{
			let px1 = this.p_p1X;
			let py1 = this.p_p1Y;
			let px2 = this.p_p2X;
			let py2 = this.p_p2Y;
			let cx  = (px1+px2)/2;
			let cy  = (py1+py2)/2;


			var tab = this.tools_rotatePointFromCenter (px2,py2, px1,py1, -90);
			var pts = this.tools_disPointFromCenter (tab[0],tab[1],px1,py1,(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (px2,py2, px1,py1, 90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],px1,py1,(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (px1,py1, px2,py2, -90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],px2,py2,(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	

			tab = this.tools_rotatePointFromCenter (px1,py1, px2,py2, 90);
			pts = this.tools_disPointFromCenter (tab[0],tab[1],px2,py2,(this.p_thickness)/2);
			pts = this.tools_rotatePointFromCenter (pts[0],pts[1], cx,cy, this.rotation);
			arrayXpoints.push([pts[0],pts[1]]);	
		}
		return arrayXpoints;
	}

	getMouseOver(){
		var arrayXpoints = this.getInfoPoints();
		//this.tools_drawExactContour(arrayXpoints);
		
		this.mouseOver = this.tools_pointInsidePolygone(
				arrayXpoints,
				this.p_bg.mouseX,
				this.p_bg.mouseY
				);
		return this.mouseOver;
	}
	tools_drawExactContour(arr){	 //arr = tab of X points	
		if( arr.length == 0 ) return ;
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

	tools_distance($c1Px,$c1Py,$c2Px,$c2Py){
        return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
    }
}
