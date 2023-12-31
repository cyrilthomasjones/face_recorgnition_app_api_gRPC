const handleSignin = (db, bcrypt) => (req, res, ) => {
   const {email, password} = req.body;
   if(!email || !password){
    return res.status(400).json('incorrect from submission');
   } 
    
    // res.send('signing');
    // res.json('signin');
// bcrypt.compare("bacon", hash, function(err, res) {
//     res == true
// });
    // if(req.body.email === database.users[0].email &&
    //     req.body.password === database.users[0].password) {
    //     res.json(database.users[0])
    // } else{
    //     res.status(400).json('error logging in');
    // }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
           const isValid = bcrypt.compareSync(password, data[0].hash);
           if(isValid) {
                return db.select('*').from('users') 
                    .where('email', '=', email)    
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))         
           }else{
            res.status(400).json('wrong credential')
           }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {

    handleSignin: handleSignin

}