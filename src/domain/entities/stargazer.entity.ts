class StargazerEntity {
  constructor(private _avatarUrl: string, private _name: string) {}

  get avatarUrl(): string {
    return this._avatarUrl;
  }

  get name(): string {
    return this._name;
  }
}

export default StargazerEntity;
