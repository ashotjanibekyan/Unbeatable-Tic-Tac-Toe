//recursion version
const printDiamondRec = function(height, string) {
	if(height % 2 === 0) {
		height = height - 1;
	}
	const concatChar = function(n, char) {
		if(n <= 0) {
			return '';
		}
		return char + concatChar(n - 1, char);
	};
	
	const vertical = function(spaceN, stringN, line) {
		if(line > height) {
			return "";
		}
		console.log(concatChar(spaceN, ' ') + concatChar(stringN, string));
		if(line <= height/2) {
			vertical(spaceN + -1, stringN + 2, line + 1);
		} else {
			vertical(spaceN + 1, stringN - 2, line + 1);
		}
	};
	vertical((height-1)/2, 1, 1);
};

//for loop version
const printDiamondFor = function(height, string) {
	if(height % 2 === 0) {
		height = height - 1;
	}
	const concatChar = function(n, char) {
		let concatedString = '';
		for(let i = 0; i < n; i++) {
			concatedString = concatedString + char;
		}
		return concatedString;
	};
	let spaceN = (height-1)/2;
	let stringN = 1;
	for(let i = 1; i <= height; i++){
		console.log(concatChar(spaceN, ' ') + concatChar(stringN, string));
		if(i <= height/2) {
			spaceN = spaceN -1;
			stringN = stringN + 2;
		} else {
			spaceN = spaceN + 1;
			stringN = stringN - 2;
		}
	}
};

const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

const stupidNextMove = function(board) {
	for(let i = 0; i < board.length; i++) {
		for(let j = 0; j < board.length; j++) {
			if(board[i][j] === '') {
				return [i, j];
			}
		}
	}
};

const makeMove = function(board, coords, isX) {
	if((coords[0] === 0 || coords[0] === 1 || coords[0] === 2) && (coords[1] === 0 || coords[1] === 1 || coords[1] === 2) ) {
		const XorO = isX ? 'x': 'o';
		board[coords[0]][coords[1]] = XorO;
		return 0;
	}
	return -1;
};

const findWinner = function(board) {
	//horizontally
	for(let i = 0; i < board.length; i++){
		if(board[i][0] !== ' ' && (board[i][0] + board[i][1] + board[i][2] === board[i][0] + board[i][0] + board[i][0])) {
			return {
				winner: board[i][0],
				winningLocations: [[i, 0], [i, 1], [i, 2]]
			};
		}
	}
	//vertical
	for(let i = 0; i < board.length; i++){
		if(board[0][i] !== ' ' && (board[0][i] + board[1][i] + board[2][i] === board[0][i] + board[0][i] + board[0][i])) {
			return {
				winner: board[0][i],
				winningLocations: [[0, i], [1, i], [2, i]]
			};
		}
	}
	
	if(board[0][0] !== ' ' && (board[0][0] + board[1][1] + board[2][2] === board[0][0] + board[0][0] + board[0][0])) {
		return {
			winner: board[0][0],
			winningLocations: [[0, 0], [1, 1], [2, 2]]
		};
	}
	
	if(board[0][2] !== ' ' && (board[0][2] + board[1][1] + board[2][0] === board[0][2] + board[0][2] + board[0][2])) {
		return {
			winner: board[0][0],
			winningLocations: [[0, 2], [1, 1], [2, 0]]
		};
	}
	
	if(!board.toString().includes(' ')){
		return {
			winner: 'nobody' // nobody won, game over
		}
	}
	return undefined; // :D I know that this line is stupid, but just to emphasize that this function can return undefined and it has a meaning
};

let isX = true;
while(true){
	let next = nextMove(board, isX);
	if(makeMove(board, next, isX) === -1) {
		alert("I'm sorry, something is wrong");
		break;
	}
	makeMove(board, next, isX);
	if(findWinner(board) !== undefined) {
		alert("Game over, " + findWinner(board)["winner"] + " won!");
		break;
	}
	isX = !isX;
}