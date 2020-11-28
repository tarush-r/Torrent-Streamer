const User = require('../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var decodedToken = '';

const register = (req, res, next) => {
    console.log("Inside register "+req)
    bycrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            });
        }
        let user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPass,
            
        });
        console.log("This is my pass: "+typeof(hashedPass))
        user.save()
        .then(user => {
            res.json({
                message: 'User Created And Saved'
            })
        })
        .catch(error=>{
            res.json({
                message: "Error Occured"
            })
        })
    });

    
}


const login = (req, res, next)=>{
    var name = req.body.name;
    var password = req.body.password;

    User.findOne({$or: [{name:name}, {password: password}]})
    .then(user=>{
        if(user){
            bycrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'very_secret_key', {expiresIn: '10s'})
                    res.json({
                        message: "Login Successful",
                        token
                    }) 
                }else{
                    res.json({
                        message: "Invalid Credentials"
                    })
                }
            })
        }else{
            res.json({
                message: "No user found"
            })
        }
    })
}

const verifyToken = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, 'very_secret_key', function(err, tokendata){
        if(err){
            console.log("FAIL!!!!!!")
            return res.json({
                message: "Invalid Request"
            });
        }
        if(tokendata){
            console.log("SUCCESSSSSSSSSSSSSSSSSSSSS")

            req.decodedToken = tokendata;
            next(); 
        }
    })
}

module.exports = {
    register,
    login,
    verifyToken,
}