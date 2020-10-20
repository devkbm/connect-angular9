import { DeptChangeHistory } from './dept-change-history';
import { JobChangeHistory } from './job-change-history';
import { StatusChangeHistory } from './status-change-history';

export class Employee {
  	id: string;
  	name: string;
  	nameEng: string;
	nameChi: string;
  	residentRegistrationNumber: string;
  	gender: string;
  	birthday: Date;
  	workCondition: string;
  	imagePath: string;
  	deptHistory: DeptChangeHistory[];
	jobHistory: JobChangeHistory[];
	statusHistory: StatusChangeHistory[];
	deptChangeHistory: any;// DeptChangeHistory[];
	jobChangeHistory: any; //JobChangeHistory[];
	statusChangeHistory: any; //StatusChangeHistory[];
}

