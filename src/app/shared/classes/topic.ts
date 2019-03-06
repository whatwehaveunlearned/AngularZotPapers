export class Topic {
    id:number;
    order:number;
    words:Array<any> = []

    constructor(id,order,topic_words_dic){
        this.order = parseInt(order);
        for (let key in topic_words_dic) {
            if (key !=='NAN'){
                this.words.push(topic_words_dic[key]);
            }
        }
    }
}
