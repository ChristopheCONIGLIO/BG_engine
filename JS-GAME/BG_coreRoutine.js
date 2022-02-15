class BG_coreRoutine {
	constructor(bg_g_stat,bg_g_context,bg_g_listObj,bg_g_listObjUnload) {
		this.bg_g_stat		= bg_g_stat;
		this.bg_g_listObj	= bg_g_listObj;
		this.bg_g_context	= bg_g_context;
		this.bg_g_listObjUnload = bg_g_listObjUnload;
	}
	
	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */
	initialisation(){
		
		var colorHandler = new HandleColor();		

		//ajoute 3 image en fond dans l'écran
		var image = new BG_drawImage(this.bg_g_stat,this.bg_g_context,-1000,1000,1000,700,"./graphics_ressources/DEMO/carte.jpg");
		this.bg_g_listObj[0].push( image );
		this.image2 = new BG_drawImage(this.bg_g_stat,this.bg_g_context,0,0,2000,2000,"./graphics_ressources/DEMO/damier-12.jpg");
		this.bg_g_listObj[0].push( this.image2 );
		var image3 = new BG_drawImage(this.bg_g_stat,this.bg_g_context,2000,2000,2000,2000,"./graphics_ressources/DEMO/FULLHD.jpg");
		this.bg_g_listObj[0].push( image3 );


		// ajoute 10000 objet mouvant
		for(var j = 0;j < 2000;j++){
			var obj = new BG_DEMO_charMouvant(this.bg_g_stat,this.bg_g_context,this.bg_g_listObj,this.bg_g_listObjUnload);
			this.bg_g_listObj[1].push( obj );
		}

		//ajoute du texte qui servira a affciher les info de debug
		this.text1 = new BG_text(this.bg_g_stat,this.bg_g_context,200,-50,30,colorHandler.rgb(50,50,50));
		this.bg_g_listObj[8].push( this.text1 );	
		

		//ajoute une image pour voir si on peut suivre la souris
		this.mousePointer = new BG_drawImage(this.bg_g_stat,this.bg_g_context,0,0,100,100,"./graphics_ressources/DEMO/damier-12.jpg");
		this.bg_g_listObj[9].push( this.mousePointer );

	}
	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */


	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */
	enterFrame(){
		
		// MAJ le test de debug
		this.text1.setText(			"FPS:"+Math.round(this.bg_g_stat.getRenderEngineFpsLisse())+
									" - rendering (ms/obj)="+Math.round(this.bg_g_stat.getRenderEngineTimeLisse())+" / "+
									this.bg_g_stat.getRenderEngineObject()+""
									);



		// si les objet mouvant ne sot plus la on en rajoute d'un coup
		if( this.bg_g_listObj[1].length < 10 && Math.random()>0.95){
			for(var j = 0;j < 2000;j++){
				var obj = new BG_DEMO_charMouvant(this.bg_g_stat,this.bg_g_context,this.bg_g_listObj,this.bg_g_listObjUnload);
				this.bg_g_listObj[1].push( obj );
			}
		}


		// MAJ la position de l'objet qui suit la souris
		this.mousePointer.setPos(
			this.bg_g_stat.getMouseXBoard()-50,
			this.bg_g_stat.getMouseYBoard()-50
			);
			
		// demontre que le click est géré
		if( this.bg_g_stat.getMouseClick() == 1){
			this.image2.setPos(Math.random()*200,Math.random()*200);
		}
	}
	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */

}
