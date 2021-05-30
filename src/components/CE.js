import React, { useState } from 'react';
import styled from 'styled-components';
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
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { styles, createMarkup, ce } from '../helpers';

const useStyles = makeStyles(() => {
	return styles;
});

const CE = () => {
	const [category, setCategory] = useState('');
	const [hasChosenCategory, sethasChosenCategory] = useState(false);

	const chooseCategoryHandler = () => {
		sethasChosenCategory(true);
	};

	const selectCategoryHandler = e => {
		let chosenCategory = e.target.value;
		setCategory(chosenCategory);
	};

	const classes = useStyles();

	return (
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
								Submit
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
	);
};

const Container = styled.div`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export default CE;