let dataInside = (function () {
  let arrayCurrent = {
    player0: [],
    player1: []
  }
  return {
    pushInArray: function (actPlay, item) {
      if (actPlay === 0) {
        dataInside.player0.push(actPlay + item)
        console.log(dataInside.player0)
      } else if (actPlay === 1) {
        dataInside.player1.push(actPlay + item)
        console.log(dataInside.player1)
      }
    },
  }
})();

let uiData = (function () {
  let domString = {
    players: document.querySelector('.players'),
    choose: document.querySelector('#choose'),
    game: document.querySelector('.cells'),
    cell: document.querySelectorAll('.cell')
  }

  let player0 = {
    tic: '<img src = "0-o.png">',
    player: document.querySelector('#player0')
  }

  let player1 = {
    tic: '<img src = "1-x.png">',
    player: document.querySelector('#player1')
  }

  let active = {
    gamePlay: false,
    aPlay: 1,
    player: function () {
      if (this.aPlay === 1) {
        return player1;
      } else if (this.aPlay === 0) {
        return player0
      }
    },
  }

  let toggleHover = function () {
    player0.player.classList.toggle('span');
    player1.player.classList.toggle('span');
  }

  let removeSelectPlayer = function (selected, activeNow) {
    toggleHover();
    domString.choose.style.display = 'none'
    activeNow.player.classList.add('active')
  }

  let changeActivePlayer = function () {
    active.aPlay === 1 ? (active.aPlay = 0) : (active.aPlay = 1)
    player0.player.classList.toggle('active')
    player1.player.classList.toggle('active')
  }

  return {
    getdomstring: function () {
      return domString;
    },

    choosePlayer: function (e) {
      let selected = e.target.id
      if (active.gamePlay === false) {
        active.aPlay = parseInt(e.target.dataset.action)
        removeSelectPlayer(selected, active.player());
        active.gamePlay = true
      }
    },

    pick: function (e) {
      if (active.gamePlay === true) {
        let currentPick = e.target
        currentPick.innerHTML = active.player().tic
        changeActivePlayer();
      }
    }
  }
})();

let controller = (function (dataInside, uiData) {
  let dom = uiData.getdomstring();
  dom.players.addEventListener('click', uiData.choosePlayer);
  // dom.cell.addEventListener('click', uiData.pick)
  dom.cell.forEach(function (e) {
    e.addEventListener('click', uiData.pick)
  })
})(dataInside, uiData);
