/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_text extends BG_coreObjectBasic{
	constructor(stat,context,pX,pY,size,color) {
		super(stat,context,pX,pY,0,0,color);
		
		this.p_size = size;
		this.font = "Arial";
		this.text = "";

	}
	
	drawObj(decX,decY,zoom){
		// !!!  pas de gestion de présence ou pas sur l'écran à faire //
		
		if( this.visible == true){

			var x = decX+this.p_pX*zoom;
			var y = (zoom*this.p_size) + decY+this.p_pY*zoom;
			var width = this.getWidthText(zoom);
			var height = (zoom*this.p_size)*0.0;

			if( this.rotation != 0){
				this.p_ctx.translate(x+width/2,y+height/2);
				this.p_ctx.rotate(this.rotation * Math.PI / 180);
				this.p_ctx.translate(-x-width/2,-y-height/2);
			}

			this.p_ctx.globalAlpha = this.alpha;
			this.p_ctx.beginPath();
			this.p_ctx.font = (zoom*this.p_size) +"px "+this.font;
			this.p_ctx.fillStyle = this.p_color;
			this.p_ctx.fillText(this.text,x,y);
			
			this.p_ctx.fill(); 
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
			this.p_ctx.globalAlpha = 1;

			if( this.rotation != 0){
				this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
		
		}
	}
	
	setDim(arg){
		this.p_size = arg;
	}

	setText(text){
		this.text = text;
	}
	getText(text){
		return this.text;
	}
	getWidthText(zoom){	//la taille dépend du zoom de la carte !!!!!
		this.p_ctx.font = (zoom*this.p_size) +"px "+this.font;
		return this.p_ctx.measureText(this.text).width;
	}
 	//----------------------------------
		
}
