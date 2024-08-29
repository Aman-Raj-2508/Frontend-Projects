document.addEventListener("DOMContentLoaded", () => {    //Applied to the whole document

    let table = document.getElementById("ping-pong-table") //targetting the table element
    let ball = document.getElementById("ball"); //targetting the ball element
    let paddle = document.getElementById("paddle"); //targetting the paddle element


    //here the ballX and ballY will be helping us to set a starting point of ball w.r.t table
    let ballX = 20;//distance of the left of the ball w.r.t ping pong table
    let ballY = 20;//distance of the top of the ball w.r.t ping pong table


    let dx = 5; //displacement factor in x-direction, Here +2-> you will displace by 2 px in +x direction , -2-> you will displace by 2 px in -x direction
    let dy = 5; //displacement factor in y-direction, Here +2-> you will displace by 2 px in +y direction , -2-> you will displace by 2 px in -y direction
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;




    setInterval(function exec() {

        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // Collision of ball and paddle
        /**
        * ballX < paddle.offsetLeft + paddle.offsetWidth -> if left(wrt table) of the ball < right(wrt table) of the paddle
        * ballY > paddle.offsetTop ->if top(wrt table)of ball>top(wrt table) of paddle
        * ballY + ball.offsetHeight -> bottom of the ball 
        * paddle.offsetTop + paddle.offsetHeight -> bottom of the paddle
        */
        if (ballX < paddle.offsetLeft + paddle.offsetWidth &&
            ballY > paddle.offsetTop &&
            ballY + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight
        ) {
            dx *= -1;
        }
        // if (ballX > 700 - 20 || ballX <= 0) dx *= -1;
        // if (ballY > 400 - 20 || ballY <= 0) dy *= -1;
        if (ballX > (table.offsetWidth - ball.offsetWidth) || ballX <= 0) dx *= -1;
        if (ballY > (table.offsetHeight - ball.offsetHeight) || ballY <= 0) dy *= -1;

    }, 1);

    let paddleY = 0;
    let dPy = 15;//displacement for paddle in y-direction
    document.addEventListener("keydown", (event) => {

        event.preventDefault();//prevents the execution of the default event behaviour
        if (event.keyCode == 38 && paddleY > 0) { //up
            paddleY += (-1) * dPy;
        } else if (event.keyCode == 40 && paddleY < (table.offsetHeight - paddle.offsetHeight)) {//down
            paddleY += dPy;
        }
        paddle.style.top = `${paddleY}px`;
    })

    document.addEventListener("mousemove", (event) => {
        let mouseDistanceFromTop = event.clientY; // this is the distance of the mouse point from the top of the screen
        let distanceOfTableFromTop = table.offsetTop;
        let mousePointControl = mouseDistanceFromTop - distanceOfTableFromTop - paddle.offsetHeight / 2;
        paddleY = mousePointControl;
        if (paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight) return;//if bottom of the paddle touches bottom of the table then return


        paddle.style.top = `${paddleY}px`;
    })
});