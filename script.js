const gameContainer = document.getElementById('game');
    const statusText = document.getElementById('status');
    let tiles = [];
    let selected = [];
    let matched = 0;

    const emojis = [
      '🍎', '🍌', '🍓', '🍇',
      '🍒', '🥝', '🍉', '🍍'
    ];

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function createTile(emoji) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.innerText = emoji;
      tile.addEventListener('click', () => revealTile(tile));
      return tile;
    }

    function revealTile(tile) {
      if (selected.length === 2 || tile.classList.contains('matched') || tile.classList.contains('revealed')) {
        return;
      }
      tile.classList.add('revealed');
      selected.push(tile);

      if (selected.length === 2) {
        setTimeout(() => checkMatch(), 600);
      }
    }

    function checkMatch() {
      const [tile1, tile2] = selected;
      if (tile1.innerText === tile2.innerText) {
        tile1.classList.add('matched');
        tile2.classList.add('matched');
        matched++;
        if (matched === emojis.length) {
          statusText.innerText = '🎉 You Won! Great Memory!';
        }
      } else {
        tile1.classList.remove('revealed');
        tile2.classList.remove('revealed');
      }
      selected = [];
    }

    function startGame() {
      gameContainer.innerHTML = '';
      statusText.innerText = 'Memory Match Game';
      matched = 0;
      selected = [];

      const emojiPairs = shuffle([...emojis, ...emojis]);
      emojiPairs.forEach(emoji => {
        const tile = createTile(emoji);
        gameContainer.appendChild(tile);
      });
    }

    startGame();