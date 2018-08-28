const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 5;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 20;

const input = new Input();
const ball = new Ball(400, 300, 10, 'red');
const paddle = new Paddle(400, 550, 80, 10, 'deepskyblue');
const blocks = [];
var color = 0;

for (var y = 15; y < 240; y = y+30) {
    for (var x = 25; x < 800; x = x + 50) {
        if (color % 2 === 0) {
            blocks.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, "yellow"));
        }else{
            blocks.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, "red"));
        }
        color += 1;
    }
}

ctx.beginPath();
ctx.rect(800,0,100,600);
ctx.fillStyle = "white";
ctx.fill();

window.setInterval(game_tick, SPF);

function game_tick() {
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start(5);
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }


    // ボールの移動
    ball.move();

    // ボールとブロックの当たり判定
    paddle.collide(ball);
    // ボールとブロックの当たり判定
    blocks_collide();

    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks.forEach((block) => block.draw(ctx));
}

function blocks_collide() {
    // 動作確認用のサンプルコード
    for(var v = 0; v < blocks.length ; v++){
        if (blocks[v] && blocks[v].collide(ball)) {
            blocks.splice(v, 1);
        }
    }
}
