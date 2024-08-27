import {FastifyInstance} from "fastify";
import {addFeedback} from "./services/feedbackService";
import {analyzeFeedback} from "./services/analyzeService";

export function registerRoutes(server: FastifyInstance) {
	server.post<{Body: {text: string}}>("/feedback", {
		schema: {
			body: {
				type: "object",
				required: ["text"],
				properties: {
					text: {type: "string", minLength: 1},
				},
			},
		},
		handler: async (request, reply) => {
			const {text} = request.body;
			const result = await addFeedback(text);
			reply.send(result);
		},
	});

	server.get("/analyze", async (request, reply) => {
		const result = await analyzeFeedback();
		reply.send(result);
	});
}
