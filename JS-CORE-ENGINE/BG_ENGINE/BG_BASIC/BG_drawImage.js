/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_drawImage extends BG_coreObjectBasic{
	constructor(stat,context,pX,pY,sX,sY,urlImage) {
		super(stat,context,pX,pY,sX,sY,0);

		this.img = document.createElement("img");
		this.img.src = urlImage;
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


			var x = decX+this.p_pX*zoom;
			var y = decY+this.p_pY*zoom;
			var width = this.p_sX*zoom;
			var height = this.p_sY*zoom;

			if( this.rotation != 0){
				this.p_ctx.translate(x+width/2,y+height/2);
				this.p_ctx.rotate(this.rotation * Math.PI / 180);
				this.p_ctx.translate(-x-width/2,-y-height/2);
			}

			this.p_ctx.globalAlpha = this.alpha;
			this.p_ctx.drawImage(this.img, x,y,width,height);
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			this.p_ctx.globalAlpha = 1;
			
			if( this.rotation != 0){
				this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
		}
	}

}
