class RepositoryEntity {
  constructor(
    private _stargazers_count: number,
    private _stargazers_url: string,
  ) {}

  get stargazers_count(): number {
    return this._stargazers_count;
  }

  get stargazers_url(): string {
    return this._stargazers_url;
  }
}

export default RepositoryEntity;
