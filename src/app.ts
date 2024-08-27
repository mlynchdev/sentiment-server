import fastify, {FastifyInstance} from "fastify";
import {registerRoutes} from "./routes";

const server: FastifyInstance = fastify({logger: true});
const port = 3000;

registerRoutes(server);

const start = async () => {
	try {
		await server.listen({port});
		console.log(`Server is running on http://localhost:${port}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
