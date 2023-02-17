import dotenv from "dotenv";

dotenv.config();

//handle field formatting, empty fields, and mismatched passwords
// const handleValidationError = (err, res) => {
//     let errors = Object.values(err.errors).map(el => el.message);
//     let fields = Object.values(err.errors).map(el => el.path);
//     let code = 400;
//     if(errors.length > 1) {
//        const formattedErrors = errors.join(' ');
//        res.status(code).send({messages: formattedErrors, fields:     fields});
//      } else {
//         res.status(code).send({messages: errors, fields: fields})
//      }
//  }

export const errorHandler = (err, req, res, next) => {
    console.log("Error handler middleware called....",Object.values(err))
    if(err.name === "ValidationError") {
        console.log("validotor error called........")
        res.status(400).json({
            "message" : err.message,
        })
    }
}