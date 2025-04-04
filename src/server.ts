function welcome(message: string) {
    // console.log(`${message}`);
    const user = {
        name: 'kunal hulke',
    };
    const fname = user.name;
    return fname + message;
}

console.log(welcome('hello everyone'));
