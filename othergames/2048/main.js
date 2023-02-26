/**
 * Created by PC on 2017/8/11.
 */


var board = new Array();
board[0]=new Array();
board[1]=new Array();
board[2]=new Array();
board[3]=new Array();
var score = 0;
var best_score=0;
var isKeyDown=false;

$(document).ready(function()
{
    $(".flip").click(function()
{
    $(".panel").slideToggle("slow");
});
    newgame();
});

$(document).keydown(function (event)
{
    event.preventDefault();
    switch (event.keyCode)
    {
        case 37:
        case 65:
        case 38:
        case 87:
        case 39:
        case 68:
        case 40:
        case 83:
            isKeyDown=true;
            break;
        default:
            break;
    }
});

$(document).keyup(function (event)
{
    event.preventDefault();
    if (isKeyDown)
    {
        switch (event.keyCode)
        {
            case 37:
            case 65:// 左键或者A键向左移动
                if (canMoveL())
                {
                    MoveLeft();
                    setTimeout("CreateOneNumber()", 300);
                    setTimeout("gameOver()", 330);
                }
                break;
            case 38:
            case 87:    // 上键或者W 键向上移动
                if (canMoveU())
                {
                    MoveUp();
                    setTimeout("CreateOneNumber()", 300);
                    setTimeout("gameOver()", 330);
                }
                break;
            case 39:
            case 68:    // 右键或者D键向右移动
                if (canMoveR())
                {
                    MoveRight();
                    setTimeout("CreateOneNumber()", 300);
                    setTimeout("gameOver()", 330);
                }
                break;
            case 40:
            case 83:    // 下键或者S键向下移动
                if (canMoveD())
                {
                    MoveDown();
                    setTimeout("CreateOneNumber()", 300);
                    setTimeout("gameOver()", 330);
                }
                break;
            default:
                break;
        }
        isKeyDown=false;
    }
});

function newgame()
{
    // 初始化棋盘格
    init();
    // 在随机两个格子生成数字
    CreateOneNumber();
    CreateOneNumber();
}

function CreateOneNumber()
{
    while (true)
    {
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        if (board[randx][randy]==0)
            break;
    }
    var randNumber = Math.random() < 0.9 ? 2 : 4;
    // 在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
}

function init()
{
    for(var i=0;i<4;i++)
    {
        for (var j = 0; j < 4; j++)
        {
            var cell = $("#grid-cell-" + i + "-" + j);  //获取id="grid-cell-0-0"到id="grid-cell-3-3"
            cell.css('top', getPosition(i));     //在指定位置画出格子
            cell.css('left', getPosition(j));
        }
    }
    for(var k=0;k<4;k++)
    {
        for (var m = 0; m < 4; m++)
            board[k][m] = 0;
    }
    updateBoardView();
    score = 0;
    updateScore(score,best_score);
}

function updateBoardView()
{
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            if (board[i][j] == 0)
            {
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPosition(i) + 50);
                theNumberCell.css("left", getPosition(j) + 50);
            }
            else
                {
                    theNumberCell.css('width', '100px');
                    theNumberCell.css('height', '100px');
                    theNumberCell.css('top', getPosition(i));
                    theNumberCell.css('left', getPosition(j));
                    theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                    theNumberCell.css('color', getNumberColor(board[i][j]));
                    theNumberCell.text(board[i][j]);
                }
        }
    updateScore(score,best_score);
}

function  updateScore(score)
{
    $('#score').css('color', 'black');
    $('#score').css('font-size', '32px');
    $("#score").text(score);
    $('#bscore').css('color', 'black');
    $('#bscore').css('font-size', '32px');
    $("#bscore").text(best_score);

}

