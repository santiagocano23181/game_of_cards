import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
const FormPlay = () => {
	const { requestCards, startGame, playerOne, setValidate } = useGame();
	const handleClick = async () => {
		if (playerOne.cards.cuarta.length === 0) {
			await startGame();
		} else {
			await setValidate();
			await requestCards();
		}
	};
	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button onClick={handleClick} variant='secondary'>
				Cards
			</Button>
		</Stack>
	);
};

export default FormPlay;
