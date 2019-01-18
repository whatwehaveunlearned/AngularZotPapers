export class Paper_Item {
    key:string;
    name:string;
    contentType:string;
    creators:Array<string>;
    date:string;
    dateAdded:string;
    dateModified:string;
    filename:string;
    itemType:string;
    linkMode:string;
    md5:string;
    note_x:string;
    note_y:string;
    parentItem_x:string;
    parentItem_y:string;
    pdf_file:string;
    tags_x:string;
    tags_y:string;

    constructor(
        key,
        name,
        contentType,
        creators,
        date,
        dateAdded,
        dateModified,
        filename,
        itemType,
        linkMode,
        md5,
        note_x,
        note_y,
        parentItem_x,
        parentItem_y,
        pdf_file,
        tags_x,
        tags_y,
        )
        {
        this.key = key;
        this.name = name;
        this.contentType = contentType;
        this.creators = creators;
        this.date = date;
        this.dateAdded = dateAdded;
        this.dateModified = dateModified;
        this.filename = filename;
        this.itemType = itemType;
        this.linkMode = linkMode;
        this.md5 = md5;
        this.note_x = note_x;
        this.note_y = note_y;
        this.parentItem_x = parentItem_x;
        this.parentItem_y = parentItem_y;
        this.pdf_file = pdf_file;
        this.tags_x = tags_x;
        this.tags_y = tags_y;
    }
}
