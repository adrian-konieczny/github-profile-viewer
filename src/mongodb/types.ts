export type ResponseFuncs = {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
};

export type User = {
  _id?: number;
  name: String;
  likes: Number;
};
