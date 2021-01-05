import RepositoryAbstract from "@apiRepository/repository.abstract";
import {connectToDatabase} from "@apiMiddleware/mongo.middleware";
import {NEWS_COLLECTION} from "@apiRepository/collections.config";
import {News} from "@apiDomain/news.domain";

export default class NewsRepository extends RepositoryAbstract<News> {
    static async build(): Promise<NewsRepository> {
        const connection = await connectToDatabase();

        return new NewsRepository(connection.collection<News>(NEWS_COLLECTION));
    }
}