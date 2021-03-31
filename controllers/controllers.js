const express = require("express")
const bcryptjs = require("bcryptjs")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { Admin } = require("../models/admin")
const { User } = require("../models/externaluser")

router.post('/admin/register', (req, res) =>{
  const body = req.body
  Admin.findOne({ email: body.email })
      .then(admin => {
          if (admin) {
              res.send({ error: "admin already exists" })
          } else {
              const admin = new Admin(body)
              admin.save()
                  .then(admin => {
                      res.send(admin)
                  })
                  .catch(err => {
                      res.send(err.message)
                  })
          }
      })

})

router.post("/admin/login", (req, res) => {
  const body = req.body
  Admin.findOne({ email: body.email })
      .then(admin => {
          if (!admin) {
              res.send({ error: "invalid email / password" })
          } else {
              bcryptjs.compare(body.password, admin.password)
                  .then(result => {
                      if (result) {
                          const tokenData = {
                              _id: admin._id,
                              username: admin.username,
                              createdAt: Number(new Date())
                          }
                          const token = jwt.sign(tokenData, "auth")
                          admin.tokens.push({ token })
                          admin.save()
                              .then(admin => {
                                  const admin_details = {
                                      username: admin.username,
                                      email: admin.email,
                                      token: token
                                  }
                                  res.send(admin_details)
                              })
                              .catch(err => {
                                  res.send(err)
                              })
                      }else {
                        res.send({error: "Incorrect email/Password"})
                    }
                }).catch(() => {
                      res.send({error: "Incorrect email/Password"})
                  })
          }
      }).catch(() => {
        res.send({error: "Incorrect email/Password"})
      })
})

router.get('/users', (req, res)=> {
  User.find()
      .then(function (result) {
          const allusers = []
          result.map(user => {
              const obj = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  fullAddress: user.fullAddress,
                  adharNumber: jwt.verify(user.adharNumber, 'adhar'),
                  mobileNumber: user.mobileNumber
              }
              allusers.push(obj)
          })
          res.send(allusers)
      })
      .catch(function (err) {
          res.send(err)
      })
})
router.post('/users', function (req, res) {
  const body = req.body
  const user = new User(body)
  user.save()
      .then(function (user) {
          res.send(user)
      })
      .catch(function (err) {
          res.send(err)
      })
})

module.exports = {
  Router: router
}