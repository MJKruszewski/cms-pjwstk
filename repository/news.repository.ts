import RepositoryAbstract from "@repository/repository.abstract";
import {connectToDatabase} from "@middleware/mongo.middleware";
import {NEWS_COLLECTION} from "@repository/collections.config";
import {News} from "@domain/news.domain";

export default class NewsRepository extends RepositoryAbstract<News> {
    static async build(): Promise<NewsRepository> {
        const connection = await connectToDatabase();

        return new NewsRepository(connection.collection<News>(NEWS_COLLECTION));
    }
}