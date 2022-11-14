const madge = require('madge');

const Madge = {
    async checkCircularDependencies() {
        const res = await madge('src/');
        console.log( res.circularGraph() );
    },
};

module.exports = Madge;