import { Image, Video } from '@/api/models/shared';

export interface WrittenTestimonialFE {
  client_Image: {
    alternativeText?: string;
    caption?: string;
    url: string;
  };
  client_Name: string;
  client_Occupation: string;
  testimonial_Text: string;
  id: number;
}

export interface VideoTestimonialFE {
  video: {
    alternativeText?: string;
    caption?: string;
    url: string;
    type: string;
    thumbnail?: string;
  };
  client_Name: string;
  client_Occupation: string;
  id: number;
}

export interface WrittenTestimonialBE {
  id: number;
  attributes: {
    testimonial: [
      {
        client_image: Image;
        client_name: string;
        client_occupation: string;
        testimonial_text: string;
        id: number;
        __component: string;
      },
    ];
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface VideoTestimonialBE {
  id: number;
  attributes: {
    testimonial: [
      {
        video: Video;
        client_name: string;
        client_occupation: string;
        testimonial_text: string;
        thumbnail: Image;
        id: number;
        __component: string;
      },
    ];
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
