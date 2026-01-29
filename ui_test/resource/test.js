const users = [
    { id: 1, name: "이성계" },
    { id: 2, name: "이방과" },
    { id: 3, name: "이방원" }
];
let users2 = JSON.stringify(users);

const userMap = users.map(user => {
    return user.id * 2;
});
console.log(userMap);
console.log(users2);