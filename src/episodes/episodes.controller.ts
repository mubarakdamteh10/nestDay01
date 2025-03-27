import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/episodes.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from '../pipes/is-positive-pipe';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Controller('episodes')
export class EpisodesController {
    constructor(
        private episodesService: EpisodesService,
        private configService: ConfigService,
    ) {}
    @Get()
    findAll(
        @Query('sort') sort: 'asc' | 'desc' = 'desc',
        @Query('limit', new DefaultValuePipe(100),ParseIntPipe,IsPositivePipe) limit: number,
    ) {
        console.log(sort);
        console.log(limit);
        return this.episodesService.findAll(sort);
    }

    @Get('featured')
    findFeatured() {
        return this.episodesService.findFeatured();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const episode = await this.episodesService.findOne(id);
        console.log('Controller episode:', episode);

        if (!episode) {
            throw new NotFoundException('Episode not found');
        }

        return episode;
    }
    
    @UseGuards(ApiKeyGuard)
    @Post()
    create(@Body(ValidationPipe) input: CreateEpisodeDto) {
        console.log(input);
        return this.episodesService.create(input);
    }
}
