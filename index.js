import fastifyMySQL from '@fastify/mysql';
import Fastify from 'fastify';


const fastify = Fastify()
fastify.register(fastifyMySQL, {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'sookh_19jun',
    promise:true,
});
  

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

fastify.get('/users', async (request, reply) => {
        const [results] = await fastify.mysql.query("SELECT id, name, email, address, is_approved, created_at, updated_at FROM users");
        const totalUser = results.length;
        return { totalUser, results };
    })

/**
 * Run the server!
 */
 fastify.listen({ port: 4000 }, function (err, address) {
    if (err) {
      console.log(err);
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })