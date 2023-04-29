require('colors');

module.exports = async (client) => {
    try {
        await client.login(process.env.TOKEN).catch(console.error);
        console.log(`\nConnected to the client : ${client.user.username}`.cyan);
    } catch (err) {
        console.log(`${err.message}. exiting now...`);
        console.log(err.stack);
        process.exit(1);
    }
}
