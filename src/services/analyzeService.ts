import kmeans from "node-kmeans";
import {getAllFeedback} from "./feedbackService";

interface ClusterResult {
	centroid: number[];
	cluster: {
		id: number;
		text: string;
		keywords: string[];
	}[];
}

export async function analyzeFeedback(): Promise<ClusterResult[]> {
	const feedback = getAllFeedback();
	const vectors = feedback.map((item) =>
		item.keywords.map((keyword) => keyword.length)
	);

	return new Promise((resolve, reject) => {
		kmeans.clusterize(vectors, {k: 3}, (err, res) => {
			if (err) {
				reject(err);
			} else if (res) {
				const results = res.map((r) => ({
					centroid: r.centroid,
					cluster: r.clusterInd.map((index) => {
						if (
							typeof index === "number" &&
							index >= 0 &&
							index < feedback.length
						) {
							return feedback[index];
						}
						throw new Error(`Invalid index: ${index}`);
					}),
				}));
				resolve(results);
			} else {
				reject(new Error("Clustering result is undefined"));
			}
		});
	});
}
