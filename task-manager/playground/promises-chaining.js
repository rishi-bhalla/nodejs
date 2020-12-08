require('../src/db/mongoose');
const { count } = require('../src/models/user');
const User = require('../src/models/user');

// promise chaining

/*User.findByIdAndUpdate('5fb5a5a360530541a0dc2f95', { age: 1 }).then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
});*/

const updateAgeAndCount = async (id, age) => {
    // if we do not use the user value which is the return value, we can ignore and just call await without any variable
    // storing its value
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('5fb5a5a360530541a0dc2f95', 2).then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
});