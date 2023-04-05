export interface INoteGroup {
  name: string;
  codes: INote[];
}

export interface INote {
  code: string;
  language: string;
  key: number;
}