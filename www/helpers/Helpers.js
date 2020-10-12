class DateHelper {
     
    constructor(){
        console.log("CLASSE ESTÁTICA: DateHelper");
    }
    
    //AAAA-MM-DD > DD/MM/AAAA
    static converterData(tempData) {

        return `${tempData.getDate()}/${tempData.getMonth() + 1}/${tempData.getFullYear()}`;
        
    }
    
  }