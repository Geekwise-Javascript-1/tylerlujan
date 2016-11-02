var n = document.getElementById('n');
var e = document.getElementById('e');
var s = document.getElementById('s');
var w = document.getElementById('w');
var tableHolder = document.getElementById('table');
var maze, thisCell, exitCell, cells;

var monsters = [];
var monsterTypes = ['dragon', 'goblin', 'ogre', 'troll', 'harpey'];

function Monsters(name, hp){
    this.name = name,
    this.hp = hp
}

function generateMonsters(){
    var totMonsters = Math.round(Math.random() * 5);
    console.log(totMonsters);

    for(var i = 0; i < totMonsters; i++){
        monsters[i] = new Monsters();
        monsters[i].name = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
        monsters[i].hp = Math.ceil(Math.random() * 10);
    }
    console.log(monsters);
}
generateMonsters();

var hero = {
    name: 'Tim',
    hp: 100
};

n.addEventListener('click', function(){
    moveNorth();
});
e.addEventListener('click', function(){
    moveEast();
});
s.addEventListener('click', function(){
    moveSouth();
});
w.addEventListener('click', function(){
    moveWest();
});

function enableNorth(wall){
    wall ? n.disabled = false : n.disabled = true;
    // console.log(wall);
}
function enableEast(wall){
    wall ? e.disabled = false : e.disabled = true;
    // console.log(wall);
}
function enableSouth(wall){
    wall ? s.disabled = false : s.disabled = true;
    // console.log(wall);
}
function enableWest(wall){
    wall ? w.disabled = false : w.disabled = true;
    // console.log(wall);
}


function moveNorth(){
    // console.log('go north');
    statusCell(thisCell, 'inactive');
    thisCell = [thisCell[0]-1, thisCell[1] ];
    encounter();
    statusCell(thisCell, 'active');
    checkWalls(cells);
}

function moveEast(){
    // console.log('go east');
    statusCell(thisCell, 'inactive');
    thisCell = [thisCell[0], thisCell[1]+1 ];
    encounter();
    statusCell(thisCell, 'active');
    checkWalls(cells);
}

function moveSouth(){
    // console.log('go south');
    statusCell(thisCell, 'inactive');
    thisCell = [thisCell[0]+1, thisCell[1] ];
    encounter();
    statusCell(thisCell, 'active');
    checkWalls(cells);
}

function moveWest(){
    // console.log('go west');
    statusCell(thisCell, 'inactive');
    thisCell = [thisCell[0], thisCell[1]-1 ];
    encounter();
    statusCell(thisCell, 'active');
    checkWalls(cells);
}

function charInfo(){
    alert(
        'Name: '+hero.name +
        '\nRemaining HP: '+hero.hp
    );
}

addEventListener('keypress', function(evt){
    evt.preventDefault();
    console.log(evt);
    if(evt.keyCode === 38 && !n.disabled){
        moveNorth();
    }else if(evt.keyCode === 39 && !e.disabled){
        moveEast();
    }else if(evt.keyCode === 40 && !s.disabled){
        moveSouth();
    }else if(evt.keyCode === 37 && !w.disabled){
        moveWest();
    }else if(evt.key === 'i'){
        charInfo();
    }
});

var grid = function(x, y){
    var totalCells = x * y;
    cells = [];
    var unvisited = [];

    for(var i = 0; i < y; i++){
        cells[i] = [];
        unvisited[i] = [];
        for(var j = 0; j < x; j++){
            cells[i][j] = [0,0,0,0];
            unvisited[i][j] = true;
        }
    }

    var currentCell =
        [ Math.floor(Math.random() * y), Math.floor(Math.random() * x) ];
        // [3, 2]
        // [y, x]
    var path = [currentCell];
    unvisited[currentCell[0]][currentCell[1]] = false;
    var visited = 1;

    while(visited < totalCells){
        var possible = [
            [ currentCell[0]-1, currentCell[1], 0, 2 ],
            [ currentCell[0], currentCell[1]+1, 1, 3 ],
            [ currentCell[0]+1, currentCell[1], 2, 0 ],
            [ currentCell[0], currentCell[1]-1, 3, 1 ]
        ];
        var neighbors = [];
        for(var l = 0; l < 4; l++){
            if(possible[l][0] > -1 &&
                possible[l][0] < y &&
                possible[l][1] > -1 &&
                possible[l][1] < x &&
                unvisited[ possible[l][0] ][ possible[l][1] ]){
                    neighbors.push( possible[l] );
            }
        }

        if(neighbors.length){
            var next = neighbors[ Math.floor(Math.random() * neighbors.length) ];

            cells[ currentCell[0] ][ currentCell[1] ][ next[2] ] = 1;
            cells[ next[0] ][ next[1] ][ next[3] ] = 1;
            unvisited[ next[0] ][ next[1] ] = false;

            visited++;
            currentCell = [ next[0], next[1] ];
            path.push(currentCell);
        }else{
            currentCell = path.pop();
        }
    }
    // return cells;

    gridStart(cells, path);

}(8, 8);

