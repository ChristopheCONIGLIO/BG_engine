/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_script{
	constructor(bg) {
		this.p_bg = bg;
		this.p_bg.addScript(this);
		this.p_alive = true;
	}
	destructor(){
	}

	enterFrame(){
        //execute some code
	}
	remove(){
		this.p_bg.deleteScript(this);
		this.p_alive = false;
	}





	
	//info alive
	getAlive(){
		return this.p_alive;
	}

}

// example of use to copy
/*
class monCode extends BG_script{
	constructor(bg) {
		super(bg); // bg accès by this variable -> this.p_bg
	}

	enterFrame(){
        //execute some code
	}

}*/