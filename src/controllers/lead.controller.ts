import _ from 'lodash';
import axios from 'axios';

const zapierRestClient = axios.create({
  baseURL: 'https://hooks.zapier.com/',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fleetGeneration = (userData: any) => {
  if (_.isEmpty(userData)) return null;

  // eslint-disable-next-line no-console
  console.log(`Creating Lead for user ${userData.id}`, { user: userData });
  return zapierRestClient
    .post('hooks/catch/18609896/37bp6qs/', userData)
    .then(({ data }) =>
      // eslint-disable-next-line no-console
      console.log(`Lead information sent for user ${userData.id}`, {
        user: userData,
        response: data,
      })
    )
    .catch((err) =>
      // eslint-disable-next-line no-console
      console.error('Something went wrong while creating the lead', err)
    );
};
