import { Attributes } from 'sequelize';
import isEmail from 'validator/lib/isEmail';

import { FilterObject } from '@/utils/filter';
import {
  findTeamCollaboratorByUserId,
  markAsAccepted,
} from '@/services/teamCollaborator.service';
import { PaginationOptions } from '@/utils/paginateData';
import {
  InvitationStatuses,
  TeamCollaborator,
  TeamRoles,
} from '@/models/teamCollaborator.model';
import { User } from '@/models/user.model';
import { ValidatorError } from '@/utils/error.utils';
import { validateMandatoryFields } from '@/utils/vaslidations';
import { findUserByEmail } from '@/services/user.service';
import { generateTeamInvitationTemplate } from '@/templates/team';

import config from '@/config';
import Mailer from '@/utils/mailer';

export async function getTeamCollaborators(
  filter: FilterObject,
  pagination: PaginationOptions,
) {
  return TeamCollaborator.findAllPaginated(filter, pagination);
}

export async function getMyTeamCollaborators(
  teamId: string,
  filter: FilterObject,
  pagination: PaginationOptions,
) {
  return getTeamCollaborators(
    {
      ...filter,
      team_id: teamId,
    },
    pagination,
  );
}

export async function findTeamCollaboratorById(id: string) {
  return TeamCollaborator.findOne({ where: { id } });
}

export async function updateTeamCollaboratorById(
  id: string,
  teamCollaboratorData: Attributes<TeamCollaborator>,
) {
  return TeamCollaborator.update(teamCollaboratorData, { where: { id } });
}

export const deleteTeamCollaboratorById = async (id: string) => {
  return TeamCollaborator.update(
    { deleted: true, deleted_at: new Date() },
    { where: { id } },
  );
};

export const removeMyCollaboratorById = async ({ id: userId }: User, id: string) => {
  const { role: currentUserRole } =
    (await findTeamCollaboratorByUserId(userId ?? '')) ?? {};

  if (currentUserRole !== TeamRoles.OWNER)
    throw new ValidatorError('Do not have enough permissions to remove a collaborator');

  const { user_id: collaboratorId } = (await findTeamCollaboratorById(id ?? '')) ?? {};
  const { totalItems: totalOwners } = await getTeamCollaborators(
    { role: TeamRoles.OWNER, deleted: 'false' },
    { page: 1, pageSize: 10 },
  );
  if (totalOwners === 1 && userId === collaboratorId)
    throw new ValidatorError('Cannot remove the only administrator from the group.');

  return deleteTeamCollaboratorById(id);
};

export const findMyTeam = async (userId: string) => {
  return TeamCollaborator.findOne({ where: { user_id: userId } });
};

export const findTeamInvitationByEmail = (email: string) => {
  return TeamCollaborator.findOne({ where: { email } });
};

export const addTeamCollaborator = async (
  inputTeamCollaborator: Attributes<TeamCollaborator>,
) => {
  const email = inputTeamCollaborator?.email;
  const isValid =
    validateMandatoryFields(inputTeamCollaborator, ['team_id', 'email', 'status']) &&
    isEmail(email ?? '');

  if (!isValid) throw new ValidatorError('Team invitation params are not valid');

  const hasInvitation = Boolean(await findTeamInvitationByEmail(email ?? ''));
  const isEmailRegistered = Boolean(await findUserByEmail(email ?? ''));
  if (hasInvitation || isEmailRegistered)
    throw new ValidatorError('The email provided has an invitation already');

  return TeamCollaborator.create(inputTeamCollaborator);
};

export const getCollaboratorTeam = async (id: string) => {
  return TeamCollaborator.findOne({ where: { user_id: id } });
};

export const invitePersonToMyTeam = async (
  user: User,
  companyName: string,
  email: string,
  role: string,
): Promise<TeamCollaborator> => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const team = await getCollaboratorTeam(user?.id ?? '');
  const invitation = await addTeamCollaborator({
    team_id: team?.team_id ?? '',
    email,
    role,
    status: InvitationStatuses.PENDING,
  });
  const code = Buffer.from(invitation?.id ?? '').toString('base64');

  const template = generateTeamInvitationTemplate(
    user.name.split(' ')[0],
    `${config.frontendUrl}sign-in?code=${code}`,
  );
  await Mailer.sendMail({
    to: email,
    subject: 'Join Our Team and Build Innovative Apps Together!',
    html: template,
  });

  return invitation;
};

export const acceptTeamInvitation = async (
  user: User,
  isNew: boolean,
  invitationCode: string | null,
): Promise<void> => {
  if (!isNew) return;
  if (Object.is(invitationCode, null)) return;

  const invitationId = Buffer.from(invitationCode!, 'base64').toString('ascii');
  const teamInvitation = await findTeamCollaboratorById(invitationId);

  if (teamInvitation?.status === InvitationStatuses.PENDING)
    await markAsAccepted(teamInvitation?.id as string, user);
};
