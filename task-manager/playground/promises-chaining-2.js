require('../src/db/mongoose');
const Task = require('../src/models/task');

// promise chaining

/*Task.findByIdAndDelete('5fb598d25c797f37789d17cb').then(task => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
});*/

const deleteTaskAndCount = async (id) => {
    // if we do not use the task value which is the return value, we can ignore and just call await without any variable
    // storing its value
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
};

deleteTaskAndCount('5fb5a81512d63946bcb3b443').then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
});