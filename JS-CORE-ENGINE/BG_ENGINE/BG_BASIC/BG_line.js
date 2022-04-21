/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_line extends BG_coreObjectBasic{
	constructor(bg,onBoard,p1X,p1Y,p2X,p2Y,thickness,color) {
		super(bg,onBoard,p1X,p1Y,p2X,p2Y,color);
		this.setThickness(thickness);
		this.setPoint(p1X,p1Y,p2X,p2Y);
	}
	
	drawObj(decX,decY,zoom){
		if( this.visible == true){
			
			//on calcule un carré autour de la ligne
			// 1 - Tout dabord on cherche le point le plus en haut a gauche
			let minX = this.p_p1X;
			let minY = this.p_p1Y;
			if( this.p1X > this.p_p2X) minX =  this.p_p2X;
			if( this.p1Y > this.p_p2Y) minY =  this.p_p2X;
			// 2 - On calcul la distanc entre les deux points
			let dis = Math.sqrt((this.p_p1X - this.p_p2X) * (this.p_p1X - this.p_p2X) + (this.p_p1Y - this.p_p2Y) * (this.p_p1Y - this.p_p2Y));
			dis += this.p_thickness/2;

			if( this.p_onBoard == true){
				

				let px = decX + (minX-dis/2) * zoom;
				let py = decY + (minY-dis/2) * zoom;
				let pSX = dis * zoom;
				let pSY = dis * zoom;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;

				this.drawLine(decX+this.p_p1X*zoom,decY+this.p_p1Y*zoom,decX+this.p_p2X*zoom,decY+this.p_p2Y*zoom,this.p_color);
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			} else {
				let px = (minX-dis/2);
				let py = (minY-dis/2);
				let pSX = dis;
				let pSY = dis;
				if( px-pSX > this.stat.getScreenWidth())	return;
				if( py-pSY > this.stat.getScreenHeight())	return;
				if( px + pSX < 0)		return;
				if( py + pSY < 0)		return;

				this.drawLine(this.p_p1X,this.p_p1Y,this.p_p2X,this.p_p2Y,this.p_color);
				this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			}

		}
	}
	


	setThickness(thickness){
		this.p_thickness = thickness;
	}
	setPoint(p1X,p1Y,p2X,p2Y){
		this.p_p1X		= p1X;
		this.p_p1Y		= p1Y;
		this.p_p2X		= p2X;
		this.p_p2Y		= p2Y;
	}

	/* 
		
		local function

	*/

	drawLine(p1X,p1Y,p2X,p2Y,color) {

		if( this.rotation != 0){
			this.p_ctx.translate(p1X+(p2X-p1X)/2,p1Y+(p2Y-p1Y)/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-p1X-(p2X-p1X)/2,-p1Y-(p2Y-p1Y)/2);
		}

		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.moveTo(p1X,p1Y);
		this.p_ctx.lineTo(p2X,p2Y);
		this.p_ctx.lineWidth = this.p_thickness;
		this.p_ctx.strokeStyle = color;
		this.p_ctx.stroke();
		this.p_ctx.globalAlpha = 1;

		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}

	}
	
		
}
