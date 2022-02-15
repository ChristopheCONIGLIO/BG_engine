class BG_text extends BG_coreObjectBasic{
	constructor(stat,context,pX,pY,size,color) {
		super(stat,context,pX,pY,0,0,color);
		
		this.p_size = size;
		this.font = "Arial";
		this.text = "hello world";
	}
	
	drawObj(decX,decY,zoom){
		// !!!  pas de gestion de présence ou pas sur l'écran à faire //
		
		this.p_ctx.globalAlpha = this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.font = (zoom*this.p_size) +"px "+this.font;
		this.p_ctx.fillStyle = this.p_color;
		this.p_ctx.fillText(this.text,decX+this.p_pX*zoom,(zoom*this.p_size) + decY+this.p_pY*zoom);
		this.p_ctx.fill(); 
		this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		this.p_ctx.globalAlpha = 1;
	}
	
	setText(text){
		this.text = text;
	}
	getText(text){
		return this.text;
	}
 	//----------------------------------
		
}
