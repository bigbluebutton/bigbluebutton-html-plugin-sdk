interface ErrorDisplay {
    message: string,
    status: number,
}

interface Quiz {
    question: string,
	correct_answer: string,
	wrong_answers: string[],
	index_of_correct_answer: number
}

export { ErrorDisplay, Quiz };
