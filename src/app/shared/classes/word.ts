export class Word {
    C:number;
    count:number;
    exemplar:boolean;
    pos:number;
    sigma_nor:number;
    topic:number;
    vector:string;
    vocab_index:number
    word:string;
    x:number;
    y:number;

    constructor(C,count,exemplar,pos,sigma_nor,topic,vector,vocab_index,word,x,y){
        this.C = C;
        this.count = count;
        if (exemplar === "*") this.exemplar = true;
        else this.exemplar = false;
        this.pos = pos;
        this.sigma_nor=sigma_nor;
        this.topic = topic;
        this.vector = vector;
        this.vocab_index = vocab_index;
        this.word = word;
        this.x = x;
        this.y = y;
    }
}
