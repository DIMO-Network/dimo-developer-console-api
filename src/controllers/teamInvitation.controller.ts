import { isEmail } from 'validator';

import {
  InvitationStatuses,
  TeamInvitation,
} from '@/models/teamInvitation.model';
import { findUserByEmail } from '@/services/user.service';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { validateMandatoryFields } from '@/utils/vaslidations';
import { ValidatorError } from '@/utils/error.utils';
import { CreationAttributes } from 'sequelize';
import { User } from '@/models/user.model';
import { getTeamCollaborator } from '@/services/teamCollaborator.service';

export function getTeamInvitations(
  filter: FilterObject,
  pagination: PaginationOptions
) {
  return TeamInvitation.findAllPaginated(filter, pagination);
}

export function findTeamInvitationById(id: string) {
  return TeamInvitation.findOne({ where: { id } });
}

export function findTeamInvitationByEmail(email: string) {
  return TeamInvitation.findOne({ where: { email } });
}

export const addTeamInvitation = async (
  inputTeamInvitation: CreationAttributes<TeamInvitation>
) => {
  const email = inputTeamInvitation?.email;
  const isValid =
    validateMandatoryFields(inputTeamInvitation, ['team_id', 'email']) &&
    isEmail(email);

  if (!isValid)
    throw new ValidatorError('Team invitation params are not valid');

  const hasInvitation = Boolean(await findTeamInvitationByEmail(email));
  if (hasInvitation)
    throw new ValidatorError('The email provided has an invitation already');

  const isEmailRegistered = Boolean(await findUserByEmail(email));
  if (isEmailRegistered)
    throw new ValidatorError('The email provided is an user already');

  return TeamInvitation.create(inputTeamInvitation);
};

export const invitePersonToMyTeam = async (user: User, email: string) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const team = await getTeamCollaborator(user?.id ?? '');
  return await addTeamInvitation({
    team_id: team?.team_id ?? '',
    email,
    status: InvitationStatuses.PENDING,
    expires_at: expirationDate,
  });
};

export function deleteTeamInvitationById(id: string) {
  return TeamInvitation.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
}
