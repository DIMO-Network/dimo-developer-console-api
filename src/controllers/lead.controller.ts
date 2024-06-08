import _ from 'lodash';
import axios from 'axios';

const zapierRestClient = axios.create({
  baseURL: 'https://hooks.zapier.com/',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fleetGeneration = (userData: any) => {
  if (_.isEmpty(userData)) return null;

  console.log(`Creating Lead for user ${userData.id}`, { user: userData });
  return zapierRestClient
    .post('hooks/catch/18609896/37bp6qs/', userData)
    .then(({ data }) =>
      console.log(`Lead information sent for user ${userData.id}`, {
        user: userData,
        response: data,
      })
    );
};
