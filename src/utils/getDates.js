
export const getDates = (strDate)=>{
    try{
        const time = strDate;
        const dateTime = new Date(time);
        const year = dateTime.getFullYear()
        const month = dateTime.getMonth()
        const newDateStart = new Date(year, month, 0);
        if(month==11){
            const newDateEnd = new Date(year+1, 0, 0);
        }else{
            const newDateEnd = new Date(year, month+1, 0);
        }
        
        return {isValid:true,data:[newDateStart,newDateEnd]}
    }catch(err){
        return {isValid:false,message:err.message}
    }
}

export const getStrMonthYear = (date) =>{
    const newDate = new Date(date);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();
    return month+"-"+year
}

export const getLastFiveMonthsArr = (page)=>{
    const today = new Date();
    let year = today.getFullYear()
    let month = today.getMonth()
    let monthArray = []
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const backTrackMonths = ((page-1)*5)%12;
    const backTrackYear = Math.floor(((page-1)*5)/12);
    year -=backTrackYear
    month -=backTrackMonths
    if(month<0){
        year-=1
        month +=11
    }
    
    let endDate = new Date(year+1,0,0);
  
    if(month!=11){
        endDate = new Date(year,month+1,0);
     
    }
    monthArray.push(monthNames[month]+"-"+year);
    for(let i=0;i<4;i++){
        if(month==0){
            year -=1;
        }
        else{
            month-=1
        }
        monthArray.push(monthNames[month]+"-"+year); 
    }

    let startDate = new Date(year,month,0);

    return {monthArray,startDate,endDate};
}
