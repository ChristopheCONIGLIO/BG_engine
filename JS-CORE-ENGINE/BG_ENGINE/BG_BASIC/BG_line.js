class BG_line extends BG_coreObjectBasic{
	constructor(stat,context,p1X,p1Y,p2X,p2Y,color) {
		super(stat,context,p1X,p1Y,p2X,p2Y,color);
		this.p1X		= p1X;
		this.p1Y		= p1Y;
		this.p2X		= p2X;
		this.p2Y		= p2Y;
	}
	
	drawObj(decX,decY,zoom){
		// !!!  pas de gestion de présence ou pas sur l'écran à faire //
		
		this.drawLine(decX+this.p1X*zoom,decY+this.p1Y*zoom,decX+this.p2X*zoom,decY+this.p2Y*zoom,this.p_color);
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
	}
	
	drawLine(p1X,p1Y,p2X,p2Y,color) {
		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.moveTo(p1X,p1Y);
		this.p_ctx.lineTo(p2X,p2Y);
		this.p_ctx.lineWidth = 1;
		this.p_ctx.strokeStyle = color;
		this.p_ctx.stroke();
		this.p_ctx.globalAlpha = 1;
	}
	
		
}
