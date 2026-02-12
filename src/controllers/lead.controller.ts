import mailer from '@/utils/mailer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendLeadEmail = async (userData: any) => {
  const { ODOO_LEAD_EMAIL: odooEmail = '' } = process.env;

  if (!userData || !odooEmail) {
    console.log(`Skipping lead email for user ${userData?.id}`);
    return null;
  }

  const company = userData.company ?? {};
  const name = userData.name || 'Unknown';
  const email = userData.email || 'N/A';
  const companyName = company.name || 'N/A';
  const companyWebsite = company.website || 'N/A';
  const companyType = company.type || 'N/A';
  const region = company.region || 'N/A';
  const buildFor = company.build_for || 'N/A';
  const buildForText = company.build_for_text || '';

  const subject = `New Developer Sign-Up: ${name} - ${companyName}`;
  const html = `
    <h2>New Developer Console Sign-Up</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${companyName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Website</td><td style="padding:8px;">${companyWebsite}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Type</td><td style="padding:8px;">${companyType}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Region</td><td style="padding:8px;">${region}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Building</td><td style="padding:8px;">${buildFor}${buildForText ? ` - ${buildForText}` : ''}</td></tr>
    </table>
  `;

  try {
    await mailer.sendMail({ to: odooEmail, subject, html });
    console.log(`Lead email sent for user ${userData.id}`);
  } catch (err) {
    console.error('Error sending lead email', err);
  }
};
