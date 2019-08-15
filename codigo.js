var estado=true;
var x=100;
var y=100;
var dir=1; // 1 derecha, 2 izquierda, 3 arriba, 4 abajo
var canvas1;
var pacman;
var Direccion;

window.addEventListener('keydown',PresionarTecla, true);
function PresionarTecla(e)
{
	switch(e.keyCode)
	{
		case 37:  //izq
			Direccion=2;
			break;
		case 39:  //der
			Direccion=1;
			break;
		case 40:  //aba
			Direccion=4;
			break;
		case 38:  //arri
			Direccion=3;
			break;
	}
}
	
	function iCanvas()
	{
		canvas1 = document.getElementById("objCanvas");
		canvas1.height=600;
		canvas1.width=800;
		canvas1.style.background="black";
		if(canvas1.getContext)
		{
			ctx=canvas1.getContext("2d");
			dpacman();
			setInterval(mover,100);  //timer de movimiento
		}
	}
	
	function mover()
	{
		limpiar();
		estado=!estado;
		switch(Direccion)
		{
			case 1:		//der 
				x+=15;
				break;
			case 2: 	//izq
				x-=15;
				break;
			case 3:		//arr
				y-=15;
				break;
			case 4:		//aba
				y+=15;
				break;
		}
		//validaciones de los limites del border
		if(x>canvas1.width) x=0;	if(x<0) x=canvas1.width;
		if(y>canvas1.height) y=0;	if(y<0) y=canvas1.height;
		dpacman();
	}
	
	function dpacman()
	{
		ctx.fillStyle="rgb(255, 255, 0)";
		if(estado)		//estado es verdadero pinta boca abierta		
		{
			var ai1, af1, ai2, af2;
			switch(Direccion)
			{
				case 1: 	//der
					ai1=0.15*Math.PI;
					if1=1.25*Math.PI;
					ai2=0.75*Math.PI;
					af2=1.85*Math.PI;
					break;
				case 2: 	//izq
					ai1=1.15*Math.PI;
					if1=0.25*Math.PI;
					ai2=1.75*Math.PI;
					af2=0.85*Math.PI;
					break;
				case 3: 	//arr
					ai1=1.65*Math.PI;
					if1=0.75*Math.PI;
					ai2=0.25*Math.PI;
					af2=1.35*Math.PI;
					break;
				case 4: 	//aba
					ai1=1.25*Math.PI;
					if1=0.35*Math.PI;
					ai2=0.65*Math.PI;
					af2=1.75*Math.PI;
					break;
			}
			ctx.beginPath();
			ctx.arc(x, y, 25, ai1, af1, false);
			ctx.fill();
		
			ctx.beginPath();
			ctx.arc(x, y, 25, ai2, af2, false);
			ctx.fill();
		
			ctx.fillStyle="rgb(255, 255, 0)";
			pacman=new circulo(x, y, 25, ai1, af1, false, x, y, 25, ai2, af2, false);
			pacman.fill(ctx);
		}
		else
		{
			ctx.fillStyle="rgb(255, 255, 0)";
			pacman=new circulo(x, y, 25, ai1, af1, false, x, y, 25, 0, 2*Math.PI, false);
			pacman.fill(ctx);
		}
		
		ctx.fillStyle="rgb(0, 0, 0)";
		ojos=new circulo(x+10, y-15, 3, 0, 360, false, x+10, y-15, 3, 0, 360, false);
		ojos.fill(ctx);	
	}

function circulo(x1, y1, size1, pi1, pf1, val1, x2, y2, size2, pi2, pf2, val2)
//pi=punto inicial; pf=punto final
{
	this.x1=x1;	
	this.x2=x2;
	this.y1=y1;
	this.y2=y2;
	this.size1=size1;
	this.size2=size2;
	this.pi1=pi1;
	this.pi2=pi2;
	this.pf1=pf1;
	this.pf2=pf2;
	this.val1=val1;
	this.val2=val2;

	this.fill=function(ctx)
	{
		if(ctx!=null)
		{
			ctx.beginPath();
			ctx.arc(this.x1, this.y1, this.size1, this.pi1, this.pf1, this.val1);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.x2, this.y2, this.size2, this.pi2, this.pf2, this.val2);
			ctx.fill();
		}
	}
}

function limpiar()
{
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas1.width, canvas1.height);
	ctx.fill();
}	
	
