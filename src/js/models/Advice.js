import axios from 'axios';

export default class Advice {
    constructor(id) {
        this.adviceID = id;
    }
    
    async getAdvice() {
        try {
            const res = await axios(`https://api.adviceslip.com/advice/${this.adviceID}`);
            console.log(res);
            //console.log(res.data);
            const adviceObject = JSON.parse(res.data);
            //console.log(adviceObject);
            this.text = res.data.slip.advice;
            //console.log(this.text);
        } 
        catch(error) {
            console.log(error);
            alert('Something went wrong requesting advice by id. Check console!');
        }
    };
}