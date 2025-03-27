import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { randomUUID } from 'crypto';
import { CreateEpisodeDto } from './dto/episodes.dto';

@Injectable()
export class EpisodesService {
    private episodes: Episode[] = [];

    async findAll(sort: 'asc' | 'desc' = 'desc') {
        const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
        const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

        return sort === 'asc'
            ? this.episodes.sort(sortAsc)
            : this.episodes.sort(sortDesc);
    }

    async findFeatured() {
        return this.episodes.filter((episode) => episode.featured);
    }

    async findOne(id: string) {
        return this.episodes.filter((episode) => episode.id === id);
    }


    // error 404
    // async findOne(id: string) {
    //     const result = this.episodes.find((episode) => episode.id === id);
    //     console.log('findOne result:', result);
    //     return result;
    // }
    

    async create(createEpisodesDto: CreateEpisodeDto) {
        const newEpisode = { ...createEpisodesDto, id: randomUUID() };
        this.episodes.push(newEpisode);

        return newEpisode;
    }
}
