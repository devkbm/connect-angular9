import { SurveyItem } from './survey-item';

export class SurveyForm {
    id: number;
    title: string;
    comment: string;
    items: SurveyItem[];
}
