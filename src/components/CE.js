import React, { useState } from 'react';
import CategoryOne from './CategoryOne';
import CategoryTwo from './CategoryTwo';
import CategoryThree from './CategoryThree';
import {
	Grid,
	Select,
	Button,
	MenuItem,
	Typography,
	InputLabel,
	FormControl,
	Container,
} from '@material-ui/core';

import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles';
import { styles, createMarkup, ce } from '../helpers';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(() => {
	return styles;
});

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#4398ff',
		},
		secondary: {
			main: green[500],
		},
	},
});

const CE = ({ hasChosenCategoryFromQuiz }) => {
	const [category, setCategory] = useState('');
	const [hasChosenCategory, setHasChosenCategory] = useState(
		hasChosenCategoryFromQuiz
	);
	const chooseCategoryHandler = () => {
		setHasChosenCategory(true);
	};

	const selectCategoryHandler = e => {
		let chosenCategory = e.target.value;
		setCategory(chosenCategory);
	};

	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<Container>
				{!hasChosenCategory ? (
					<div>
						<div className={classes.paper}>
							<Typography variant='h1' className={classes.mainTitle}>
								Select a category:
							</Typography>
							<form onSubmit={chooseCategoryHandler}>
								<Grid container spacing={4}>
									<Grid item xs={12}>
										<FormControl fullWidth variant='outlined'>
											<InputLabel id='category-select-label'>CE</InputLabel>
											<Select
												required
												name='category'
												value={category || ''}
												id='subject-select'
												label='CE'
												labelId='categoery-select-label'
												onChange={selectCategoryHandler}
											>
												{ce.map(category => (
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
								</Grid>
								<Button
									className={classes.submitButton}
									type='submit'
									variant='contained'
								>
									Select Category
								</Button>
							</form>
						</div>
					</div>
				) : category === 1 ? (
					<CategoryOne />
				) : category === 2 ? (
					<CategoryTwo />
				) : category === 3 ? (
					<CategoryThree />
				) : (
					<div>Please select a cateogry.</div>
				)}
			</Container>
		</ThemeProvider>
	);
};

export default CE;
