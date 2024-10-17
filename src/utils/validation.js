export const validateUserProfileData = (userData)=>{
    const requiredField = ["email","phone","password","name"]
    return requiredField.every(k=>k in userData);
}

export const isValidExpenseData = (req)=>{
    const reqFields = ["amount","comment"]
    return reqFields.every(e=>Object.keys(req.body).includes(e));
}