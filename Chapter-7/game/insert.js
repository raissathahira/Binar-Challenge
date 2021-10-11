const { user_game } = require('./models')


user_game.create({
    username: 'raissa',
    password: 'thahira',
    email: 'admin',
    generate_random: "random_string"
   })
    .then(result => {
      console.log(result)
})