type journal = {
  metadata: {
    title: string;
    date: string;
    tags?: string;
    travel?: string;
    hidden?: boolean;
  };
  path: string;
};

type nestedDate = {
  [key: string]: journal[];
};

type nestedDates = {
  [key: string]: nestedDate;
};

export type { journal, nestedDate, nestedDates };
