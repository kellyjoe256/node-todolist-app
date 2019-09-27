const dbUrl = process.env.DBURL || 'mongodb://localhost:27017/todolist';

module.exports = {
    url: dbUrl,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
}
