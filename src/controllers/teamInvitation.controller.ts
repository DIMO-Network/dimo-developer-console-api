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
import { Attributes } from 'sequelize';
import { User } from '@/models/user.model';
import {
  addTeamCollaborator,
  getTeamCollaborator,
} from '@/services/teamCollaborator.service';
import {
  isActiveInvitation,
  markAsAccepted,
} from '@/services/teamInvitation.service';

export const getTeamInvitations = (
  filter: FilterObject,
  pagination: PaginationOptions
) => {
  return TeamInvitation.findAllPaginated(filter, pagination);
};

export const findTeamInvitationById = (id: string) => {
  return TeamInvitation.findOne({ where: { id } });
};

export const findTeamInvitationByEmail = (email: string) => {
  return TeamInvitation.findOne({ where: { email } });
};

export const addTeamInvitation = async (
  inputTeamInvitation: Attributes<TeamInvitation>
) => {
  const email = inputTeamInvitation?.email;
  const isValid =
    validateMandatoryFields(inputTeamInvitation, ['team_id', 'email']) &&
    isEmail(email);

  if (!isValid)
    throw new ValidatorError('Team invitation params are not valid');

  const hasInvitation = Boolean(await findTeamInvitationByEmail(email));
  const isEmailRegistered = Boolean(await findUserByEmail(email));
  if (hasInvitation || isEmailRegistered)
    throw new ValidatorError('The email provided has an invitation already');

  return TeamInvitation.create(inputTeamInvitation);
};

export const invitePersonToMyTeam = async (
  user: User,
  email: string,
  role: string
) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const team = await getTeamCollaborator(user?.id ?? '');
  return await addTeamInvitation({
    team_id: team?.team_id ?? '',
    email,
    role,
    status: InvitationStatuses.PENDING,
    expires_at: expirationDate,
  });
};

export const deleteTeamInvitationById = (id: string) => {
  return TeamInvitation.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
};

export const acceptTeamInvitation = async (user: User, isNew: boolean) => {
  if (!isNew) return null;

  const teamInvitation = await checkTeamInvitation(user);

  const teamCollaboratorData = {
    team_id: teamInvitation?.team_id as string,
    user_id: user.id as string,
    role: teamInvitation?.role as string,
  };

  await addTeamCollaborator(teamCollaboratorData);
  await markAsAccepted(teamInvitation?.id as string);
};

export const checkTeamInvitation = async (user: User) => {
  const teamInvitation = await findTeamInvitationByEmail(user?.email);
  isActiveInvitation(teamInvitation);

  return teamInvitation;
};
