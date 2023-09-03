const jwtCookie = require('../shared/jwt-cookie');

const verifyUser = async (req, res, next) => {
    const cookie = req.cookies.jwt || '';
    try {
        let parseOk = false;
       
            let userId = await jwtCookie.getUserIdFromCookie(cookie);
            if (userId) {
                req.user = {
                    userId: userId,
                };
            }
            else
            req.user = {
                userId: 0,
            };
            //using parseOK to conditionally reject request. 
            // setting it true outside if block as user are both registered and unregistered.
            parseOk = true;
        
        if (parseOk) {
            next();
        }
        // else {
        //     return res.status(200).send("Invalid Cookie")
        // }
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
};

module.exports = verifyUser;
