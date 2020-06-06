const main = document.querySelector('.container');
const game = main.querySelector('.game');
const info = main.querySelector('.info');
const player_field = info.querySelector('.players')

var activePlayer,
  tic,
  move_0,
  move_1,
  move_current,
  win_player,
  gamePlay,
  action;
init();
choose_player();

// This is for placing the marks on the playing field.
game.querySelector('.cells').addEventListener('click', function (e) {
  if (gamePlay === true) {
    if (e.target.matches('button')) {
      action = e.target.dataset.action;
      pick(action);
      changePlayer();
    }
  }
});

// This is for the new game button
info.querySelector('#button').addEventListener('click', function () {
  if (gamePlay === false) {
    Reverse_WinningCells();
  } else {
    remDisplay_cells();
  }
  init();
  info.querySelector('#choose').style.display = 'block'
  choose_player();
});

// --------------------------------------------------- Functions start here

// This function will initialize the game.
function init() {
  gamePlay = false;
  move_0 = [];
  move_1 = [];
  activePlayer = 1;
  move_current = 0;
  spanDesign();
}

// This function will print the mark for the corresponding player
function pick(me) {
  if (action === me) {
    let img = document.createElement('img');
    img.src = tic;
    game.querySelector('#t' + me).appendChild(img);
    move_current.push(me);
    console.log(move_current);
    winningCondition();
  }
}

// This function will change the player.
function changePlayer() {
  info.querySelector('#player_' + activePlayer).classList.remove('active');
  if (activePlayer === 0) {
    player_1();
  } else if (activePlayer === 1) {
    player_0();
  }
  info.querySelector('#player_' + activePlayer).classList.add('active');
}

function player_1() {
  activePlayer = 1;
  tic = '1-x.png';
  move_current = move_1;
}

function player_0() {
  activePlayer = 0;
  tic = '0-o.png';
  move_current = move_0;
}

// This will display the winner, add styles for winning event, and stop the game.
function WinningCells(x, y, z) {
  info.querySelector('#player_' + activePlayer).style.display = 'none';
  document.getElementById('td' + x).style.backgroundColor = 'green';
  document.getElementById('td' + y).style.backgroundColor = 'green';
  document.getElementById('td' + z).style.backgroundColor = 'green';
  if (activePlayer === 0) {
    win_player = 'Player - &#9711;';
  }
  if (activePlayer === 1) {
    win_player = 'Player - &#10005;';
  }
  let display_win = document.createElement('div');
  display_win.innerHTML = 'Winner: ' + win_player;
  display_win.id = 'display_win';
  info.appendChild(display_win);
  info.querySelector('#display_win').classList.add('winner');
  gamePlay = false;
}

// This function is for reseting the game when there is already a winner.
function Reverse_WinningCells() {
  remDisplay_cells();
  info.querySelector('#player_0').style.display = 'block';
  info.querySelector('#player_1').style.display = 'block';
  info.querySelector('#display_win').remove();
}

function remDisplay_cells() {
  let allCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  allCells.forEach(function clearAll(c) {
    game.querySelector('#td' + c).innerHTML = null;
    document.getElementById('td' + c).style.background = 'none'
  });
}

function choose_player() {
  player_field.addEventListener('click', function (e) {
    if (e.target.matches('span')) {
      let selc_play = e.target.dataset.action
      if (selc_play === 'p0') {
        player_0();
      } else if (selc_play == 'p1') {
        player_1();
      }
      spanDesign();
      info.querySelector('#player_' + activePlayer).classList.add('active');
      info.querySelector('#choose').style.display = 'none';
      gamePlay = true;
    }
  })
}

function spanDesign() {
  info.querySelector('#player_0').classList.remove('active');
  info.querySelector('#player_1').classList.remove('active');
  info.querySelector('#player_0').classList.toggle('span');
  info.querySelector('#player_1').classList.toggle('span');
}

// This is the conditions for winning the game.
function winningCondition() {
  if (
    move_current.includes('d1') &&
    move_current.includes('d2') &&
    move_current.includes('d3')
  ) {
    WinningCells(1, 2, 3);
  }
  if (
    move_current.includes('d4') &&
    move_current.includes('d5') &&
    move_current.includes('d6')
  ) {
    WinningCells(4, 5, 6);
  }
  if (
    move_current.includes('d7') &&
    move_current.includes('d8') &&
    move_current.includes('d9')
  ) {
    WinningCells(7, 8, 9);
  }
  if (
    move_current.includes('d1') &&
    move_current.includes('d4') &&
    move_current.includes('d7')
  ) {
    WinningCells(1, 4, 7);
  }
  if (
    move_current.includes('d2') &&
    move_current.includes('d5') &&
    move_current.includes('d8')
  ) {
    WinningCells(2, 5, 8);
  }
  if (
    move_current.includes('d3') &&
    move_current.includes('d6') &&
    move_current.includes('d9')
  ) {
    WinningCells(3, 6, 9);
  }
  if (
    move_current.includes('d1') &&
    move_current.includes('d5') &&
    move_current.includes('d9')
  ) {
    WinningCells(1, 5, 9);
  }
  if (
    move_current.includes('d3') &&
    move_current.includes('d5') &&
    move_current.includes('d7')
  ) {
    WinningCells(3, 5, 7);
  }
}