function MoveLeft()
{
    for(i=0;i<4;i++)
        {
            /*linshi=new Array();
            linshi[0]=0;linshi[1]=0;linshi[2]=0;linshi[3]=0;
            board[i].push(0);
            index=0;
            for(j=0;j<4;j++)
            {
                if(board[i][j]!=0)
                    if(board[i][j]==board[i][j+1])
                    {
                        linshi[index]=board[i][j]*2;
                        j+=1;
                        index+=1;
                    }
                    else
                    {
                        linshi[index]=board[i][j];
                        index+=1;
                    }
            }*/
            left_zero=0;
            middle_zero=0;
            for(j=0;j<4;j++)
            {
                if(board[i][j]==0) left_zero+=1;
                else
                {
                    for(k=j+1;k<4;k++)
                    {
                        if(board[i][k]==0) middle_zero+=1;
                            else if(board[i][k]==board[i][j])
                                {
                                    showMoveAnimation(i, k, i, j);
                                    board[i][j]*=2;
                                    score+=board[i][j];
                                    if(best_score<score) best_score=score;
                                    board[i][k]=0;
                                }
                                else break;
                    }
                    showMoveAnimation(i, j, i,j-left_zero);
                    board[i][j-left_zero]=board[i][j];
                    if(left_zero) board[i][j]=0;
                }
            }
        }
    setTimeout("updateBoardView()", 300);   //这个坑了我一个多小时，一定要有这个才能等待动画！！！
}

function MoveRight()
{
    for(i=0;i<4;i++)
    {
        right_zero=0;
        middle_zero=0;
        for(j=3;j>-1;j--)
        {
            if(board[i][j]==0) right_zero+=1;
            else
            {
                for(k=j-1;k>-1;k--)
                {
                    if(board[i][k]==0) middle_zero+=1;
                    else if(board[i][k]==board[i][j])
                    {
                        showMoveAnimation(i, k, i, j);
                        board[i][j]*=2;
                        score+=board[i][j];
                        if(best_score<score) best_score=score;
                        board[i][k]=0;
                    }
                    else break;
                }
                showMoveAnimation(i, j, i,j+right_zero);
                board[i][j+right_zero]=board[i][j];
                if(right_zero) board[i][j]=0;
            }
        }
    }
    setTimeout("updateBoardView()", 300);   //这个坑了我一个多小时，一定要有这个才能等待动画！！！
}

function MoveDown()
{
    for(j=0;j<4;j++)
    {
        down_zero=0;
        middle_zero=0;
        for(i=3;i>-1;i--)
        {
            if(board[i][j]==0) down_zero+=1;
            else
            {
                for(k=i-1;k>-1;k--)
                {
                    if(board[k][j]==0) middle_zero+=1;
                    else if(board[k][j]==board[i][j])
                    {
                        showMoveAnimation(k, j, i, j);
                        board[i][j]*=2;
                        score+=board[i][j];
                        if(best_score<score) best_score=score;
                        board[k][j]=0;
                    }
                    else break;
                }
                showMoveAnimation(i, j, i+down_zero,j);
                board[i+down_zero][j]=board[i][j];
                if(down_zero) board[i][j]=0;
            }
        }
    }
    setTimeout("updateBoardView()", 300);   //这个坑了我一个多小时，一定要有这个才能等待动画！！！
}

function MoveUp()
{
    for(j=0;j<4;j++)
    {
        up_zero=0;
        middle_zero=0;
        for(i=0;i<4;i++)
        {
            if(board[i][j]==0) up_zero+=1;
            else
            {
                for(k=i+1;k<4;k++)
                {
                    if(board[k][j]==0) middle_zero+=1;
                    else if(board[k][j]==board[i][j])
                    {
                        showMoveAnimation(k, j, i, j);
                        board[i][j]*=2;
                        score+=board[i][j];
                        if(best_score<score) best_score=score;
                        board[k][j]=0;
                    }
                    else break;
                }
                showMoveAnimation(i, j, i-up_zero,j);
                board[i-up_zero][j]=board[i][j];
                if(up_zero) board[i][j]=0;
            }
        }
    }
    setTimeout("updateBoardView()", 300);   //这个坑了我一个多小时，一定要有这个才能等待动画！！！
}
