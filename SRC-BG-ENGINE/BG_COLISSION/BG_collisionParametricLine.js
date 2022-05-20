//
//
// specific code focused on solve distance between 2 circle
// focus on **solveDistancePoint** function for best part
// based on very old code by Christophe CONIGLIO
// Flash actionscript 3 is the original language
//
// Re-implemntation the 08/06/2022 by Christophe Coniglio
// 
//

class BG_collisionParametricLine {
		/*------------------------------------------------*/
		constructor(p1x,p1y,p2x,p2y) {
			this._vx = -p1x+p2x;
			this._vy = -p1y+p2y;
			this._tx = p1x;
			this._ty = p1y;
		}
		copyLine(d) {
			this._vx = d._vx;
			this._vy = d._vy;
			this._tx = d._tx;
			this._ty = d._ty;
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		getPosX(k){return this._vx*k + this._tx;}
		getPosY(k){return this._vy*k + this._ty;}
		inverseMVector(){ 
			var vx = this._vx;
			this._vx = this._vy;
			this._vy = -vx;
		}
		addNewPoint(p1x,p1y){
			this._tx = p1x;
			this._ty = p1y;
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		//
		// how it s work :)
		//
		solveDistancePoint($p2x,$p2y,$distance){
			var a = (this._vx * this._vx) + (this._vy * this._vy);
			var b = 2*((this._vx*this._tx)-(this._vx*$p2x)+(this._vy*this._ty)-(this._vy*$p2y));
			var c = (this._tx*this._tx)+($p2x*$p2x)+(this._ty*this._ty)+($p2y*$p2y)-2*(this._tx*$p2x)-2*(this._ty*$p2y)-($distance*$distance);
			var deLta = Math.sqrt((b*b)-4*(a*c));
			var k1 = (-b+deLta)/(2*a);
			var k2 = (-b-deLta)/(2*a);
			if( Math.abs( k1 ) < Math.abs( k2) )	return k1;
			else 									return k2;
			return 0;
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/


		// --> other code is just historic during design of this class

		/*public function solveDistancePointBack($p2x:Number,$p2y:Number,$distance:Number){
			var a:Number = (_vx * _vx) + (_vy * _vy);
			var b:Number = 2*((_vx*_tx)-(_vx*$p2x)+(_vy*_ty)-(_vy*$p2y));
			var c:Number = (_tx*_tx)+($p2x*$p2x)+(_ty*_ty)+($p2y*$p2y)-2*(_tx*$p2x)-2*(_ty*$p2y)-($distance*$distance);
			var deLta:Number = Math.sqrt((b*b)-4*(a*c));
			return (-b-deLta)/(2*a);
		}*/
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		/*public function solveDistancePointPytagoreVersion($p1x:Number,$p1y:Number,$p2x:Number,$p2y:Number,$distance:Number){
			var V2x = _vy;
			var T2x = $p2x;
			var V2y = -_vx;
			var T2y = $p2y;
			var ko:Number = ((V2y/V2x)*(_tx-T2x) + T2y - _ty)/ (_vy - (V2y*_vx/V2x));
			var a:Number =  distance(getPosX(ko),getPosY(ko),$p2x,$p2y);
			var b:Number = Math.sqrt(($distance*$distance)-(a*a));
			var distanceUnitaire:Number = distance(getPosX(1),getPosY(1),_tx,_ty);
			var kDistance:Number = b/distanceUnitaire;
			var kDown:Number = ko-kDistance;
			var kUp:Number = ko+kDistance;
			if( Math.abs( kDown ) < Math.abs( kUp) )	return kDown;
			else 										return kUp;
			return 0;
		}*/
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		/*private function distance($c1Px:int,$c1Py:int,$c2Px:int,$c2Py:int):uint{
			return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
		}*/
		/*------------------------------------------------*/
		/*------------------------------------------------*/
}