export interface INote {
  code: string;
  language: string;
}

export interface INoteGroup {
  name: string;
  code: INote[];
}