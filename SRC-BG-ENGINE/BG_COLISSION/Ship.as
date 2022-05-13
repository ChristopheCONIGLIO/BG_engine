package  {
	import flash.display.Sprite;
	public class Ship extends EngCir{
		/*-------------------*/
		private var _sp				:Sprite = null;
		
		private var _cx				:int = 0;
		private var _cy				:int = 0;
		private var _tabPoint		:Array = [[750,50],[750,550],[50,550],[50,50]];
		private var _nbPoint		:int = 4;
		private var _countPoint		:int = 0;
		private var _counterLock	:int = 0;
		private var _prevX			:int = 0;
		private var _prevY			:int = 0;
		/*------------------------------------------------*/
		public function Ship($engWorld:EngWorld,$px:Number,$py:Number,$radius:Number) {
			super($engWorld);
			_gravityZ = 0.9;
			_static = false;
			_coefShockabsorb = 1.0;
			_radius = $radius;
			_mass = _radius*_radius;
			initDataArray();
			this.setPosition($px,$py);
			
			_countPoint = Math.random()*4;
			//
			//_cx = Math.random() * 800;
			//_cy = Math.random() * 400;
			//_cx = 400;
			//_cy = 300;
			//
			_sp = new Sprite;
			addChild( _sp );
			initMe();
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		override public function enterFrame(){
			
			var g:Number = 0.3;
			//_vy += g;
			if( x-_tabPoint[_countPoint][0] > 0 ){
				_vx -= g;
			}
			if( x-_tabPoint[_countPoint][0] < 0 ){
				_vx += g;
			}
			if( y-_tabPoint[_countPoint][1] > 0 ){
				_vy -= g;
			}
			if( y-_tabPoint[_countPoint][1] < 0 ){
				_vy += g;
			}
			
			
			
			if( Math.abs(x-_prevX) +  Math.abs(y-_prevY) < 60){
				_counterLock++;
				if( _counterLock >= 24*4 ){
					_countPoint++;
					if( _countPoint >= _nbPoint ){
						_countPoint = 0;
					}
				}
			}
			else{
				_counterLock = 0;
				_prevX = x;
				_prevY = y;
			}
			
			if( Math.abs(x-_tabPoint[_countPoint][0]) +  Math.abs(y-_tabPoint[_countPoint][1]) < 30){
				_countPoint++;
				if( _countPoint >= _nbPoint ){
					_countPoint = 0;
				}
			}
			
			
			
			super.enterFrame();
			 initMe();
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		override public function destroyMe(){
			removeChild(_sp);
			super.destroyMe();
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		public function initMe(){
			
			
			graphics.clear();
			graphics.lineStyle(2, 0x4e8e00 + 255-_counterLock*4);
			graphics.beginFill(0x1d5200 +  255-_counterLock*4);
			
			
			graphics.drawCircle(0,0,_radius);
			graphics.endFill();
			
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
	}
	
}
