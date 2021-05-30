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
	const [chapterData, setChapterData] = useState([]);
	const [chapter, setChapter] = useState({ id: '', name: '' });
	const [category1Data, setCategory1Data] = useState([]);
	const [category, setCategory] = useState(1);
	const [category1Subjects, setCategory1Subjects] = useState(11);
	const [categoryUrl, setCategoryUrl] = useState(
		'https://entropiya-api.herokuapp.com/api/quiz/chapters?subject=11'
	);
	const [hasChosenSubject, setHasChosenSubject] = useState(false);
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
			const url2 = `https://entropiya-api.herokuapp.com/api/quiz/questions?amount=${quizNumber}&chapter=${chapter.id}&difficulty=${difficulty.number}`;
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

	// This is pag pipili palang ng subject.
	useEffect(() => {
		const fetchCategory1 = async () => {
			setIsLoading(true);
			const result = await axios(
				`https://entropiya-api.herokuapp.com/api/quiz/subjects?category=${category}`
			);
			setIsLoading(false);
			setCategory1Data(result.data);
			console.log(result.data[0].subjectDescription);
			console.log(category1Data);
		};

		fetchCategory1();
	}, [category]);

	useEffect(() => {
		const fetchChapters = async () => {
			const { data } = await axios.get(
				`https://entropiya-api.herokuapp.com/api/quiz/chapters?subject=${category1Subjects}`
			);

			setChapterData(data);
		};

		fetchChapters();

		window.scrollTo(0, '20px');
	}, [category1Subjects]);

	//this is pag pipili palang ng subject.
	const chooseSubjectHandler = () => {
		// setCategoryUrl(
		// 	`https://entropiya-api.herokuapp.com/api/quiz/chapters?subject=${category1Subjects}`
		// );
		// fetchChapters();
		setCategoryUrl(
			`https://entropiya-api.herokuapp.com/api/quiz/chapters?subject=${category1Subjects}`
		);
		setHasChosenSubject(true);
		console.log(category1Subjects);
		// console.log(category);
	};

	const selectSubjectHandler = e => {
		let chosenSubject = e.target.value;
		setCategory1Subjects(chosenSubject);
		console.log(`Chosen subject: ${chosenSubject}`);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!quizData.length && quizNumber && chapter.id && difficulty) {
			fetchQuizData();
		}
	};

	const selectChapterHandler = e => {
		e.preventDefault();
		const selectedCategory = chapterData.find(cat => cat.id === e.target.value);
		setChapter(selectedCategory);
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
		setChapter('');
		setQuizNumber('');
		setDifficulty('');
		setCurrentQuizStep('start');
		window.scrollTo(0, '20px');
	};

	// if (!chapterData.length) {
	// 	return null;
	// }

	if (isLoading) {
		return (
			<Container>
				<div className={classes.paper}>
					<Typography variant='h1' className={classes.mainTitle}>
						Please wait...
					</Typography>
				</div>
			</Container>
		);
	}

	if (!hasChosenSubject) {
		return (
			<div>
				<Container>
					<div className={classes.paper}>
						<Typography variant='h1' className={classes.mainTitle}>
							Select a category:
						</Typography>
						<form onSubmit={chooseSubjectHandler}>
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='category-select-label'>
											MSTE
										</InputLabel>
										<Select
											required
											name='category'
											value={category1Subjects || ''}
											id='subject-select'
											label='MSTE'
											labelId='categoery-select-label'
											onChange={selectSubjectHandler}
										>
											<MenuItem value={11}>
												<span
													dangerouslySetInnerHTML={createMarkup('Algebra')}
												/>
											</MenuItem>
											<MenuItem value={15}>
												<span
													dangerouslySetInnerHTML={createMarkup(
														'Engineering Economy'
													)}
												/>
											</MenuItem>
										</Select>
									</FormControl>
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
					</div>
				</Container>
			</div>
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
											Select topic:
										</InputLabel>
										<Select
											required
											name='category'
											value={chapter.id || ''}
											id='category-select'
											label='Select category'
											labelId='category-select-label'
											onChange={selectChapterHandler}
										>
											{chapterData.map(chapter => (
												<MenuItem key={chapter.id} value={chapter.id}>
													<span
														dangerouslySetInnerHTML={createMarkup(chapter.name)}
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
						categories={chapterData}
						currentQuizStep={currentQuizStep}
						setCurrentQuizStep={setCurrentQuizStep}
					/>
				)}
			</div>
		</Container>
	);
};

export default QuizCategories;
