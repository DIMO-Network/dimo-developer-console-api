export const generateSupportEmailTemplate = (
  userName: string,
  email: string,
  wallet: string,
  inquiryType: string,
  message: string
): string => {
  return `
    <div style="margin:0;background-color:#fff;padding:0">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff">
        <tbody>
          <tr>
            <td>
              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background-color:#fff">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="background-color:#fff;color:#343446;width:600px;margin:0 auto" width="600">
                        <tbody>
                          <tr>
                            <td width="100%"
                              style="font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:25px;width:100%">
                                      <div align="left" style="line-height:10px">
                                        <div style="max-width:550px"><img
                                            src="https://ci3.googleusercontent.com/meips/ADKq_NZv_ODjvxMdU9Fz9i5DEiNnm-zYfhOTU38WU_kOUCG9T7sRH6QMhvBjjbgTbgRBBQQjRG8NygROhSEWJ1kVpPdgshccxT0FYPNhYZitkk6Ecq-eSsYImsL6Gcb9XJ0GCqImBQ4lypPsFhjbnUOhPdR9ItgyliVYCHx_8NVBL-r4OdRNlkDlpepgjeNQnyyd=s0-d-e1-ft#https://userimg-assets.customeriomail.com/images/client-env-111720/1727727644895_Movement2_01J929FCBT49NBXW9026SY94D5.png"
                                            style="display:block;height:auto;border:0;width:100%" width="550" height="auto"
                                            class="CToWUd" data-bit="iit"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background-size:auto">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="background-size:auto;background-color:#f9f3f0;border-radius:25px;color:#000;width:600px;margin:0 auto"
                        width="600">
                        <tbody>
                          <tr>
                            <td width="100%"
                              style="font-weight:400;text-align:left;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="word-break:break-word">
                                <tbody>
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px">
                                      <div
                                        style="color:#000;direction:ltr;font-family:Georgia,Times,'Times New Roman',serif;font-size:16px;font-weight:400;letter-spacing:0;line-height:150%;text-align:left">
                                        <p style="margin:0">Hi Support Team,</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="word-break:break-word">
                                <tbody>
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px">
                                      <div
                                        style="color:#000;direction:ltr;font-family:Georgia,Times,'Times New Roman',serif;font-size:16px;font-weight:400;letter-spacing:0;line-height:150%;text-align:left">
                                        <p style="margin:0">The user ${userName} has submitted a support inquiry.</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="word-break:break-word">
                                <tbody>
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px">
                                      <div
                                        style="color:#000;direction:ltr;font-family:Georgia,Times,'Times New Roman',serif;font-size:16px;font-weight:400;letter-spacing:0;line-height:150%;text-align:left">
                                        <p style="margin:0">Email: ${email}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px">
                                      <div
                                        style="color:#000;direction:ltr;font-family:Georgia,Times,'Times New Roman',serif;font-size:16px;font-weight:400;letter-spacing:0;line-height:150%;text-align:left">
                                        <p style="margin:0">Wallet Address: ${wallet}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px">
                                      <div
                                        style="color:#000;direction:ltr;font-family:Georgia,Times,'Times New Roman',serif;font-size:16px;font-weight:400;letter-spacing:0;line-height:150%;text-align:left">
                                        <p style="margin:0">Inquiry Type: ${inquiryType}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px">
                                      <div
                                        style="color:#000;direction:ltr;font-family:Georgia,Times,'Times New Roman',serif;font-size:16px;font-weight:400;letter-spacing:0;line-height:150%;text-align:left">
                                        <p style="margin:0">Message: ${message}</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
             <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background-color:#fff">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="background-color:#fff;color:#343446;width:600px;margin:0 auto" width="600">
                        <tbody>
                          <tr>
                            <td width="100%"
                              style="font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding-bottom:15px;padding-top:55px;width:100%;padding-right:0;padding-left:0">
                                      <div align="center" style="line-height:10px">
                                        <div style="max-width:270px"><img
                                            src="https://ci3.googleusercontent.com/meips/ADKq_NamExAJLVQjv45BRk0XMwbTET-sN42YEBO_OeFfkvGR80uQUtLxAsauq9bnlQd73VutRgrbNDfj7nIk-LYncwhRsLPL61dzHgAthuPfchjlYehn3AUNp3YvykcCCwR3guPBH3_Kp3II3tfbBruXUlo-9DLFYk2L0Bh2s1PBdT8eBB1jz1w4usOdJTTyugHqdxpXwP0QusuXTNxGGtcu4QB0FNhlyyFS3xPQnsn-Bwci63K7d5UTS2hIo7fVyDonzDKIMQKK5WVNRW97958A=s0-d-e1-ft#https://userimg-assets.customeriomail.com/images/client-env-111720/1710351616843_Connect%20your%20car.%20Own%20your%20data.%20Join%20the%20conversation._01HRWED2X3MQ9P56SP5BH7ZA44.png"
                                            style="display:block;height:auto;border:0;width:100%" width="270" height="auto"
                                            class="CToWUd" data-bit="iit"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                <tbody>
                                  <tr>
                                    <td>
                                      <div align="center">
                                        <table width="207.06936026936026px" border="0" cellpadding="0" cellspacing="0"
                                          role="presentation" style="display:inline-block">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0 5px 0 5px"><a
                                                  href="https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly9jaGF0LmRpbW8uem9uZT91dG1fY2FtcGFpZ249JTVCTkVXJTVEK1NlcHRlbWJlcisyMDI0K05ld3NsZXR0ZXJcdTAwMjZ1dG1fY29udGVudD1TZXB0ZW1iZXIrTmV3c2xldHRlclx1MDAyNnV0bV9pZD1lOGU4MDYwM2JiMjJjY2UxMDVcdTAwMjZ1dG1fbWVkaXVtPWVtYWlsX2FjdGlvblx1MDAyNnV0bV9zb3VyY2U9Y3VzdG9tZXIuaW8iLCJpbnRlcm5hbCI6ImU4ZTgwNjAzYmIyMmNjZTEwNSIsImxpbmtfaWQiOjYyODd9/db0c10fc599e68c7724d0bab4c41e6286cc21cfe79aa4e3b8bc46e87b6c26bb7"
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly9jaGF0LmRpbW8uem9uZT91dG1fY2FtcGFpZ249JTVCTkVXJTVEK1NlcHRlbWJlcisyMDI0K05ld3NsZXR0ZXJcdTAwMjZ1dG1fY29udGVudD1TZXB0ZW1iZXIrTmV3c2xldHRlclx1MDAyNnV0bV9pZD1lOGU4MDYwM2JiMjJjY2UxMDVcdTAwMjZ1dG1fbWVkaXVtPWVtYWlsX2FjdGlvblx1MDAyNnV0bV9zb3VyY2U9Y3VzdG9tZXIuaW8iLCJpbnRlcm5hbCI6ImU4ZTgwNjAzYmIyMmNjZTEwNSIsImxpbmtfaWQiOjYyODd9/db0c10fc599e68c7724d0bab4c41e6286cc21cfe79aa4e3b8bc46e87b6c26bb7&amp;source=gmail&amp;ust=1727837624892000&amp;usg=AOvVaw1GOBCJDC-4YOeANrJNmgG9"><img
                                                    src="https://ci3.googleusercontent.com/meips/ADKq_NafcYey7VMvGbyJX8MmHKCkmzJ07VW2u9vhlt09bZ432Zr0LstXfrWuPruir7eHwumovqyjoF9ARWJRmy97G3Ye6Z4F3ZJdu_SKQe1a3hotX1Y9PdfRmWY-3zdGSzZcTudEyXjfjbTQMBJ_Ids2glVs8gFssRZHnmuQvJ0WjTSRID7gVQpVcr02cDq54WLJIkbiabxy7es=s0-d-e1-ft#https://userimg-assets.customeriomail.com/images/client-env-111720/1710337301025_Artboard%2012@4x_01HRW0R6KWM7S1AVWFSTT2Q54P.png"
                                                    width="30.814814814814813" height="auto" alt="DIMO DAO Server"
                                                    title="DIMO Discord" style="display:block;height:auto;border:0"
                                                    class="CToWUd" data-bit="iit"></a></td>
                                              <td style="padding:0 5px 0 5px"><a
                                                  href="https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly90d2l0dGVyLmNvbS9ESU1PX05ldHdvcms_dXRtX2NhbXBhaWduPSU1Qk5FVyU1RCtTZXB0ZW1iZXIrMjAyNCtOZXdzbGV0dGVyXHUwMDI2dXRtX2NvbnRlbnQ9U2VwdGVtYmVyK05ld3NsZXR0ZXJcdTAwMjZ1dG1faWQ9ZThlODA2MDNiYjIyY2NlMTA1XHUwMDI2dXRtX21lZGl1bT1lbWFpbF9hY3Rpb25cdTAwMjZ1dG1fc291cmNlPWN1c3RvbWVyLmlvIiwiaW50ZXJuYWwiOiJlOGU4MDYwM2JiMjJjY2UxMDUiLCJsaW5rX2lkIjoxfQ/f485cac7ee6ff3c86bc409c2f7b1c18616bbf4e5757c1ae13ff2ec7942dab859"
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly90d2l0dGVyLmNvbS9ESU1PX05ldHdvcms_dXRtX2NhbXBhaWduPSU1Qk5FVyU1RCtTZXB0ZW1iZXIrMjAyNCtOZXdzbGV0dGVyXHUwMDI2dXRtX2NvbnRlbnQ9U2VwdGVtYmVyK05ld3NsZXR0ZXJcdTAwMjZ1dG1faWQ9ZThlODA2MDNiYjIyY2NlMTA1XHUwMDI2dXRtX21lZGl1bT1lbWFpbF9hY3Rpb25cdTAwMjZ1dG1fc291cmNlPWN1c3RvbWVyLmlvIiwiaW50ZXJuYWwiOiJlOGU4MDYwM2JiMjJjY2UxMDUiLCJsaW5rX2lkIjoxfQ/f485cac7ee6ff3c86bc409c2f7b1c18616bbf4e5757c1ae13ff2ec7942dab859&amp;source=gmail&amp;ust=1727837624892000&amp;usg=AOvVaw1Rv7yp5atw8jRiQJlr7Ah5"><img
                                                    src="https://ci3.googleusercontent.com/meips/ADKq_NavQA2eACo3FR7x3QWX5gX9rmTJq2n2Ub6fk7NbiHr9-1nfNgDu4GFf_aXFc5g5jM66fjzqp9wBGEWpIAW0TyLbclsyq2Hc5VMxttfEWvr_QxssE7K5L0a4OjZg_tpdqVfnzCf-rh6HQeAH10CuHnVatCGV58uXKSxFfL-lCn19hkzrrzQ9eLT6lmsf-CIDdkJu2E-O8Xk3UAinbIVp=s0-d-e1-ft#https://userimg-assets.customeriomail.com/images/client-env-111720/1710337300754_Artboard%2012%20copy@4x_01HRW0R6BHKYBVM7H6XVY59RB0.png"
                                                    width="30.254545454545454" height="auto" alt="Twitter" title="Twitter"
                                                    style="display:block;height:auto;border:0" class="CToWUd"
                                                    data-bit="iit"></a></td>
                                              <td style="padding:0 5px 0 5px"><a
                                                  href="https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vQGRpbW9fbmV0d29yaz91dG1fY2FtcGFpZ249JTVCTkVXJTVEK1NlcHRlbWJlcisyMDI0K05ld3NsZXR0ZXJcdTAwMjZ1dG1fY29udGVudD1TZXB0ZW1iZXIrTmV3c2xldHRlclx1MDAyNnV0bV9pZD1lOGU4MDYwM2JiMjJjY2UxMDVcdTAwMjZ1dG1fbWVkaXVtPWVtYWlsX2FjdGlvblx1MDAyNnV0bV9zb3VyY2U9Y3VzdG9tZXIuaW8iLCJpbnRlcm5hbCI6ImU4ZTgwNjAzYmIyMmNjZTEwNSIsImxpbmtfaWQiOjQ0ODZ9/6a3600ff6e3f9c29955cc7e16ef2db666b816d8203f11f912c5c09890441e8a9"
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vQGRpbW9fbmV0d29yaz91dG1fY2FtcGFpZ249JTVCTkVXJTVEK1NlcHRlbWJlcisyMDI0K05ld3NsZXR0ZXJcdTAwMjZ1dG1fY29udGVudD1TZXB0ZW1iZXIrTmV3c2xldHRlclx1MDAyNnV0bV9pZD1lOGU4MDYwM2JiMjJjY2UxMDVcdTAwMjZ1dG1fbWVkaXVtPWVtYWlsX2FjdGlvblx1MDAyNnV0bV9zb3VyY2U9Y3VzdG9tZXIuaW8iLCJpbnRlcm5hbCI6ImU4ZTgwNjAzYmIyMmNjZTEwNSIsImxpbmtfaWQiOjQ0ODZ9/6a3600ff6e3f9c29955cc7e16ef2db666b816d8203f11f912c5c09890441e8a9&amp;source=gmail&amp;ust=1727837624892000&amp;usg=AOvVaw0C2I0nMZiwHqA6-671spNs"><img
                                                    src="https://ci3.googleusercontent.com/meips/ADKq_NaOqfj41vElgbThECi39UcmjnIiYeuXYsBxeWLZSQqZPMctGDF9IqBmDX0MNSPzxKO3uwFI2RQfj8gjJlL6QmEQLfUUK_7pMBxm_kbnVNmk7y2Isx6LNCyNikBlRcRcoJUby-9_QHwEnfwGwJ-oPmqfkXmrb4be=s0-d-e1-ft#https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-black/youtube@2x.png"
                                                    width="32" height="auto" alt="YouTube" title="YouTube"
                                                    style="display:block;height:auto;border:0" class="CToWUd"
                                                    data-bit="iit"></a></td>
                                              <td style="padding:0 5px 0 5px"><a
                                                  href="https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9kaW1vX25ldHdvcmsvP3V0bV9jYW1wYWlnbj0lNUJORVclNUQrU2VwdGVtYmVyKzIwMjQrTmV3c2xldHRlclx1MDAyNnV0bV9jb250ZW50PVNlcHRlbWJlcitOZXdzbGV0dGVyXHUwMDI2dXRtX2lkPWU4ZTgwNjAzYmIyMmNjZTEwNVx1MDAyNnV0bV9tZWRpdW09ZW1haWxfYWN0aW9uXHUwMDI2dXRtX3NvdXJjZT1jdXN0b21lci5pbyIsImludGVybmFsIjoiZThlODA2MDNiYjIyY2NlMTA1IiwibGlua19pZCI6NDQ4NX0/7baa0e086ecb24f60cd79862c26b4444266e6f416edbdaab1fac83c7ad532380"
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9kaW1vX25ldHdvcmsvP3V0bV9jYW1wYWlnbj0lNUJORVclNUQrU2VwdGVtYmVyKzIwMjQrTmV3c2xldHRlclx1MDAyNnV0bV9jb250ZW50PVNlcHRlbWJlcitOZXdzbGV0dGVyXHUwMDI2dXRtX2lkPWU4ZTgwNjAzYmIyMmNjZTEwNVx1MDAyNnV0bV9tZWRpdW09ZW1haWxfYWN0aW9uXHUwMDI2dXRtX3NvdXJjZT1jdXN0b21lci5pbyIsImludGVybmFsIjoiZThlODA2MDNiYjIyY2NlMTA1IiwibGlua19pZCI6NDQ4NX0/7baa0e086ecb24f60cd79862c26b4444266e6f416edbdaab1fac83c7ad532380&amp;source=gmail&amp;ust=1727837624892000&amp;usg=AOvVaw3BpXeWFfUqTCPWDbo8EVkM"><img
                                                    src="https://ci3.googleusercontent.com/meips/ADKq_Nb-Zej-1VjTeXKce5eye3mdtdpJL3tXvhp2N5HxEzFwy7QsEqCmOYY8zUbaGI8irfVIKjOS25s2VLAGnyIf6Y_bO45gAuhSNldmL3cz3dxMYAYn2LFojce8PNj8sGtE8BeL5qVfqVy5xT45-4vlwTsMXr8auVXMjA4=s0-d-e1-ft#https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-black/instagram@2x.png"
                                                    width="32" height="auto" alt="Instagram" title="Instagram"
                                                    style="display:block;height:auto;border:0" class="CToWUd"
                                                    data-bit="iit"></a></td>
                                              <td style="padding:0 5px 0 5px">
                                                <a href="https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly93d3cudGlrdG9rLmNvbS9AZGltb19uZXR3b3JrP3V0bV9jYW1wYWlnbj0lNUJORVclNUQrU2VwdGVtYmVyKzIwMjQrTmV3c2xldHRlclx1MDAyNnV0bV9jb250ZW50PVNlcHRlbWJlcitOZXdzbGV0dGVyXHUwMDI2dXRtX2lkPWU4ZTgwNjAzYmIyMmNjZTEwNVx1MDAyNnV0bV9tZWRpdW09ZW1haWxfYWN0aW9uXHUwMDI2dXRtX3NvdXJjZT1jdXN0b21lci5pbyIsImludGVybmFsIjoiZThlODA2MDNiYjIyY2NlMTA1IiwibGlua19pZCI6NDQ4OH0/9c6a411785c59b89d70883201b211cf0dd091bb1b52fe3fe9f8c75fd6a24f8eb"
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://community.dimo.zone/e/c/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0iLCJocmVmIjoiaHR0cHM6Ly93d3cudGlrdG9rLmNvbS9AZGltb19uZXR3b3JrP3V0bV9jYW1wYWlnbj0lNUJORVclNUQrU2VwdGVtYmVyKzIwMjQrTmV3c2xldHRlclx1MDAyNnV0bV9jb250ZW50PVNlcHRlbWJlcitOZXdzbGV0dGVyXHUwMDI2dXRtX2lkPWU4ZTgwNjAzYmIyMmNjZTEwNVx1MDAyNnV0bV9tZWRpdW09ZW1haWxfYWN0aW9uXHUwMDI2dXRtX3NvdXJjZT1jdXN0b21lci5pbyIsImludGVybmFsIjoiZThlODA2MDNiYjIyY2NlMTA1IiwibGlua19pZCI6NDQ4OH0/9c6a411785c59b89d70883201b211cf0dd091bb1b52fe3fe9f8c75fd6a24f8eb&amp;source=gmail&amp;ust=1727837624892000&amp;usg=AOvVaw1AXrn22Y4K5W3ItOqahkhg"><img
                                                    src="https://ci3.googleusercontent.com/meips/ADKq_NawYt9XH_9iUZ2hb-1lUlHQzBuj3XU9h1qrL-Nv77rnhopwxhktn_G76STjy9D_fq_QIhkYAtNXLuXEc_r4tbFdyJwevudLgik4o8Jac0WL7nPbKhsdoEN8ZkpAxHnhrVMXP7eb7ECCOapX1tss5fMRYb2vm84=s0-d-e1-ft#https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-black/tiktok@2x.png"
                                                    width="32" height="auto" alt="TikTok" title="TikTok"
                                                    style="display:block;height:auto;border:0" class="CToWUd"
                                                    data-bit="iit"></a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="word-break:break-word">
                                <tbody>
                                  <tr>
                                    <td style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px">
                                      <div style="font-family:sans-serif">
                                        <div
                                          style="font-size:12px;font-family:Lato,Tahoma,Verdana,Segoe,sans-serif;color:#939393;line-height:1.2">
                                          <p style="margin:0;font-size:12px;text-align:center">
                                            <span style="word-break:break-word;font-size:12px">©<code>2024</code>&nbsp;
                                              Digital Infrastructure Inc.<br>1041 N Dupont Hwy #1244 Dover, DE
                                              19901<br></span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="word-break:break-word">
                                <tbody>
                                  <tr>
                                    <td style="padding-bottom:35px;padding-left:5px;padding-right:5px;padding-top:5px">
                                      <div style="font-family:sans-serif">
                                        <div
                                          style="font-size:12px;font-family:Lato,Tahoma,Verdana,Segoe,sans-serif;color:#939393;line-height:1.2">
                                          <p style="margin:0;font-size:12px;text-align:center"><span
                                              style="word-break:break-word;font-size:12px"><strong><a
                                                  href="https://community.dimo.zone/unsubscribe/dgTo6AYDAMzhBcvhBQGSRKyoyifQINu0_SszmqI="
                                                  style="text-decoration:underline;color:#939393" rel="noopener"
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://community.dimo.zone/unsubscribe/dgTo6AYDAMzhBcvhBQGSRKyoyifQINu0_SszmqI%3D&amp;source=gmail&amp;ust=1727837624892000&amp;usg=AOvVaw2SGTwl9pe2nPqLWtUs6m1b">Unsubscribe</a></strong></span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><img
        src="https://ci3.googleusercontent.com/meips/ADKq_NZ7UVUezl_F4ZhOYfuPaOQl0O_bhYQXLbK4vichCtimuEFZtgHxnenXcZeFMbbzLjQgK2u_9w8VW91rfVogB8zZnJw-2r76xBZuUAw1fhQ-FCJG0d9cBXQtHWyhd2w3ZDpdxkjSPxfD3JcpcU_hfJpR3d-exEOi5bR0x-Ot5ZET5II=s0-d-e1-ft#https://community.dimo.zone/e/o/eyJlbWFpbF9pZCI6ImRnVG82QVlEQU16aEJjdmhCUUdTUkt5b3lpZlFJTnUwX1Nzem1xST0ifQ=="
        style="height:1px!important;max-height:1px!important;max-width:1px!important;width:1px!important;display:none!important"
        alt="" class="CToWUd" data-bit="iit">
    </div>
  `;
};
