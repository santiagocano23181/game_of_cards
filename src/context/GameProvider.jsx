import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: {
			terna: [],
			terna2: [],
			cuarta: [],
		},
		completed: {
			terna: false,
			terna2: false,
			cuarta: false,
		},
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: {
			terna: [],
			terna2: [],
			cuarta: [],
		},
		completed: {
			terna: false,
			terna2: false,
			cuarta: false,
		},
	});

	const [obtained, setObtained] = useState([]);

	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	const startGame = async () => {
		let cards = await DeckOfCardsAPI.getCards(idGame, 10);
		cards = await changeLetters(cards);
		setPlayerGame(cards, setPlayerOne, playerOne);
		cards = await DeckOfCardsAPI.getCards(idGame, 10);
		cards = await changeLetters(cards);
		setPlayerGame(cards, setPlayerTwo, playerTwo);
	};

	const changeLetters = async cards => {
		cards = cards.map(c => {
			c.value = c.value === 'ACE' ? '1' : c.value;
			c.value = c.value === 'JACK' ? '11' : c.value;
			c.value = c.value === 'QUEEN' ? '12' : c.value;
			c.value = c.value === 'KING' ? '13' : c.value;
			return c;
		});
		return cards;
	};

	const setPlayerGame = (cards, setPlayer, player) => {
		let playerCards = {
			terna: [],
			terna2: [],
			cuarta: [],
		};
		const playerCompleted = {
			terna: false,
			terna2: false,
			cuarta: false,
		};
		cards = cards.sort(compare);
		let restCards = [...cards];
		cards.forEach(card => {
			const cardsCuartaByValue = cards.filter(cardCuarta => {
				return cardCuarta.value === card.value && cardCuarta.suit !== card.suit;
			});
			if (playerCards.cuarta.length <= cardsCuartaByValue.length) {
				restCards = cards.filter(cardCuarta => {
					return (
						(cardCuarta.value !== card.value ||
							cardCuarta.suit === card.suit) &&
						cardCuarta.code !== card.code
					);
				});
				playerCards = {
					...playerCards,
					cuarta: cardsCuartaByValue.concat([card]),
				};
				if (cardsCuartaByValue.length === 4) {
					playerCompleted.cuarta = true;
				}
			}
			const cardsCuartaBySuit = cards.filter(cardCuarta => {
				return cardCuarta.suit === card.suit && card.value !== cardCuarta.value;
			});
			if (playerCards.cuarta.length < cardsCuartaBySuit.length) {
				restCards = cards.filter(cardCuarta => {
					return (
						(cardCuarta.suit !== card.suit ||
							card.value === cardCuarta.value) &&
						cardCuarta.code !== card.code
					);
				});
				playerCards = {
					...playerCards,
					cuarta: cardsCuartaBySuit.concat([card]),
				};
			}
			if (playerCards.cuarta.length > 4) {
				playerCards.cuarta = playerCards.cuarta.sort(compare);
				restCards = restCards.concat(playerCards.cuarta.slice(4));
				playerCards = {
					...playerCards,
					cuarta: playerCards.cuarta.slice(0, 4),
				};
			}
			playerCards.cuarta.sort(compare);
		});
		cards = [...restCards];

		cards.forEach(card => {
			const cardsTernaByValue = cards.filter(cardTerna => {
				return cardTerna.value === card.value && cardTerna.suit !== card.suit;
			});
			if (playerCards.terna.length <= cardsTernaByValue.length) {
				restCards = cards.filter(cardTerna => {
					return (
						(cardTerna.value !== card.value || cardTerna.suit === card.suit) &&
						cardTerna.code !== card.code
					);
				});
				playerCards = {
					...playerCards,
					terna: cardsTernaByValue.concat([card]),
				};
				if (cardsTernaByValue.length === 3) {
					playerCompleted.terna = true;
				}
			}
			const cardsTernaBySuit = cards.filter(cardTerna => {
				return cardTerna.suit === card.suit && card.value !== cardTerna.value;
			});
			if (playerCards.terna.length < cardsTernaBySuit.length) {
				restCards = cards.filter(cardTerna => {
					return (
						(cardTerna.suit !== card.suit || card.value === cardTerna.value) &&
						cardTerna.code !== card.code
					);
				});
				playerCards = {
					...playerCards,
					terna: cardsTernaBySuit.concat([card]),
				};
			}
			if (playerCards.terna.length > 3) {
				playerCards.terna = playerCards.terna.sort(compare);
				restCards = restCards.concat(
					playerCards.terna.slice(3, playerCards.terna.length)
				);
				playerCards = { ...playerCards, terna: playerCards.terna.slice(0, 3) };
			}
			playerCards.terna.sort(compare);
		});
		cards = [...restCards];
		cards.forEach(card => {
			const cardsTerna2ByValue = cards.filter(cardTerna2 => {
				return cardTerna2.value === card.value && cardTerna2.suit !== card.suit;
			});
			if (playerCards.terna2.length <= cardsTerna2ByValue.length) {
				restCards = cards.filter(cardTerna2 => {
					return (
						(cardTerna2.value !== card.value ||
							cardTerna2.suit === card.suit) &&
						cardTerna2.code !== card.code
					);
				});
				playerCards = {
					...playerCards,
					terna2: cardsTerna2ByValue.concat([card]),
				};
				if (cardsTerna2ByValue.length === 3) {
					playerCompleted.terna2 = true;
				}
			}
			const cardsTerna2BySuit = cards.filter(cardTerna2 => {
				return cardTerna2.suit === card.suit && card.value !== cardTerna2.value;
			});
			if (playerCards.terna2.length < cardsTerna2BySuit.length) {
				restCards = cards.filter(cardTerna2 => {
					return (
						(cardTerna2.suit !== card.suit ||
							card.value === cardTerna2.value) &&
						cardTerna2.code !== card.code
					);
				});
				playerCards = {
					...playerCards,
					terna2: cardsTerna2BySuit.concat([card]),
				};
			}
			if (playerCards.terna2.length > 3) {
				playerCards.terna2 = playerCards.terna2.sort(compare);
				restCards = restCards.concat(
					playerCards.terna2.slice(3, playerCards.terna2.length)
				);
				playerCards = {
					...playerCards,
					terna2: playerCards.terna2.slice(0, 3),
				};
			}
			playerCards.terna2.sort(compare);
		});
		cards = [...restCards];
		if (playerCards.cuarta.length < 4) {
			restCards = restCards.slice(4 - playerCards.cuarta.length);
			playerCards = {
				...playerCards,
				cuarta: playerCards.cuarta.concat(
					cards.slice(0, 4 - playerCards.cuarta.length)
				),
			};
			playerCards.cuarta.sort(compare);
		}
		cards = [...restCards];
		if (playerCards.terna.length < 3) {
			restCards = restCards.slice(3 - playerCards.terna.length);
			playerCards = {
				...playerCards,
				terna: playerCards.terna.concat(
					cards.slice(0, 3 - playerCards.terna.length)
				),
			};
			playerCards.terna.sort(compare);
		}
		cards = [...restCards];
		if (playerCards.terna2.length < 3) {
			restCards = restCards.slice(3 - playerCards.terna2.length);
			playerCards = {
				...playerCards,
				terna2: playerCards.terna2.concat(
					cards.slice(0, 3 - playerCards.terna2.length)
				),
			};
			playerCards.terna2.sort(compare);
		}
		setPlayer({ ...player, cards: playerCards });
	};

	const compare = (a, b) => {
		if (parseInt(a.value) < parseInt(b.value)) {
			return -1;
		}
		if (parseInt(a.value) > parseInt(b.value)) {
			return 1;
		}
		// a debe ser igual b
		return 0;
	};

	const changeCard = (card, player, setPlayer) => {
		const cards = { ...player.cards };
		let cuarta;
		if (player.completed.terna2 === false) {
			cuarta = changeInArray([...cards.cuarta], 4, card);
		}
		if (cuarta === undefined) {
			let terna;
			if (player.completed.terna === false) {
				terna = changeInArray([...cards.terna], 3, card);
			}
			if (terna === undefined) {
				let terna2;
				if (player.completed.terna2 === false) {
					terna2 = changeInArray([...cards.terna2], 3, card);
				}
				if (terna2 === undefined) {
					return false;
				} else {
					if (player.completed.terna2 === false) {
						cards.terna2 = terna2;
						cards.terna2 = cards.terna2.sort(compare);
						setPlayer({ ...player, cards });
					}
				}
			} else {
				if (player.completed.terna === false) {
					cards.terna = terna;
					cards.terna = cards.terna.sort(compare);
					setPlayer({ ...player, cards });
				}
			}
		} else {
			if (player.completed.cuarta === false) {
				cards.cuarta = cuarta;
				cards.cuarta = cards.cuarta.sort(compare);
				setPlayer({ ...player, cards });
			}
		}
		return false;
	};

	const changeInArray = (list, number, card) => {
		const repited = list.filter(c => {
			return c.code === card.code;
		});
		if(repited.length > 0){
			return undefined;
		}
		const filterListByValue = list.filter(c => {
			return c.value === card.value;
		});
		if (filterListByValue.length > 1 && filterListByValue.length < number) {
			const findSame = filterListByValue.find(e => {
				return e.suit === card.suit;
			});
			if (findSame === undefined) {
				const findDiferent = list.find(c => {
					return c.value !== card.value;
				});
				const index = list.findIndex((e, i) => {
					if (e.code === findDiferent.code) {
						return true;
					}
					return false;
				});

				list[index] = card;
				return list;
			}
		}
		const filterListBySuit0 = list.filter(c => {
			return list[0].suit === c.suit;
		});
		if(filterListBySuit0.length === 1){
			list[0] = card;
			return list;
		}
		const filterListBySuit = list.filter(c => {
			return c.suit === card.suit;
		});
		if (filterListBySuit.length > 1 && filterListBySuit.length < number) {
			const findDiferent = list.find(c => {
				return c.suit !== card.suit;
			});
			const index = list.findIndex((e, i) => {
				if (e.code === findDiferent.code) {
					return true;
				}
				return false;
			});
			list[index] = card;
			return list;
		} else if (filterListBySuit.length === number) {
			let replace;
			let i = 0;
			while (i < filterListBySuit.length - 1) {
				if (
					parseInt(filterListBySuit[i + 1].value) !==
					(parseInt(filterListBySuit[i].value) + 1)
				) {
					
					if (replace === undefined) {
						if (i === 0) {
							replace = filterListBySuit[i];
						} else if (i === number - 1) {
							replace = filterListBySuit[i + 1];
						} else {
							const menos1 =
								filterListBySuit[i].value - filterListBySuit[i - 1].value;
							const mas1 =
								filterListBySuit[i + 1].value - filterListBySuit[i].value;
							if (menos1 <= mas1) {
								replace = filterListBySuit[i + 1];
							} else {
								replace = filterListBySuit[i - 1];
							}
						}
					}
				}
				i++;
			}
			if (replace !== undefined) {
				const index = filterListBySuit.findIndex((e, i) => {
					if (e.code === replace.code) {
						return true;
					}
					return false;
				});
				list[index] = card;
				return list;
			}
		}

		return undefined;
	};

	const areConsecutive = array => {
		if (array.length < 2) return -1;
		let i = 0;
		while (i < array.length - 1) {
			if (Math.abs(parseInt(array[i].value) - parseInt(array[++i].value)) !== 1)
				return -1;
		}
		return 0;
	};

	const validateWinnerList = async (list, number) => {
		const card = list[0];
		const filterListByValue = list.filter(e => {
			return card.value === e.value;
		});
		if (filterListByValue.length === number) {
			return true;
		}
		const filterListBySuit = list.filter(e => {
			return card.suit === e.suit;
		});
		if (filterListBySuit.length === number) {
			if (areConsecutive(list) === 0) {
				return true;
			}
		}
		return false;
	};

	const validateWinner = async (player, setPlayer) => {
		const com = {};
		com.cuarta = await validateWinnerList(player.cards.cuarta, 4);
		com.terna = await validateWinnerList(player.cards.terna, 3);
		com.terna2 = await validateWinnerList(player.cards.terna2, 3);
		await setPlayer({ ...player, completed: com });
	};

	const setValidate = async () => {
		await validateWinner(playerOne, setPlayerOne);
		await validateWinner(playerTwo, setPlayerTwo);
	};

	const requestCards = async () => {
		const cards = await DeckOfCardsAPI.getCards(idGame, 2);
		const cardsValue = await changeLetters(cards);

		let completed = playerOne.completed;
		const playerOneStatus =
			completed.cuarta && completed.terna && completed.terna2;
		completed = playerTwo.completed;
		const playerTwoStatus =
			completed.cuarta && completed.terna && completed.terna2;

		if (playerOneStatus || playerTwoStatus) {
			setShowToast(true);
			setWinName(playerOneStatus ? playerOne.name : playerTwo.name);
			return;
		}
		if (cardsValue.length === 0) {
			setShowToast(true);
			setWinName('EMPATE');
			
			/* playGame();
			return; */
		}
		changeCard(cardsValue[0], playerOne, setPlayerOne);
		changeCard(cardsValue[1], playerTwo, setPlayerTwo);

		setObtained(cards);
	};

	return (
		<GameContext.Provider
			value={{
				playGame,
				requestCards,
				startGame,
				setValidate,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				showToast,
				setShowToast,
				winName,
				obtained,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
