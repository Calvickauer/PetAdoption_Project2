const db = require('./models');
const pet = require('./models/pet');

// Implement CRUD for user model

// CREATE
async function createUser() {
    try {
        const newUser = await db.user.create({
            name: "My Name",
            email: "myemail@gmail.com"
        });
        console.log('my new user >>>', newUser);
    } catch (error) {
        console.log('new user was not created b/c of >>>', error);
    }
    
}
// @todo run createUser function below

// READ
// find one user
async function findOneUser() {
    try {
        const user = await db.user.findOne({
            where: { id: 1 }
        });
        console.log('current user here >>>', user);  
    } catch (error) {
        console.log('did not find user b/c of >>>', error);
    }
}
// @todo run findOneUser function below

// find all users
async function findAllUsers() {
    try {
        const users = await db.user.findAll();
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}
// @todo run findAllUsers function below

// find one user
async function findOrCreate() {
    try {
        const users = await db.user.findOrCreate({
            where: { email: 'brainsmith@gmail.com' },
            defaults: {
                name: 'Brian Smith',
            },
        });
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}
// @todo run findOrCreate function below

// UPDATE
async function updateUser() {
    try {
        const numRowsUpdated = await db.user.update({
            name: 'Brain Taco'
        }, {
            where: {
                email: 'brainsmith@gmail.com'
            }
        });
        console.log('number of users updated', numRowsUpdated);
    } catch (error) {
        console.log('did not update user(s) because of >>>', error);
    }
}
// @todo run updateUser function below

// DELETE
async function deleteUser() {
    try {
        let numOfRowsDeleted = await db.user.destroy({
            where: { email: 'brainsmith@gmail.com' }
        });
        console.log('number of rows deleted >>>', numOfRowsDeleted);
    } catch (error) {
        console.log('did not delete user(s) because of >>>', error);
    }
}
// @todo run deleteUser function below


async function createAnimalTest(){
    try {
        const newPet = await db.pet.create({
            name:"Olive",
            type:"dog",
            breed:"pug",
            sex:'Female',
            age: 100,
            locationId: 10
        })
        console.log(newPet);
    } catch (error){
        console.log('There was an error creating test Pet');
    }
}

// createAnimalTest();

async function createCommentTest(){
    try {
        const newComment = await db.comment.create({
            petId: 10111,
            userId: 1010101,
            title: "this is the Test title",
            comment: "this is the test comment"
        })
        console.log(newComment);
    } catch (error){
        console.log('there was an error creating test comment');
    }
}

// createCommentTest();

// this one doesnt work yet
// async function createTestFavorite(){
//     try {
//         const newFav = await db.favorite.create({
//             petId: 100000,
//             userId: 222222,
//             commentId:40000
//         })
//         console.log(newFav);
//     } catch (error){
//         console.log(error,' There was an error creating favorite test');
//     }
// }

// createTestFavorite();


async function Pet(){
    try {
        const newPet = await db.pet.create({
        name: "barry"
        })
        console.log(newPet);
    } catch (error){
        console.log('there was an error creating test pet');
    }
}

Pet();