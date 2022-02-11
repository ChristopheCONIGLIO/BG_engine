class BG_drawImage extends BG_coreObjectBasic{
	constructor(stat,context,pX,pY,sX,sY,urlImage) {
		super(stat,context,pX,pY,sX,sY,0);

		this.img = document.createElement("img");
		this.img.src = urlImage;
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

		this.p_ctx.drawImage(this.img, decX+this.p_pX*zoom,decY+this.p_pY*zoom,this.p_sX*zoom,this.p_sY*zoom);
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
	}

}
