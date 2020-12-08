// Object property shorthand

const name = 'Rishi';
const userAge = 22;

const user = {
    name,
    age: userAge,
    location: 'Canada'
};

console.log(user);

// Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    saleprice: undefined
};

// const lable = product.label;
// const stock = product.stick;

//if rating is present in the object, its value will be used else the default value i.e. 5 will be used
const { label:productLabel, stock, rating = 5 } = product;

console.log(productLabel);
console.log(stock);
console.log(rating);

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock);
};  

transaction('order', product);