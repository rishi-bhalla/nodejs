var configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb://127.0.0.1:27017/todo-list';
    }
}