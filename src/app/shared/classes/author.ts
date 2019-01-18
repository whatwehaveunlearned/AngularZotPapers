export class Author {
    affiliation:string;
    author:string;
    citations:string;
    emails:Array<string>;
    exits:string;
    hIndex:string;
    hIndex5y:string;
    i10Index:string;
    i10Index5y:string;
    id:string;
    interests:Array<string>;
    name:string;
    paperIds:string;
    papers_in_collection:string;
    picture:string;
    publications:string;

    constructor(
        affiliation,
        author,
        citations,
        emails,
        exits,
        hIndex,
        hIndex5y,
        i10Index,
        i10Index5y,
        id,
        interests,
        name,
        paperIds,
        papers_in_collection,
        picture,
        publications,
        )
        {
        this.affiliation = affiliation;
        this.author = author;
        this.citations = citations;
        this.emails = emails;
        this.exits = exits;
        this.hIndex = hIndex;
        this.hIndex5y = hIndex5y;
        this.i10Index = i10Index;
        this.i10Index5y = i10Index5y;
        this.id = id;
        this.interests = interests;
        this.name = name;
        this.paperIds = paperIds;
        this.papers_in_collection = papers_in_collection;
        this.picture = picture;
        this.publications = publications;
    }
}
