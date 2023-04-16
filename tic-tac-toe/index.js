/*1. At the start, all the tiles will be empty.
2. For player 1, the symbol will be 0.
(or we can give options to player 1 to choose his symbol)
3. From then on, the symbols keep getting toggled
4. after three symbols have been filled, check the winning condition
(We can populate all the winning conditons in an array beforehand)
5. Once we get the winner, game stops with the message (player1/player2 wins)
*/


//The code has been written inside an IIFE to avoid global variables
(
    function(){

        
        const cells = document.querySelectorAll('.item');

        const startGameBtn = document.getElementsByClassName('game--restart');

        const player1 = {
            symbol: '0',
            name: 'Player-0',
            moves: []
        }

        const player2 = {
            symbol: 'x',
            name: 'Player-X',
            moves: []
        }

        const winningStates = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        let count = 0;
        //initialize the turn for player 1 (P1)
        let turn = 'P1';
        let sym = player1.symbol;
        let gameActive = false;

        const resetState = function()
        {
            let index = 1;
            player1.moves = [];
            player2.moves= [];
            turn = 'P1';
            sym = player1.symbol;
            count = 0;
            cells.forEach(function(item){
                item.innerText = index;
                index++;
            })

            document.querySelector('.game--status').innerText = "";
        }


        const checkEndGame = function()
        {
            if(player1.checkWin() === "" && player2.checkWin() === "")
            {
                return "game ended in a draw";
            }
            else{
                return (player1.checkWin() === ""? "Player X won":"Player 0 won");
            }
        }

        const proto = {
            checkWin(){
                let res = "", i, j;
                for(i=0;i< winningStates.length; i++)
                {
                    let winArr = winningStates[i];
                    for(j=0; j< winArr.length; j++)
                    {
                        if(!this.moves.includes(winArr[j]))
                        {
                            console.log(`${winArr[j]} not found`)
                            break;
                        }
                    }
                    if(j===3)
                    {
                    res = `${this.name} won`;
                    return res;
                    }
                }
                return res;
            }
        }

        player1.__proto__ = proto;
        player2.__proto__ = proto;


        startGameBtn[0].addEventListener("click", function(){
            gameActive = true;
            document.querySelector('.game--status').innerHTML = `<h2>Its Player 0's turn</h2>`;
            cells.forEach(function(item){
                item.innerText = ""
            })
            in_game();
        });

        const in_game = function(){
            
            function storeStateOfMove(index){
                if(turn === 'P1')
                {
                    // console.log(index)
                    player1.moves.push(parseInt(index));
                    console.log(player1.moves);
                }
                else{
                    player2.moves.push(parseInt(index));
                }
            }

            function alterState()
            {
                turn = (turn === 'P1'?'P2':'P1');
                sym = (sym === player1.symbol? player2.symbol:player1.symbol)
                document.querySelector('.game--status').innerHTML = `<h2>Its Player ${sym}'s turn</h2>`;
            }

            cells.forEach(function(item){
                item.addEventListener('click', function(){
                    if(!item.innerText)
                    {
                        item.innerText = sym;
                        count++;
                        console.log(count);
                        const index = item.attributes[0].value
                        storeStateOfMove(index);

                        if(turn === 'P1' && player1.moves.length >=3)
                        {
                            const res = player1.checkWin();
                            if(res)
                            {
                                gameActive = false;
                                document.querySelector('.game--status').innerHTML = `<h2>${res}</h2>`;
                                setTimeout(function(){
                                    resetState();
                                }, '5000');
                            }
                        }
                        else if (turn === 'P2' && player2.moves.length >=3)
                        {
                            const res = player2.checkWin();
                            if(res)
                            {
                                gameActive = false;
                                document.querySelector('.game--status').innerHTML = `<h2>${res}</h2>`;
                                setTimeout(function(){
                                    resetState();
                                }, '5000');
                            }
                        }

                        if(count === 9)
                        {
                            gameActive = false;
                            const res = checkEndGame();
                            document.querySelector('.game--status').innerHTML = `<h2>${res}</h2>`;
                            setTimeout(function(){
                                resetState();
                            }, '5000');
                        }

                        if(gameActive)
                        {
                            alterState();
                        }
                    }
                })
            })

        }
})();
