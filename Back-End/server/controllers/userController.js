const userService = require('../services/userService');

module.exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error('Something went wrong in userController.js', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.confirmEmail = async (req, res) => {
  const { userId } = req.params;
  console.log(`User ID from URL: ${userId}`); // Ajouter ce log

  try {
    const user = await User.findById(userId);

    console.log(`User found: ${user}`); // Ajouter ce log

    if (!user) {
      console.log("User not found"); // Ajouter ce log
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user.confirmed) {
      console.log("User already confirmed"); // Ajouter ce log
      return res.status(400).json({ message: "L'utilisateur est déjà confirmé" });
    }

    user.confirmed = true;
    await user.save();

    console.log("User confirmed successfully"); // Ajouter ce log
    res.status(200).json({ message: "L'utilisateur a été confirmé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la confirmation de l'utilisateur" });
  }
};
module.exports.loginUser = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.loginUser(req.body)
    response.status = 200
    response.message = 'User successfully logged in'
    response.body = responseFromService
  } catch (error) {
    console.error('Error in loginUser (userController.js)')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.getUserProfile(req)
    response.status = 200
    response.message = 'Successfully got user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getAllProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.getAllProfile(req)
    response.status = 200
    response.message = 'Successfully got All users profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateUserProfile(req)
    response.status = 200
    response.message = 'Successfully updated user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateDescription = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateDescription(req)
    response.status = 200
    response.message = 'Successfully updated description of operation'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.addAccount = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.addAccount(req)
    response.status = 200
    response.message = 'Successfully create a new account'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.addOperation = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.addOperation(req)
    response.status = 200
    response.message = 'Successfully create a new operation'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.closeAccount = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.closeAccount(req)
    response.status = 200
    response.message = 'Successfully close this account'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in closeAccount - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}