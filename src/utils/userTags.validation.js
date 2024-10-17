export const userTags=[
    "self",
    "family",
    "important",
    "unnecesary",
    "friend",
    "medical",
    "food",
    "groceries",
    "rent",
    "entertainment",
    "education",
    "travel",
    "shopping",
    "charity",
    "savings",
    "debt_repayment",
    "miscellaneous",
];

export const filterValidTags = (user,tags)=>{
    const userTags = user.userTags;
    let allowedTags = [];
    if (tags){
        tags.forEach(element => {
            if(userTags.includes(element.toLowerCase())){
                if(!allowedTags.includes(element.toLowerCase())){
                    allowedTags.push(element.toLowerCase());
                }   
            }
        });
    }
    return allowedTags;
}
