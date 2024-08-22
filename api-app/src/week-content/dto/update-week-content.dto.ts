import { PartialType } from '@nestjs/swagger';
import { CreateWeekContentDto } from './create-week-content.dto';

export class UpdateWeekContentDto extends PartialType(CreateWeekContentDto) {}
