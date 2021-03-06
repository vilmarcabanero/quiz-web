export const styles = {
	paper: {
		padding: '20px',
		marginTop: '20px',
		marginBottom: '20px',
		borderRadius: '5px',
		border: 'none',
	},
	mainTitle: {
		fontSize: '45px',
		marginBottom: '20px',
	},
	submitButton: {
		marginTop: '30px',
		borderRadius: '5px',
		background: '#4398ff',
		width: '100%',
		height: '50px',
		color: '#fff',
		'&:hover': {
			backgroundColor: '#4398ff',
		},
	},
	question: {
		fontSize: '24px',
		marginBottom: '10px',
		fontWeight: '500',
		lineHeight: '35px',
		textAlign: 'justify',
	},
	answer: {
		fontSize: '18px',
		marginBottom: '10px',
		fontWeight: '500',
		lineHeight: '25px',
		marginLeft: '10px',
		display: 'flex',
	},
	correctAnswer: {
		color: 'green',
	},
	results: {
		display: 'flex',
		margin: '0 auto',
		// maxWidth: '150px',
		textAlign: 'flexStart',
		flexDirection: 'column',
	},
};

export const difficulties = [
	{ id: 'total_easy_question_count', name: 'Easy', number: '1' },
	{ id: 'total_medium_question_count', name: 'Medium', number: '2' },
	{ id: 'total_hard_question_count', name: 'Hard', number: '3' },
];

export const categoryOneSubjectList = [
	{ id: 11, name: 'Algebra' },
	{ id: 15, name: 'Engineering Economy' },
];

export const categoryTwoSubjectList = [
	{ id: 21, name: 'Fluid Mechanics' },
	{ id: 25, name: 'Soil Mechanics and Foundation' },
];

export const categoryThreeSubjectList = [
	{ id: 31, name: 'Engineering Mechanics' },
	{ id: 35, name: 'Design of Steel Structures' },
];

export const ce = [
	{
		id: 1,
		name: 'MSTE - Mathematics, Surveying and Transportation Engineering',
	},
	{ id: 2, name: 'HGE - Hydraulics and Geotechnical Engineering' },
	{ id: 3, name: 'SEC - Structural Engineering and Construction' },
];

export const createMarkup = text => {
	return { __html: text };
};
