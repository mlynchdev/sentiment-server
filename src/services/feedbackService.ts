import natural from "natural";

const TfIdf = natural.TfIdf;
let tfidf = new TfIdf();

interface Feedback {
	id: number;
	text: string;
	keywords: string[];
}

let feedbackData: Feedback[] = [];
let currentId = 0;

function extractKeywords(text: string): string[] {
	// Reset TfIdf for each new document
	tfidf = new TfIdf();

	// Tokenize and add the document
	const tokenizer = new natural.WordTokenizer();
	const tokens = tokenizer.tokenize(text.toLowerCase()) || [];
	tfidf.addDocument(tokens);

	// Get the top 5 terms
	const items = tfidf.listTerms(0);
	return items.slice(0, 5).map((item) => item.term);
}

export function addFeedback(text: string): Feedback {
	const keywords = extractKeywords(text);
	const feedback: Feedback = {
		id: ++currentId,
		text,
		keywords,
	};
	feedbackData.push(feedback);
	return feedback;
}

export function getAllFeedback(): Feedback[] {
	return feedbackData;
}
