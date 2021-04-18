export interface IDataLoader {
  loading: boolean;
  skipLoader: boolean;
  internalLoader: boolean;
  data: any[];
}
export class DataLoader implements IDataLoader {
  loading = false;
  skipLoader: boolean;
  internalLoader: boolean;
  data: any[];
  constructor(internalLoader = false, skip = false) {
    this.internalLoader = internalLoader;
    this.skipLoader = skip;
  }
}
