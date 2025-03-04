import { ClientBE } from '@/components/layout/clients/SharedType';

export interface ClientIndustryTypeBEProps {
  id: number;
  attributes: {
    name: string;
    clients: {
      data: ClientBE[];
    };
  };
}

export class ClientIndustryTypeBE {
  id: number = 0;
  attributes: {
    name: string;
    clients: {
      data: ClientBE[];
    };
  } = {
    name: '',
    clients: {
      data: [],
    },
  };

  constructor(data: ClientIndustryTypeBEProps) {
    this.id = data.id || this.id;
    this.attributes = data.attributes || this.attributes;
  }
}
