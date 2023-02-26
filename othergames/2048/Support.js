//noinspection JSAnnotator
/**
 * Created by PC on 2017/8/11.
 */

function getPosition( pos )
{
    return 20 + pos * 120;
}

function getNumberBackgroundColor(number)
{
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 3192:
            return "#93c";
            break;
    }
    return "black";
}

function getNumberColor(number)
{
    if ( number <= 4 )
        return "#776e65";

    return "white";
}

function canMoveL()
{
    for(i=0;i<4;i++)
        for(j=0;j<3;j++)
        {
            if(board[i][j]==0&&board[i][j+1]!=0||board[i][j]!=0&&board[i][j+1]==board[i][j])
            {
                return true;
            }
        }
    return false;
}

function canMoveR()
{
    for(i=0;i<4;i++)
        for(j=3;j>0;j--)
        {
            if(board[i][j]==0&&board[i][j-1]!=0||board[i][j]!=0&&board[i][j-1]==board[i][j])
            {
                return true;
            }
        }
    return false;
}

function canMoveU()
{
    for(j=0;j<4;j++)
        for(i=0;i<3;i++)
        {
            if(board[i][j]==0&&board[i+1][j]!=0||board[i][j]!=0&&board[i+1][j]==board[i][j])
            {
                return true;
            }
        }
    return false;
}

function canMoveD()
{
    for(j=0;j<4;j++)
        for(i=3;i>0;i--)
        {
            if(board[i][j]==0&&board[i-1][j]!=0||board[i][j]!=0&&board[i-1][j]==board[i][j])
            {
                return true;
            }
        }
    return false;
}

function isGameOver()
{
    return !(canMoveL() || canMoveR() || canMoveU() || canMoveD());
}

function gameOver()
{
    if(isGameOver())
    {
        alert("Game Over!\nYour score：" + score + "\nBest score:"+best_score);
        newgame();
    }
}
