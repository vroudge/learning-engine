/*

@name 
    Learning shooter
@endName

@description
    Move with the arrows, and shoot with the up-arrow to touch the right bonuses and avoid the malus
@endDescription

*/

define([
    'event_bus',
    'modules/canvas',
    'modules/window_size',
    'modules/score',
    'modules/frames',
    'modules/mouse',
    'modules/key_listener',
    'modules/shoot'
], function (eventBus, canvasCreate, windowSize, score, frames, mouse,keyListener, shoot) {

    return function(params)
    {
    	var canvas,
    	ctx = "";


    	var paramsCanvas = {
				id: "learningShooter",
				width: 800,
				height: 800
			};

    	var gameContainer = {
    		paddle : "",
    		key : "",
    		arrayArrows : []
    	}

	    eventBus.on('init', function () {

			canvas = canvasCreate.create(paramsCanvas);
			ctx = canvas.context;

			ctx.fillStyle = "black";
		    ctx.fillRect(0, 0, paramsCanvas.width, paramsCanvas.height);

		    var paramsPaddle = {
		    	x : 350, 
		    	y : 780,
		    	width : 100,
		    	height : 20,
		    	speed : 10,
		    	color : "#FFFFFF"
		    }

		    gameContainer.paddle = new Paddle(paramsPaddle);
	  	});

	  	eventBus.on("new frame", function(){
	  		ctx.fillStyle = "black";
	  		ctx.fillRect(0, 0, paramsCanvas.width, paramsCanvas.height);

		   	//Rendering and moving the paddle
		   	gameContainer.paddle.update();

		   	for(var i =0 ; i < gameContainer.arrayArrows.length; i++)
		   	{
		   		gameContainer.arrayArrows[i].update();
		   		if(gameContainer.arrayArrows[i].y < 0)
		   		{
		   			gameContainer.arrayArrows.splice(i, 1);
		   		}
		   	}
		});

		eventBus.on('mouse update', function(mouseMove)
		{
			
		});


/***************************************************************************************
* PADDLE
***************************************************************************************/
	    var Paddle = function Paddle(params)
	    {
	    	this.x = params.x;
	    	this.y = params.y;
	    	this.height = params.height;
	    	this.width = params.width;
	    	this.speed = params.speed;
	    	this.color = params.color

	    	this.draw = function draw()
	    	{
	    		ctx.beginPath();
			    ctx.rect(this.x, this.y, this.width, this.height);
			    ctx.fillStyle = this.color;
			    ctx.fill();
			    ctx.closePath();
	    	}	

	    	this.inputs = function inputs()
	    	{

	    		for(var i =0; i < gameContainer.key.length; i++)
	    		{
	    			if(this.x > 0)
	    			{
		    			if(gameContainer.key[i] == 81){
		    				this.moveLeft();
		    			}
		    		}

    				if(this.x < 700)
	    			{
		    			if(gameContainer.key[i] == 68){
		    				this.moveRight();
		    			}
		    		}

		    		if(gameContainer.key[i] == 32){
		    			this.shoot();
		    		}

	    		}
	    	}

	    	this.moveLeft = function moveLeft()
	    	{
	    		this.x -= this.speed ;
	    	}

	    	this.moveRight = function moveRight()
	    	{
				this.x += this.speed;
	    	}


	    	this.shoot = function shoot()
	    	{
	    		params.x = this.x + (this.width/2);
	    		params.y = this.y;
	    		params.height = 10;
	    		params.width = 10;
	    		var arrows = gameContainer.arrayArrows.push(new Arrow(params))
	    	}

	    	this.update = function update()
	    	{
	    		this.inputs();
	    		this.draw();
	    	}
	    }

/***************************************************************************************
* Arrow shooted from the paddle
***************************************************************************************/

	    var Arrow = function Arrow(params)
	    {
	    	this.x = params.x;
	    	this.y = params.y;
	    	this.radius = params.height;
	    	this.speed = params.speed;
	    	this.color = params.color;

	    	this.draw = function draw()
	    	{
				ctx.beginPath();
				ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
				ctx.fillStyle = this.color;
			    ctx.fill();
				ctx.stroke();
				ctx.closePath();
	    	}

	    	this.move = function inputs()
	    	{
	    		this.y -= this.speed;
	    	}

	    	this.update = function update()
	    	{
	    		this.move();
	    		this.draw();
	    	}
	    }


	   	eventBus.on('keys still pressed', function(data)
	   	{
	   	 	gameContainer.key = data;
	   	});
	};
});
