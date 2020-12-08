const square = function(x) {
    return x*x;
}

const square2 = (x) => {
    return x*x;
}

const squre3 = (x) => x*x;

console.log(square(3));
console.log(square2(3));
console.log(squre3(3));

const event = {
    name: 'Birthday Party',
    printGuestList: function() {
        console.log('Guest list for ' + this.name);
    }
};

const event2 = {
    name: 'Birthday Party',
    printGuestList: () => {
        console.log('Guest list for ' + this.name);
    }
};

const event3 = {
    name: 'Birthday Party',
    guestList: ['Rishi', 'Love', 'Varan'],
    printGuestList() {
        console.log('Guest list for ' + this.name);

        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
        });
    }
};

event.printGuestList();
event2.printGuestList();
event3.printGuestList();