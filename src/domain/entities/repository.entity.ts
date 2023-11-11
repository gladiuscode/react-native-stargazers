class RepositoryEntity {
  constructor(private _stargazers_url: string) {}

  get stargazers_url(): string {
    return this._stargazers_url;
  }
}

export default RepositoryEntity;