function gridStart(cells, path){
    gridBuilder(cells);

    thisCell = statusCell(path[0], 'active');
    exitCell = statusCell(path[path.length - 1], 'finish');

    checkWalls(cells);
}

function gridBuilder(cells){
    maze = document.createElement('table');
    tableHolder.appendChild(maze);

    for(var i = 0; i < cells.length; i++){
        maze.insertRow(i);
        for(var j = 0; j < cells[i].length; j++){
            maze.firstChild.childNodes[i].insertCell(j);
            thisCell = maze.firstChild.childNodes[i].childNodes[j];
            for(var k = 0; k < 4; k++){
                switch(k){
                    case 0:
                        cells[i][j][k] ? thisCell.classList.remove('bt') : thisCell.classList.add('bt');
                        break;
                    case 1:
                        cells[i][j][k] ? thisCell.classList.remove('br') : thisCell.classList.add('br');
                        break;
                    case 2:
                        cells[i][j][k] ? thisCell.classList.remove('bb') : thisCell.classList.add('bb');
                        break;
                    case 3:
                        cells[i][j][k] ? thisCell.classList.remove('bl') : thisCell.classList.add('bl');
                        break;
                }
            }
        }
    }
}

function statusCell(cell, status){
    if(maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.contains('exit')){
        alert('victory!');
        location.reload();
    }
    switch(status){
        case 'active':
            maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('active');
            maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('visited');
            break;
        case 'inactive':
            maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
            break;
        case 'finish':
            maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('exit');
            break;
    }
    return cell;
}

function checkWalls(cells){
    var walls = cells[thisCell[0]][thisCell[1]];
    for(var i = 0; i < 4; i++){
        switch( i ){
            case 0:
                enableNorth(walls[i]);
                break;
            case 1:
                enableEast(walls[i]);
                break;
            case 2:
                enableSouth(walls[i]);
                break;
            case 3:
                enableWest(walls[i]);
                break;
        }
    }
}

function encounter(){
    var percEnc = Math.round(monsters.length / (cells.length * cells[0].length) * 100);
    console.log(percEnc + '% chance of encountering');
    var chanceEnc = Math.ceil(Math.random() * 100);
    console.log(chanceEnc);
    var monsterEnc = Math.floor(Math.random() * monsters.length);
    if(chanceEnc <= percEnc){
        console.log('watch out a monster!');
        battle( monsters.splice(monsterEnc, 1) );
    }
}

function battle(monster){
    alert("Prepare for battle, you happened across a "+monster[0].name+"!");
    while(monster[0].hp > 0 && hero.hp > 0){
        monsterAction(monster);
        if(hero.hp <= 0){
            alert("You're dead. Sorry. :(");
            location.reload();
            break;
        }
        playerAction(monster);
        if(monster[0].hp <= 0){
            alert("The monster has perished. You survived. =)");
            break;
        }
    }
}
function monsterAction(monster){
    var damage = Math.ceil(monster[0].hp / 3);
    hero.hp -= damage;
    alert("You've taken "+damage+" against your hp!");
}
function playerAction(monster){
    var damage = Math.ceil(hero.hp / 2);
    monster[0].hp -= damage;
    alert("You've swung your sword and dealt "+damage+" damage.");
}
