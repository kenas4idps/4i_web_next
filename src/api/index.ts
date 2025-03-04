import { AxiosInstance } from 'axios';
import {
  caseStudyApi,
  companyHistoryApi,
  contactUsApi,
  eventApi,
  getInTouchFormApi,
  homePageApi,
  insightApi,
  newsletterSubscriberApi,
  sharedApi,
  solutionApi,
  toolsApi,
  whitePaperFormApi,
} from './collections';
import { CommonClient } from './clients';

export interface APIProps {
  userClient: AxiosInstance;
}

export class API {
  caseStudy: CaseStudyAPI;
  companyHistory: CompanyHistoryAPI;
  contactUs: ContactUsAPI;
  event: EventAPI;
  getInTouchForm: GetInTouchFormAPI;
  homePage: HomePageAPI;
  insight: InsightAPI;
  newsletterSubscriber: NewsletterSubscriberAPI;
  shared: SharedAPI;
  solution: SolutionAPI;
  tools: ToolsAPI;
  whitePaperForm: WhitePaperFormAPI;

  constructor({ userClient }: APIProps) {
    this.caseStudy = new CaseStudyAPI(userClient);
    this.companyHistory = new CompanyHistoryAPI(userClient);
    this.contactUs = new ContactUsAPI(userClient);
    this.event = new EventAPI(userClient);
    this.getInTouchForm = new GetInTouchFormAPI(userClient);
    this.homePage = new HomePageAPI(userClient);
    this.insight = new InsightAPI(userClient);
    this.newsletterSubscriber = new NewsletterSubscriberAPI(userClient);
    this.shared = new SharedAPI(userClient);
    this.solution = new SolutionAPI(userClient);
    this.tools = new ToolsAPI(userClient);
    this.whitePaperForm = new WhitePaperFormAPI(userClient);
  }
}

class CaseStudyAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof caseStudyApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = caseStudyApi({ axios: this.client });
  }
}

class CompanyHistoryAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof companyHistoryApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = companyHistoryApi({ axios: this.client });
  }
}

class ContactUsAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof contactUsApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = contactUsApi({ axios: this.client });
  }
}

class EventAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof eventApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = eventApi({ axios: this.client });
  }
}

class GetInTouchFormAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof getInTouchFormApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = getInTouchFormApi({ axios: this.client });
  }
}

class HomePageAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof homePageApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = homePageApi({ axios: this.client });
  }
}

class InsightAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof insightApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = insightApi({ axios: this.client });
  }
}

class NewsletterSubscriberAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof newsletterSubscriberApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = newsletterSubscriberApi({ axios: this.client });
  }
}

class SharedAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof sharedApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = sharedApi({ axios: this.client });
  }
}

class SolutionAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof solutionApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = solutionApi({ axios: this.client });
  }
}

class ToolsAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof toolsApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = toolsApi({ axios: this.client });
  }
}

class WhitePaperFormAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof whitePaperFormApi>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = whitePaperFormApi({ axios: this.client });
  }
}

export const api = new API({ userClient: CommonClient });
