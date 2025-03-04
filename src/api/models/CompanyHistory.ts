interface CompanyHistoryBE {
  attributes: {
    date: string;
    title: string;
    description: string;
  };
  id: number;
}

export class CompanyHistory {
  date: string;
  title: string;
  description: string;
  id: number;

  constructor(data: CompanyHistoryBE) {
    this.date = data.attributes.date;
    this.title = data.attributes.title;
    this.description = data.attributes.description;
    this.id = data.id;
  }
}
