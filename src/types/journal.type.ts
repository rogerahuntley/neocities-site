type journal = {
  metadata: {
    title: string;
    date: string;
    tags?: string;
    travel?: string;
    hidden?: boolean;
    type?: string;
  }
  path: string;
};

type nestedDate = {
  [key: string]: journal[];
};

type nestedDates = {
  [key: string]: nestedDate;
};

export type { journal, nestedDate, nestedDates };
