


class g_particule_prototype extends BG_circleBorder{
    constructor(bg,onBoard,fixed,layer,pX,pY,size,color,border,colorborder,fond) {
        super(bg,onBoard,fixed,layer,pX,pY,size,color,border,colorborder,fond);
        this.manageBorder = false;
    }

    setManageBorder(v){
        if( v == true || v == false) this.manageBorder = v;
        else                         this.manageBorder = false;
    }

    drawObj(){
        if( this.manageBorder ){
            var deleteMe = false;
            if( this.p_pY + this.getDim()/2 + this.p_border/2 >= this.p_bg.getMaxYColission()*0.98 ) deleteMe = true;
            if( this.p_pX + this.getDim()/2 + this.p_border/2 >= this.p_bg.getMaxXColission()*0.98 ) deleteMe = true;
            if( this.p_pY - this.getDim()/2 - this.p_border/2 <= this.p_bg.getMinYColission()*0.98 ) deleteMe = true;
            if( this.p_pX - this.getDim()/2 - this.p_border/2 <= this.p_bg.getMinXColission()*0.98 ) deleteMe = true;
            if( deleteMe ) this.remove();
        }
        super.drawObj();
    }


}