class BG_circle extends BG_coreObjectBasic{
	constructor(stat,context,pX,pY,size,color) {
		super(stat,context,pX,pY,size,size,color);
	}
	
	drawObj(decX,decY,zoom){
		
		let px = decX+this.p_pX*zoom;
		let py = decY+this.p_pY*zoom;
		let pS = this.p_sX*zoom;
		if( px-pS > this.stat.getScreenWidth())	return;
		if( py-pS > this.stat.getScreenHeight())	return;
		if( px + pS < 0)		return;
		if( py + pS < 0)		return;
		
		this.drawCircle(this.p_ctx,px,py,pS,this.p_color);
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
	}
	
	drawCircle(context, x, y, size ,color) {
		context.beginPath();
		context.arc(x, y, size/2, 0, 2*Math.PI, 0);
		context.fillStyle = color;
		context.fill(); 
	}
	
		
}

