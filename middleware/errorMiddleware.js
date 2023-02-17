import dotenv from "dotenv";

dotenv.config();

//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if(errors.length > 1) {
       const formattedErrors = errors.join(' ');
       res.status(code).send({messages: formattedErrors, fields:     fields});
     } else {
        res.status(code).send({messages: errors, fields: fields})
     }
 }

export const errorHandler = (err, req, res, next) => {
    console.log("Error handler middleware called....",err)
    if(err.name === "ValidatorError")
        return err = handleValidationError(err, res);
    // res.json({
    //     "message" : err,
    //     "stack" : err.stack
    // })
}