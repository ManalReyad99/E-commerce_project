const express = require("express");
const users = require('../models/users')
const bcrypt = require("bcrypt")
var router = express.Router();
const fs = require("fs");

const {
  findUsers,
  fineOne,
  createUser,
  updateUser,
  deleteUser,
  FindUserTodos,
  login,
} = require("../controllers/users");
const req = require("express/lib/request");
const res = require("express/lib/response");




router.get("/", async (req, res, next) => {
  var users = await findUsers();
  if (users) {
    res.json(users);
  } else {
    res.json({ message: "users not found" });
  }
});

router.post("/", async (req, res, next) => {
  var body = req.body;
  try {
    var user = await createUser(body);

    res.json(user);
  } catch (err) {
    res.status(422).json({ err });
  }
});

router.get("/:name", async (req, res, next) => {
  var { name } = req.params;

  var user = await fineOne(name);

  res.status(201).json(user);
});

router.get("/:id/todos", async (req, res, next) => {
  var { id } = req.params;
  var todos = await FindUserTodos(id);
  if (todos) {
    res.json(todos);
  }
  else {
    res.json({ message: "todos not found" });
  }
});

router.patch("/:name", (req, res, next) => {
  var { name } = req.params;
  var { fname } = req.body;
  var { lname } = req.body;

  updateUser(name, fname, lname)
    .then(() => {
      res.status(200).json({ message: "user updated successfully" });
    })
    .catch((err) => {
      res.status(422).json(err);
    });
});
router.delete("/:fname", (req, res, next) => {
  var { fname } = req.params;


  var deletedUser = deleteUser(fname);

  res.json(deletedUser);
});

router.post("/login", async (req, res, next) => {
  var token = await login(req.body);
  res.json({ token: token });
});




//SignUp
router.post('/signup', (req, res, next) => {
  users.find({ name: req.body.name }).
    then(result => {

      if (result.length < 1) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(404).json({
              message: err
            })
          } else {
            const user = new users({
              name: req.body.name,
              password: hash

            })
            user.save().
              then(result => {
                console.log(result),

                  res.status(200).json({
                    message: 'USer Created'
                  })
              }).
              catch(err => {
                res.status(404).json({
                  message: err
                })
              })

          }
        })

      } else {
        res.status(404).json({
          message: 'this user already created'
        })
      }

    }).catch(err => {
      res.status(401).json({
        message: err
      })
    })
})

//signin
router.post('/signin', (req, res, next) => {
  users.find({ name: req.body.name }).
    then(user => {
      if (user.length >= 1) {
        bcrypt.compare(req.body.password, user[0].password).
          then(result => {
            if (result) {
              res.status(200).json({
                message: 'signin done'
              })
            } else {
              res.status(404).json({
                message: 'wrong password'
              })
            }
          }).
          catch(err => {
            res.status(401).json({
              message: err
            })
          })
      } else {
        res.status(404).json({
          message: 'wrong username'
        })
      }

    })
})


//update user
router.patch('/update/:id', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).
    then(hash => {
      const newuser = {
        name: req.body.name,
        password: hash


      }
      users.findOneAndUpdate({ _id: req.params, id }, { $set: newuser }).
        then(result => {
          if (result) {
            res.status(202).json({
              message: 'user updated'
            })

          } else {
            res.status(404).json({
              message: 'user not found to update'
            })
          }

        }).
        catch(err => {
          res.status(404).json({
            message: err
          })
        })

    }).
    catch(err => {
      res.status(404).json({
        message: err
      })
    })

})

//delete user
router.delete('/delete/:id', (req, res, next) => {
  users.findOneAndRemove({ _id: req.params.id }).
    then(result => {
      if (result) {
        res.status(200).json({
          message: 'user deleted'

        })
      } else {
        res.status(404).json({
          message: 'user not found to deleted'
        })
      }
    }).
    catch(err => {
      res.status(404).json({
        message: err
      })
    })

})




module.exports = router;

