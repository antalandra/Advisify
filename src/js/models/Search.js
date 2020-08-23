import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults() {
        try {
            const apiResult = await axios(`https://api.adviceslip.com/advice/search/${this.query}`);
            this.result = apiResult.data.slips;
            console.log(this.result);
        }
        catch(error){
            console.log(error);
        }
    };
}
