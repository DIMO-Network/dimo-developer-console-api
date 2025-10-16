import { Configuration } from '@/models/configuration.model';

export const getConfiguration = ({ configuration_id }: { configuration_id: string }) => {
  return Configuration.findOne({ where: { id: configuration_id } });
};

export const checkConfigurationByClientId = ({ client_id }: { client_id: string }) => {
  return Configuration.findOne({ where: { client_id: client_id } });
};

export const saveConfiguration = ({
  client_id,
  owner_id,
  configuration_name,
  configuration,
}: {
  configuration: Record<string, unknown>;
  configuration_name: string;
  owner_id: string;
  client_id: string;
}): Promise<Configuration> => {
  return Configuration.create({
    configuration: configuration,
    owner_id: owner_id,
    client_id: client_id,
    configuration_name: configuration_name,
  });
};

export const updateConfiguration = async ({
  configuration_id,
  configuration_name,
  configuration,
}: {
  configuration_id: string;
  configuration: Record<string, unknown>;
  configuration_name: string;
}): Promise<void> => {
  await Configuration.update(
    {
      configuration_name: configuration_name,
      configuration: configuration,
    },
    { where: { id: configuration_id } },
  );
};
