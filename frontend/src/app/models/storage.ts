import { ArticleInfo } from "./articleInfo";
import { Table } from "./table";

export class Storage {
    id: string;
    name: string;
    articles: Array<ArticleInfo>;
    tables: Array<Table>;
}