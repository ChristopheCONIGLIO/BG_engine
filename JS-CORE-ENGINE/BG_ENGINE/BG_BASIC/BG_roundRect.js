/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_roundRect extends BG_coreObjectBasic{
	constructor(stat,context,pX,pY,sX,sY,round,color) {
		super(stat,context,pX,pY,sX,sY,color);
		this.p_round	= round;
	}
	
	
	drawObj(decX,decY,zoom){
		if( this.visible == true){
			let px = decX+this.p_pX*zoom;
			let py = decY+this.p_pY*zoom;
			let pSX = this.p_sX*zoom;
			let pSY = this.p_sY*zoom;
			if( px-pSX > this.stat.getScreenWidth())	return;
			if( py-pSY > this.stat.getScreenHeight())	return;
			if( px + pSX < 0)		return;
			if( py + pSY < 0)		return;
			
			this.roundRect(decX+this.p_pX*zoom, decY+this.p_pY*zoom, this.p_sX*zoom, this.p_sY*zoom, this.p_round*zoom, true, false,this.p_color);
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	

	setRound(round){
		this.p_round = round;
	}
	/* 
	
		local function

	*/
	roundRect(x, y, width, height, radius, fill, stroke,color) {
		
		if( this.rotation != 0){
			this.p_ctx.translate(x+width/2,y+height/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-x-width/2,-y-height/2);
		}
		
		if (typeof stroke == 'undefined') {
		stroke = true;
		}
		if (typeof radius === 'undefined') {
		radius = 5;
		}
		if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
		} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius) {
		  radius[side] = radius[side] || defaultRadius[side];
		}
		}
		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.fillStyle = color;
		this.p_ctx.beginPath();
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
		if (fill) {
			this.p_ctx.fill();
		}
		if (stroke) {
			this.p_ctx.stroke();
		}
		this.p_ctx.globalAlpha = 1;

		if( this.rotation != 0){
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}
	
}
