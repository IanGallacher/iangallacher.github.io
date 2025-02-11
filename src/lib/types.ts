export type ExternalLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  location?: string;
  img: string;
  externalLinks: ReadonlyArray<ExternalLink>;
};

export type ResumeEntry = {
  accomplishments?: ReadonlyArray<string>;
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
};
