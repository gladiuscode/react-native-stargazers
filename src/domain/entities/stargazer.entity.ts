class StargazerEntity {
  constructor(
    private _id: number,
    private _avatarUrl: string,
    private _name: string,
  ) {}

  get id(): number {
    return this._id;
  }

  get avatarUrl(): string {
    return this._avatarUrl;
  }

  get name(): string {
    return this._name;
  }
}

export default StargazerEntity;
