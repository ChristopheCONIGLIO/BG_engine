class BG_rect extends BG_coreObjectBasic{
	constructor(stat,context,pX,pY,sX,sY,color) {
		super(stat,context,pX,pY,sX,sY,color);
	}
	
	drawObj(decX,decY,zoom){
		
		let px = decX+this.p_pX*zoom;
		let py = decY+this.p_pY*zoom;
		let pSX = this.p_sX*zoom;
		let pSY = this.p_sY*zoom;
		if( px-pSX > this.stat.getScreenWidth())	return;
		if( py-pSY > this.stat.getScreenHeight())	return;
		if( px + pSX < 0)		return;
		if( py + pSY < 0)		return;
		
		this.drawRect(this.p_ctx,decX+this.p_pX*zoom,decY+this.p_pY*zoom,this.p_sX*zoom,this.p_sY*zoom,this.p_color);
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
	}
	
	drawRect(context, x, y, width, height ,color) {
		context.beginPath();
		context.rect(x,y ,width,height);
		context.fillStyle = color;
		context.fill(); 
	}
	
		
}
