import _ from 'lodash';
import axios from 'axios';

const zapierRestClient = axios.create({
  baseURL: 'https://hooks.zapier.com/',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fleetGeneration = (userData: any) => {
  const { ZAPIER_LEAD_WEBHOOK_PATH: zapierPath = '' } = process.env;
  if (_.isEmpty(userData) || _.isEmpty(zapierPath)) {
    console.log(`Skipping Lead generation for user ${userData.id}`, {
      user: userData,
    });
    return null;
  }

  // eslint-disable-next-line no-console
  console.log(`Creating Lead for user ${userData.id}`, { user: userData });
  return zapierRestClient
    .post(zapierPath, userData)
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
