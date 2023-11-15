import {beforeEach, it} from '@jest/globals';
import {render} from '@testing-library/react-native';
import HomepageStargazers from './stargazersList.homepage';
import AppMock from '../../../../../../__mocks__/app';
import React, {PropsWithChildren} from 'react';
import RepositoryRepositoryMock from '../../../../../../__mocks__/repository.repository';
import StargazerEntity from '../../../../../domain/entities/stargazer.entity';

let repositoryMock: RepositoryRepositoryMock;
let appMock: AppMock;
let wrapper: React.ComponentType<PropsWithChildren>;

beforeEach(() => {
  appMock = new AppMock();
  repositoryMock = new RepositoryRepositoryMock();
  appMock.repositoriesValue.repository = repositoryMock;
  wrapper = appMock.render.bind(appMock);
});

it('should render a list with a footer displaying a counter', () => {
  const {getByText} = render(<HomepageStargazers url={''} size={0} />, {
    wrapper,
  });

  getByText('No stargazers found');
  getByText('0 / 0');
});

it('should render "avatar" when fetch is done and data is set', async () => {
  const stargazerEntityMock = new StargazerEntity(
    1,
    'avatar_url',
    'avatar',
    'homepage_url',
  );
  repositoryMock.setGetRepositoryStargazersResponse([stargazerEntityMock]);

  const {findByText} = render(<HomepageStargazers url={'fakeURL'} size={0} />, {
    wrapper,
  });

  await findByText(stargazerEntityMock.name);
});

it('should render api error when fetch is done but unsuccessful', async () => {
  repositoryMock.setShouldThrow(true);

  const {findByText} = render(<HomepageStargazers url={'fakeURL'} size={0} />, {
    wrapper,
  });

  await findByText('Stargazers not found. Something went wrong.');
});

it("should render 'No stargazers found' when fetch is done but there are no stargazers", async () => {
  repositoryMock.setGetRepositoryStargazersResponse([]);

  const {findByText} = render(<HomepageStargazers url={'fakeURL'} size={0} />, {
    wrapper,
  });

  await findByText('No stargazers found');
});
