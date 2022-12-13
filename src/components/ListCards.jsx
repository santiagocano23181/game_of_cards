import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useGame from '../hooks/useGame';
const ListCards = () => {
	const { playerOne, playerTwo, obtained } = useGame();
	return (
		<Container>
			<Row>
				<Row>
					<div className='align-items-center my-2'>
						<h4>Player {playerOne.name}</h4>
						<p>Cards obtained</p>
						{playerOne.cards.cuarta.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
						{playerOne.cards.terna.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
						{playerOne.cards.terna2.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
					</div>
				</Row>
				<Row>
					<div className='align-items-center my-2'>
						<h4>Player {playerTwo.name}</h4>
						<p>Cards obtained</p>
						{playerTwo.cards.cuarta.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
						{playerTwo.cards.terna.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
						{playerTwo.cards.terna2.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
					</div>
				</Row>

				<Row>
					<div className='align-items-center my-2'>
						<h4>Obtained cards</h4>
						{obtained.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
					</div>
				</Row>
			</Row>
		</Container>
	);
};

export default ListCards;
