import {
	Grid,
	Paper,
	Select,
	Button,
	MenuItem,
	TextField,
	Container,
	Typography,
	InputLabel,
	FormControl,
} from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles, difficulties, createMarkup } from '../helpers';
import QuizAnswers from './QuizAnswers';

const useStyles = makeStyles(theme => {
	return styles;
});

const QuizCategories = () => {
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState({ id: '', name: '' });

	const [quizNumber, setQuizNumber] = useState(null);
	const [difficulty, setDifficulty] = useState({
		id: '',
		name: '',
		number: '',
	});

	const [quizData, setQuizData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const classes = useStyles();

	const [currentQuizStep, setCurrentQuizStep] = useState('start');

	const fetchQuizData = async () => {
		try {
			setIsLoading(true);
			const url2 = `https://entropiya-api.herokuapp.com/api/quiz/questions?amount=${quizNumber}&chapter=${category.id}&difficulty=${difficulty.number}`;
			const { data } = await axios.get(url2);
			setIsLoading(false);

			const formattedCategory = data.map(cat => {
				const incorrectAnswersIndexes = cat.incorrect_answers.length;
				const randomIndex = Math.round(
					Math.random() * (incorrectAnswersIndexes - 0) + 0
				);

				cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer);

				return {
					...cat,
					answers: cat.incorrect_answers,
				};
			});

			setQuizData(formattedCategory);
			console.log(formattedCategory);
			setCurrentQuizStep('results');
		} catch (error) {
			console.log('Fetch quiz error =====>>>>', error);
		}
	};

	const fetchCategories = async () => {
		const { data } = await axios.get(
			`https://entropiya-api.herokuapp.com/api/quiz/categories?subject=15`
		);

		setCategories(data);
	};

	useEffect(() => {
		fetchCategories();
		window.scrollTo(0, '20px');
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if (!quizData.length && quizNumber && category.id && difficulty) {
			fetchQuizData();
		}
	};

	const handleSelectChange = e => {
		e.preventDefault();
		const selectedCategory = categories.find(cat => cat.id === e.target.value);
		setCategory(selectedCategory);
	};

	const handleDifficultyChange = e => {
		e.preventDefault();
		const selectedDifficulty = difficulties.find(
			diff => diff.id === e.target.value
		);
		setDifficulty(selectedDifficulty);
	};

	const handleChange = e => {
		e.preventDefault();
		setQuizNumber(e.target.value);
	};

	const resetQuiz = e => {
		e.preventDefault();
		setQuizData([]);
		setCategory('');
		setQuizNumber('');
		setDifficulty('');
		setCurrentQuizStep('start');
		window.scrollTo(0, '20px');
	};

	if (!categories.length) {
		return null;
	}

	if (isLoading) {
		return (
			<Container>
				<div className={classes.paper}>
					<Typography variant='h1' className={classes.mainTitle}>
						Loading questions...
					</Typography>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className={classes.paper}>
				{currentQuizStep === 'start' ? (
					<>
						<Typography variant='h1' className={classes.mainTitle}>
							Get Questions:
						</Typography>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='category-select-label'>
											Select category:
										</InputLabel>
										<Select
											required
											name='category'
											value={category.id || ''}
											id='category-select'
											label='Select category'
											labelId='category-select-label'
											onChange={handleSelectChange}
										>
											{categories.map(category => (
												<MenuItem key={category.id} value={category.id}>
													<span
														dangerouslySetInnerHTML={createMarkup(
															category.name
														)}
													/>
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='difficulty-select-label'>
											Select Difficulty:
										</InputLabel>
										<Select
											required
											name='difficulty'
											value={difficulty.id || ''}
											id='difficulty-select'
											label='Select Difficulty'
											labelId='difficulty-select-label'
											onChange={handleDifficultyChange}
										>
											{difficulties.map(difficulty => (
												<MenuItem key={difficulty.id} value={difficulty.id}>
													{difficulty.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<TextField
										inputProps={{ min: 1, max: 10 }}
										required
										fullWidth
										type='number'
										id='quiz-number'
										variant='outlined'
										name='quiz-number'
										label={`Add a quiz number from 1 to 10`}
										value={quizNumber || ''}
										onChange={handleChange}
									/>
								</Grid>
							</Grid>
							<Button
								className={classes.submitButton}
								type='submit'
								variant='contained'
							>
								Submit
							</Button>
						</form>
					</>
				) : (
					<QuizAnswers
						classes={classes}
						quizData={quizData}
						resetQuiz={resetQuiz}
						categories={categories}
						currentQuizStep={currentQuizStep}
						setCurrentQuizStep={setCurrentQuizStep}
					/>
				)}
			</div>
		</Container>
	);
};

export default QuizCategories;