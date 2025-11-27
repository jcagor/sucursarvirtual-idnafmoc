// Tech Cert Analyst Reject
export const techRegisterRejectNotificationMailBody = (
  appointment_date: string,
  revision_date: string,
  business_name: string,
  observations: string,
) => {
  return `<html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Email Postulación</title>
          <style media="all" type="text/css">
          /* -------------------------------------
          GLOBAL RESETS
          ------------------------------------- */
      
            body {
              font-family: Helvetica, sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 16px;
              line-height: 1.3;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
            }
      
            table td {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              vertical-align: top;
            }
          /* -------------------------------------
          BODY & CONTAINER
          ------------------------------------- */
      
            body {
              background-color: #f4f5f6;
              margin: 0;
              padding: 0;
            }
      
            .body {
              background-color: #f4f5f6;
              width: 100%;
            }
      
            .container {
              margin: 0 auto !important;
              max-width: 600px;
              padding: 0;
              padding-top: 24px;
              width: 600px;
            }
      
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 600px;
              padding: 0;
            }
          /* -------------------------------------
          HEADER, FOOTER, MAIN
          ------------------------------------- */
      
            .main {
              background: #ffffff;
              border: 1px solid #eaebed;
              border-radius: 16px;
              width: 100%;
            }
      
            .wrapper {
              box-sizing: border-box;
              padding: 24px;
            }
      
            .footer {
              clear: both;
              padding-top: 24px;
              text-align: center;
              width: 100%;
            }
      
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #9a9ea6;
              font-size: 16px;
              text-align: center;
            }
          /* -------------------------------------
          TYPOGRAPHY
          ------------------------------------- */
      
            p {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 16px;
            }
      
            a {
              color: #0867ec;
              text-decoration: underline;
            }
          /* -------------------------------------
          BUTTONS
          ------------------------------------- */
      
            .btn {
              box-sizing: border-box;
              min-width: 100% !important;
              width: 100%;
            }
      
            .btn > tbody > tr > td {
              padding-bottom: 16px;
            }
      
            .btn table {
              width: auto;
            }
      
            .btn table td {
              background-color: #ffffff;
              border-radius: 4px;
              text-align: center;
            }
      
            .btn a {
              background-color: #ffffff;
              border: solid 2px #0867ec;
              border-radius: 4px;
              box-sizing: border-box;
              color: #0867ec;
              cursor: pointer;
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              margin: 0;
              padding: 12px 24px;
              text-decoration: none;
              text-transform: capitalize;
            }
      
            .btn-primary table td {
              background-color: #0867ec;
            }
      
            .btn-primary a {
              background-color: #0867ec;
              border-color: #0867ec;
              color: #ffffff;
            }
      
            @media all {
              .btn-primary table td:hover {
                background-color: #ec0867 !important;
              }
              .btn-primary a:hover {
                background-color: #ec0867 !important;
                border-color: #ec0867 !important;
              }
            }
      
          /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
      
            .last {
              margin-bottom: 0;
            }
      
            .first {
              margin-top: 0;
            }
      
            .align-center {
              text-align: center;
            }
      
            .align-right {
              text-align: right;
            }
      
            .align-left {
              text-align: left;
            }
      
            .text-link {
              color: #0867ec !important;
              text-decoration: underline !important;
            }
      
            .clear {
              clear: both;
            }
      
            .mt0 {
              margin-top: 0;
            }
      
            .mb0 {
              margin-bottom: 0;
            }
      
            .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
            }
      
            .powered-by a {
              text-decoration: none;
            }
      
          /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
      
            @media only screen and (max-width: 640px) {
              .main p,
              .main td,
              .main span {
                font-size: 16px !important;
              }
              .wrapper {
                padding: 8px !important;
              }
              .content {
                padding: 0 !important;
              }
              .container {
                padding: 0 !important;
                padding-top: 8px !important;
                width: 100% !important;
              }
              .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
              .btn table {
                max-width: 100% !important;
                width: 100% !important;
              }
              .btn a {
                font-size: 16px !important;
                max-width: 100% !important;
                width: 100% !important;
              }
            }
          /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
      
            @media all {
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%;
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
            }
          </style>
        </head>
        <body>
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="body"
          >
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="content">
                  <!-- START CENTERED WHITE CONTAINER -->
                  <span class="preheader">Email de postulación.</span>
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="main"
                  >
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper">                                                

                        <p>
                          Te informamos que el acta de asistencia creada el ${revision_date} para
                          la cita con la empresa ${business_name} ha sido rechazada.
                        </p>      

                        <p>Se registraron las siguientes observaciones: ${observations}</p>
                        
                        <p>La cita fue llevada a cabo el ${appointment_date}</p>

                        <p>Verifica la información</p>
      
                        <p>
                          Atentamente,<br />
                          Comfandi
                        </p>
                      </td>
                    </tr>
      
                    <!-- END MAIN CONTENT AREA -->
                  </table>
      
                  <!-- START FOOTER -->
                  <div class="footer">
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td>
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABHCAYAAADlY75oAAAAxnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVBbEsMgCPznFD2CCCocxzw60xv0+EUhnSSTnXFFVlcA9u/nDa+BjAxcmlStNRlYWXO3QJKjT8bEkye0hobXPHALIVuKbCc/SjzAI49/A9+6ReVkJGsIy1VQDn+5GcVHNCrKFmxhpGFE2QUMg+5tparSzi0se7pCfMGguqbZCIb7/czNprcV+4dy3gkpGROJF0BjFaBuARkjWVHGdWbU2K+iD+RpTgfgB2DHWfyLIwS1AAABg2lDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TpSItDlYQEcxQneyiIo6likWwUNoKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxF5wUXaTE/yWFFjEeHPfj3b3H3TtAaFaZavbEAFWzjHQiLubyq2LgFX6EMAQBYxIz9WRmMQvP8XUPH1/vojzL+9yfI6QUTAb4ROIY0w2LeIN4dtPSOe8Th1lZUojPiScNuiDxI9dll984lxwWeGbYyKbnicPEYqmL5S5mZUMlniGOKKpG+ULOZYXzFme1Wmfte/IXBgvaSobrNEeRwBKSSEGEjDoqqMJClFaNFBNp2o97+Eccf4pcMrkqYORYQA0qJMcP/ge/uzWL01NuUjAO9L7Y9sc4ENgFWg3b/j627dYJ4H8GrrSOv9YE5j5Jb3S0yBEwsA1cXHc0eQ+43AGGn3TJkBzJT1MoFoH3M/qmPDB4C/Svub2193H6AGSpq+Ub4OAQmChR9rrHu/u6e/v3TLu/H28vcqU1Bmx1AAANdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDowOWZhMzYyNy05YjVlLTQ2NTEtOTE0ZC1mMWZhZGU0MjA3ZGIiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZTQwNjgwMDctODViNi00ODVjLWFlNTgtMzUyMTEyNWI2MzFkIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ODlhZGVkYTQtMzk5ZC00NGQxLThhMDMtYjI5MDA3YzM2ZTdjIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDE5MDAxODM0NjU4NzUiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDM6MTNUMTY6MDk6MzgtMDU6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAzOjEzVDE2OjA5OjM4LTA1OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2Y0ODFmNTEtYTc5Ny00MDViLWFiMzktNjg1Mzc0M2VjNzczIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAzLTEzVDE2OjA5OjQzIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PqNXw3cAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfpAw0VCSsvxmF1AAAS/klEQVR42u2ceXCc5X3HP8/7vnuvrtWubmmty5JtJF+y5QPMERLMFTAhQA5gONJpjkmTtNPONJ1p2knbpOlkJlOmnQCBQEhrwEAIBGPMYQw2xICxLR+SbVm3Vre09/0+/WPltYRtDEZQAe/nv5V2332e3/t9ftfz7Cu4/gGJgcEH5KoKO7dcWn3gtq+0Ln2/9wk2PWgIy+BDUagKLvc6ueGS6vtvvnbltwxhGcwp1RaF29eW8pO/+pJ47/8UwzwG50tXXOenrw7wvX9+RhrCMphTUhLueXeMH/zLs9IQlsGcc9/eMf7jvlekISyDOSWsSx7Z2c8LOw8XG8IymFP2BVP86bUTQ4awDOYWAS8dmTRCocHcczCc4t/vfUUawjKYcx55rd/wWAZzz4FQyhCWwceDISwDQ1gGhrAMDGEZGBjCMjCEZWAIy8DAEJaBISwDQ1gG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"
                            alt=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block">
                          <span class="apple-link">Comfandi 2025</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->
                  <!-- END CENTERED WHITE CONTAINER -->
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>`;
};

export const techRegisterRejectNotificationTextMailBody = (
  appointment_date: string,
  revision_date: string,
  business_name: string,
  observations: string,
) => {
  return `
¡Te informamos que el acta de asistencia creada el ${revision_date} para\r\n
la cita con la empresa ${business_name} ha sido rechazada\r\n
.\r\n

Se registraron las siguientes observaciones: ${observations}\r\n\r\n

La cita fue llevada a cabo el ${appointment_date}\r\n\r\n

Verifica la información\r\n\r\n

Atentamente,\r\n 
Comfandi.`;
};

// Consultor Hours Completed
export const businessCompletedHourNotificationTextMailBody = (
  business_name: string,
  business_nit: string,
) => {
  return `<html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Email Postulación</title>
          <style media="all" type="text/css">
          /* -------------------------------------
          GLOBAL RESETS
          ------------------------------------- */
      
            body {
              font-family: Helvetica, sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 16px;
              line-height: 1.3;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
            }
      
            table td {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              vertical-align: top;
            }
          /* -------------------------------------
          BODY & CONTAINER
          ------------------------------------- */
      
            body {
              background-color: #f4f5f6;
              margin: 0;
              padding: 0;
            }
      
            .body {
              background-color: #f4f5f6;
              width: 100%;
            }
      
            .container {
              margin: 0 auto !important;
              max-width: 600px;
              padding: 0;
              padding-top: 24px;
              width: 600px;
            }
      
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 600px;
              padding: 0;
            }
          /* -------------------------------------
          HEADER, FOOTER, MAIN
          ------------------------------------- */
      
            .main {
              background: #ffffff;
              border: 1px solid #eaebed;
              border-radius: 16px;
              width: 100%;
            }
      
            .wrapper {
              box-sizing: border-box;
              padding: 24px;
            }
      
            .footer {
              clear: both;
              padding-top: 24px;
              text-align: center;
              width: 100%;
            }
      
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #9a9ea6;
              font-size: 16px;
              text-align: center;
            }
          /* -------------------------------------
          TYPOGRAPHY
          ------------------------------------- */
      
            p {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 16px;
            }
      
            a {
              color: #0867ec;
              text-decoration: underline;
            }
          /* -------------------------------------
          BUTTONS
          ------------------------------------- */
      
            .btn {
              box-sizing: border-box;
              min-width: 100% !important;
              width: 100%;
            }
      
            .btn > tbody > tr > td {
              padding-bottom: 16px;
            }
      
            .btn table {
              width: auto;
            }
      
            .btn table td {
              background-color: #ffffff;
              border-radius: 4px;
              text-align: center;
            }
      
            .btn a {
              background-color: #ffffff;
              border: solid 2px #0867ec;
              border-radius: 4px;
              box-sizing: border-box;
              color: #0867ec;
              cursor: pointer;
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              margin: 0;
              padding: 12px 24px;
              text-decoration: none;
              text-transform: capitalize;
            }
      
            .btn-primary table td {
              background-color: #0867ec;
            }
      
            .btn-primary a {
              background-color: #0867ec;
              border-color: #0867ec;
              color: #ffffff;
            }
      
            @media all {
              .btn-primary table td:hover {
                background-color: #ec0867 !important;
              }
              .btn-primary a:hover {
                background-color: #ec0867 !important;
                border-color: #ec0867 !important;
              }
            }
      
          /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
      
            .last {
              margin-bottom: 0;
            }
      
            .first {
              margin-top: 0;
            }
      
            .align-center {
              text-align: center;
            }
      
            .align-right {
              text-align: right;
            }
      
            .align-left {
              text-align: left;
            }
      
            .text-link {
              color: #0867ec !important;
              text-decoration: underline !important;
            }
      
            .clear {
              clear: both;
            }
      
            .mt0 {
              margin-top: 0;
            }
      
            .mb0 {
              margin-bottom: 0;
            }
      
            .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
            }
      
            .powered-by a {
              text-decoration: none;
            }
      
          /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
      
            @media only screen and (max-width: 640px) {
              .main p,
              .main td,
              .main span {
                font-size: 16px !important;
              }
              .wrapper {
                padding: 8px !important;
              }
              .content {
                padding: 0 !important;
              }
              .container {
                padding: 0 !important;
                padding-top: 8px !important;
                width: 100% !important;
              }
              .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
              .btn table {
                max-width: 100% !important;
                width: 100% !important;
              }
              .btn a {
                font-size: 16px !important;
                max-width: 100% !important;
                width: 100% !important;
              }
            }
          /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
      
            @media all {
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%;
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
            }
          </style>
        </head>
        <body>
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="body"
          >
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="content">
                  <!-- START CENTERED WHITE CONTAINER -->
                  <span class="preheader">Email de postulación.</span>
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="main"
                  >
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper">                        
                        <p>
                          Te informamos que la empresa ${business_name} con NIT ${business_nit} ha completado las horas proyectadas para el programa registrado.
                        </p>
                      </td>
                    </tr>
      
                    <!-- END MAIN CONTENT AREA -->
                  </table>
      
                  <!-- START FOOTER -->
                  <div class="footer">
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td>
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABHCAYAAADlY75oAAAAxnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVBbEsMgCPznFD2CCCocxzw60xv0+EUhnSSTnXFFVlcA9u/nDa+BjAxcmlStNRlYWXO3QJKjT8bEkye0hobXPHALIVuKbCc/SjzAI49/A9+6ReVkJGsIy1VQDn+5GcVHNCrKFmxhpGFE2QUMg+5tparSzi0se7pCfMGguqbZCIb7/czNprcV+4dy3gkpGROJF0BjFaBuARkjWVHGdWbU2K+iD+RpTgfgB2DHWfyLIwS1AAABg2lDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TpSItDlYQEcxQneyiIo6likWwUNoKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxF5wUXaTE/yWFFjEeHPfj3b3H3TtAaFaZavbEAFWzjHQiLubyq2LgFX6EMAQBYxIz9WRmMQvP8XUPH1/vojzL+9yfI6QUTAb4ROIY0w2LeIN4dtPSOe8Th1lZUojPiScNuiDxI9dll984lxwWeGbYyKbnicPEYqmL5S5mZUMlniGOKKpG+ULOZYXzFme1Wmfte/IXBgvaSobrNEeRwBKSSEGEjDoqqMJClFaNFBNp2o97+Eccf4pcMrkqYORYQA0qJMcP/ge/uzWL01NuUjAO9L7Y9sc4ENgFWg3b/j627dYJ4H8GrrSOv9YE5j5Jb3S0yBEwsA1cXHc0eQ+43AGGn3TJkBzJT1MoFoH3M/qmPDB4C/Svub2193H6AGSpq+Ub4OAQmChR9rrHu/u6e/v3TLu/H28vcqU1Bmx1AAANdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDowOWZhMzYyNy05YjVlLTQ2NTEtOTE0ZC1mMWZhZGU0MjA3ZGIiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZTQwNjgwMDctODViNi00ODVjLWFlNTgtMzUyMTEyNWI2MzFkIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ODlhZGVkYTQtMzk5ZC00NGQxLThhMDMtYjI5MDA3YzM2ZTdjIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDE5MDAxODM0NjU4NzUiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDM6MTNUMTY6MDk6MzgtMDU6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAzOjEzVDE2OjA5OjM4LTA1OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2Y0ODFmNTEtYTc5Ny00MDViLWFiMzktNjg1Mzc0M2VjNzczIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAzLTEzVDE2OjA5OjQzIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PqNXw3cAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfpAw0VCSsvxmF1AAAS/klEQVR42u2ceXCc5X3HP8/7vnuvrtWubmmty5JtJF+y5QPMERLMFTAhQA5gONJpjkmTtNPONJ1p2knbpOlkJlOmnQCBQEhrwEAIBGPMYQw2xICxLR+SbVm3Vre09/0+/WPltYRtDEZQAe/nv5V2332e3/t9ftfz7Cu4/gGJgcEH5KoKO7dcWn3gtq+0Ln2/9wk2PWgIy+BDUagKLvc6ueGS6vtvvnbltwxhGcwp1RaF29eW8pO/+pJ47/8UwzwG50tXXOenrw7wvX9+RhrCMphTUhLueXeMH/zLs9IQlsGcc9/eMf7jvlekISyDOSWsSx7Z2c8LOw8XG8IymFP2BVP86bUTQ4awDOYWAS8dmTRCocHcczCc4t/vfUUawjKYcx55rd/wWAZzz4FQyhCWwceDISwDQ1gGhrAMDGEZGBjCMjCEZWAIy8DAEJaBISwDQ1gG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"
                            alt=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block">
                          <span class="apple-link">Comfandi 2025</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->
                  <!-- END CENTERED WHITE CONTAINER -->
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>`;
};

// Tech Cert Sign pending
export const techRegisterSignPendingNotificationMailBody = (
  appointment_date: string,
  consultor_name: string,
  business_name: string,  
) => {
  return `<html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Email Postulación</title>
          <style media="all" type="text/css">
          /* -------------------------------------
          GLOBAL RESETS
          ------------------------------------- */
      
            body {
              font-family: Helvetica, sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 16px;
              line-height: 1.3;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
            }
      
            table td {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              vertical-align: top;
            }
          /* -------------------------------------
          BODY & CONTAINER
          ------------------------------------- */
      
            body {
              background-color: #f4f5f6;
              margin: 0;
              padding: 0;
            }
      
            .body {
              background-color: #f4f5f6;
              width: 100%;
            }
      
            .container {
              margin: 0 auto !important;
              max-width: 600px;
              padding: 0;
              padding-top: 24px;
              width: 600px;
            }
      
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 600px;
              padding: 0;
            }
          /* -------------------------------------
          HEADER, FOOTER, MAIN
          ------------------------------------- */
      
            .main {
              background: #ffffff;
              border: 1px solid #eaebed;
              border-radius: 16px;
              width: 100%;
            }
      
            .wrapper {
              box-sizing: border-box;
              padding: 24px;
            }
      
            .footer {
              clear: both;
              padding-top: 24px;
              text-align: center;
              width: 100%;
            }
      
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #9a9ea6;
              font-size: 16px;
              text-align: center;
            }
          /* -------------------------------------
          TYPOGRAPHY
          ------------------------------------- */
      
            p {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 16px;
            }
      
            a {
              color: #0867ec;
              text-decoration: underline;
            }
          /* -------------------------------------
          BUTTONS
          ------------------------------------- */
      
            .btn {
              box-sizing: border-box;
              min-width: 100% !important;
              width: 100%;
            }
      
            .btn > tbody > tr > td {
              padding-bottom: 16px;
            }
      
            .btn table {
              width: auto;
            }
      
            .btn table td {
              background-color: #ffffff;
              border-radius: 4px;
              text-align: center;
            }
      
            .btn a {
              background-color: #ffffff;
              border: solid 2px #0867ec;
              border-radius: 4px;
              box-sizing: border-box;
              color: #0867ec;
              cursor: pointer;
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              margin: 0;
              padding: 12px 24px;
              text-decoration: none;
              text-transform: capitalize;
            }
      
            .btn-primary table td {
              background-color: #0867ec;
            }
      
            .btn-primary a {
              background-color: #0867ec;
              border-color: #0867ec;
              color: #ffffff;
            }
      
            @media all {
              .btn-primary table td:hover {
                background-color: #ec0867 !important;
              }
              .btn-primary a:hover {
                background-color: #ec0867 !important;
                border-color: #ec0867 !important;
              }
            }
      
          /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
      
            .last {
              margin-bottom: 0;
            }
      
            .first {
              margin-top: 0;
            }
      
            .align-center {
              text-align: center;
            }
      
            .align-right {
              text-align: right;
            }
      
            .align-left {
              text-align: left;
            }
      
            .text-link {
              color: #0867ec !important;
              text-decoration: underline !important;
            }
      
            .clear {
              clear: both;
            }
      
            .mt0 {
              margin-top: 0;
            }
      
            .mb0 {
              margin-bottom: 0;
            }
      
            .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
            }
      
            .powered-by a {
              text-decoration: none;
            }
      
          /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
      
            @media only screen and (max-width: 640px) {
              .main p,
              .main td,
              .main span {
                font-size: 16px !important;
              }
              .wrapper {
                padding: 8px !important;
              }
              .content {
                padding: 0 !important;
              }
              .container {
                padding: 0 !important;
                padding-top: 8px !important;
                width: 100% !important;
              }
              .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
              .btn table {
                max-width: 100% !important;
                width: 100% !important;
              }
              .btn a {
                font-size: 16px !important;
                max-width: 100% !important;
                width: 100% !important;
              }
            }
          /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
      
            @media all {
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%;
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
            }
          </style>
        </head>
        <body>
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="body"
          >
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="content">
                  <!-- START CENTERED WHITE CONTAINER -->
                  <span class="preheader">Email de postulación.</span>
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="main"
                  >
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper">                                                

                        <p>
                          Te informamos que se ha generado una nueva acta de asistencia 
                          creada por el consultor ${consultor_name} para la cita con la
                          empresa ${business_name}.
                        </p>      

                        <p>Verifica la información y diligencia la firma pendiente.</p>
                        
                        <p>La cita fue llevada a cabo el ${appointment_date}</p>

                        <p>Muchas gracias por tu atención</p>
      
                        <p>
                          Atentamente,<br />
                          Comfandi
                        </p>
                      </td>
                    </tr>
      
                    <!-- END MAIN CONTENT AREA -->
                  </table>
      
                  <!-- START FOOTER -->
                  <div class="footer">
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td>
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABHCAYAAADlY75oAAAAxnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVBbEsMgCPznFD2CCCocxzw60xv0+EUhnSSTnXFFVlcA9u/nDa+BjAxcmlStNRlYWXO3QJKjT8bEkye0hobXPHALIVuKbCc/SjzAI49/A9+6ReVkJGsIy1VQDn+5GcVHNCrKFmxhpGFE2QUMg+5tparSzi0se7pCfMGguqbZCIb7/czNprcV+4dy3gkpGROJF0BjFaBuARkjWVHGdWbU2K+iD+RpTgfgB2DHWfyLIwS1AAABg2lDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TpSItDlYQEcxQneyiIo6likWwUNoKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxF5wUXaTE/yWFFjEeHPfj3b3H3TtAaFaZavbEAFWzjHQiLubyq2LgFX6EMAQBYxIz9WRmMQvP8XUPH1/vojzL+9yfI6QUTAb4ROIY0w2LeIN4dtPSOe8Th1lZUojPiScNuiDxI9dll984lxwWeGbYyKbnicPEYqmL5S5mZUMlniGOKKpG+ULOZYXzFme1Wmfte/IXBgvaSobrNEeRwBKSSEGEjDoqqMJClFaNFBNp2o97+Eccf4pcMrkqYORYQA0qJMcP/ge/uzWL01NuUjAO9L7Y9sc4ENgFWg3b/j627dYJ4H8GrrSOv9YE5j5Jb3S0yBEwsA1cXHc0eQ+43AGGn3TJkBzJT1MoFoH3M/qmPDB4C/Svub2193H6AGSpq+Ub4OAQmChR9rrHu/u6e/v3TLu/H28vcqU1Bmx1AAANdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDowOWZhMzYyNy05YjVlLTQ2NTEtOTE0ZC1mMWZhZGU0MjA3ZGIiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZTQwNjgwMDctODViNi00ODVjLWFlNTgtMzUyMTEyNWI2MzFkIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ODlhZGVkYTQtMzk5ZC00NGQxLThhMDMtYjI5MDA3YzM2ZTdjIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDE5MDAxODM0NjU4NzUiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDM6MTNUMTY6MDk6MzgtMDU6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAzOjEzVDE2OjA5OjM4LTA1OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2Y0ODFmNTEtYTc5Ny00MDViLWFiMzktNjg1Mzc0M2VjNzczIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAzLTEzVDE2OjA5OjQzIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PqNXw3cAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfpAw0VCSsvxmF1AAAS/klEQVR42u2ceXCc5X3HP8/7vnuvrtWubmmty5JtJF+y5QPMERLMFTAhQA5gONJpjkmTtNPONJ1p2knbpOlkJlOmnQCBQEhrwEAIBGPMYQw2xICxLR+SbVm3Vre09/0+/WPltYRtDEZQAe/nv5V2332e3/t9ftfz7Cu4/gGJgcEH5KoKO7dcWn3gtq+0Ln2/9wk2PWgIy+BDUagKLvc6ueGS6vtvvnbltwxhGcwp1RaF29eW8pO/+pJ47/8UwzwG50tXXOenrw7wvX9+RhrCMphTUhLueXeMH/zLs9IQlsGcc9/eMf7jvlekISyDOSWsSx7Z2c8LOw8XG8IymFP2BVP86bUTQ4awDOYWAS8dmTRCocHcczCc4t/vfUUawjKYcx55rd/wWAZzz4FQyhCWwceDISwDQ1gGhrAMDGEZGBjCMjCEZWAIy8DAEJaBISwDQ1gGBoawDAxhGRjCMjAwhGVgCMvAEJaBgSEsA0NYBoawDAwMYRkYwjL4XKEZJvjwuFRBoUnBpgqORVJEP2VPGDMJaMoxYVIyj7XyJ9K0R9KzhSEyT5IxhPUJcLHbwmVNHpbUuSl256DrOg8+fYjftk99quZxeamdv/n6MjwuBxI40O7jHzYfpiehs8Suct2KIkrdDo71+dlyYJzBpG4I6+PKF76z3M03r1lCY10JTrsFRVGIxhK8ua8fPmXCKnBoNNYWU1ach5QQDsexqgKXKvj+VbXccGUzOQ4ro+NBXI+/zU92DBg51pwj4dbGPL59y0palnrJy7GhqgpCgKapeFx2zOLTNycxc8wCJNCQa6J1WRXuAicWs0ZZST5rlpVTZf7wMjE81jmosihcf0kt9dVFqErGwKFInP7BSUbGg/QOBdGAxGdgrom0JJ5IIqVECIGuS2KxFEldGsKaa5YWWWlqKMWkqQAEglGe3NbG5pe76JxKMJ7UiXxGHg+8P5jkuZ3Hyc+14ypw0D84ydbd3fiSEoQhrDnF67FTkGfPRBAJR7tGuHfrcd6YTHzm5pqS8Mudg7R1+SnOt3BiOMILQ9EPLao5FZZNQLVNxW3T0FRBMJ6mP5zC9wFq1lxFUGVTKbSpqIoglEjji6TpS5y9GvGoAosikEikhMHp76m2KFQ6TTjMCsF4mu5giv6EPss4TkVQ71DxODSQMBJJ0R5KEZOnX78w14LZlPFWutQZHPYzHElRbspccCB5+vyKNEGlXSPXoqJLyUQ0TXc0TTAtKTYJTEIgAH9aEpgOM3YBhZqCjkQgGErppGTGNnUODbdDzY61I/TBWhyFqqDKrpJnVREI/PE0/ZEU5/ronsEIcjCM4PyTx48sLLcquGZhHhuWldJQ46Egz4aqKERiCfoGp9jT5mPr/lHe8SdnK19CtVXhykUFrGsupc5bSF6ODUURxOJJfCMB9rcPs33fMC8Ox2Z9Z7VF4e+uqaXO6wJgdCLCQ9uO01JXwEUrK6kozcdq1ojEknT1jfP87m4ePjBBRJfcWJ3DlWsruKC+hPw8GwATUxH2HhrksZ09vDISxzt9/YULXBTk2bGYTZlKRwgW1xVz73dXA5KpQIx7nz2aWdUSmpwaVy9109pUire8ALvdgtQl/mCU4z3j7OsYZelCN6UeJ7oOu/f187NXB0hI+G5rMZe3elFVQTyRZstLx4mndDa2VrK4roi83FNj3X/Ex5Ov9/L84Bm8iYR6m8o1TS7WNpdRU+nC6bCAEIQjcfoGp/CNhVDV0xNyq4AfXlTKhcsrUBRBJJrk99uO8eiJ4CcrrGaHxrc31rDx4gbKivIwmbRZ1UZTYznrW2q4+GAfv33mML8/FshO/oslVu66eiEbVtXgLsxB09RZNrqgQbK+pYYvrBvmsa2H+fWeEfzTq7vArLC6uYJlF1QBMDwaoCDPxsqmKlz5DhTl1JUa60pYsrCEgi17UVXBzVc1Uev1YDGfmrqUsGRhKbVVLvTfvctkLM2q5gpWNFUhADE9KSEEtQuKqV1QBMDIeJDndveCL8omr4O7vryI1uULKMi1z7pxEljRVMUVG6LYrCbsNjNpXRKKJrC+NkhalyypLeSSdQ2YNIVILIlEUOctpLrSjXnmWIGmxjIW1xVh+f1enu4JnxLXtF3/4tpGLlpdQ2G+E02bLaCliyqIxZNYLKYzCEvQvLCIS9c3oiqCQCjG7v2D8EkKy2tW+MGX69l0RRP5ufYZN0miS4kiBKqi4Mp3cPGaevJyrPh/s4dn+yNcVmzlb7+xjPUtNdis5lmflRKEIlAUgdNhZfmSKgoLnFjM7/Bvrw2SkhnjCiGyN9ztcnLJ2oVYzBq6lOi6jhDTLQFVYUGlm7tvasFsUiktystWPACKIhACHHYLa1dWc1P3GPe92ANCIBCzy3JOlumnhCaRXFVu50ffWM7qpQtmiUCXMlvamzQVt8t5qs8jpj8vQX/P32wWE5eurc/YRjB7rIDNaqZlqZdvjgbY+3BbNmVYX2jmr29pZkNrPTar6XS7ClBVBYfdcrYuxLRdZ9v3Ew2FN6/0cOUljVlR6bpkaNTP0RMjTAWiuF0O6quL8BTmoCgCk6ZiVgVlJoU7rqhl3cpTooonUvT7JukdnCQeT1HkdlJdWUh+bsb7eMtdfO3qJo4NBNncefrq0TQVkdbp901ytGuEYChOZVk+i+pKsFnNKELgLS8EAeFwjBO9Y/QMTGI2qSyqL6GipABFEThsFlY3V/L46/20d44gAKfDQm2VG01TkVIyMDTF8FhmDBP+CIFoituuqKOl2ZsVVTyeos83Qc/ABKFIglyHlbLiXEqL88lxWDnX/VIUgc1qJhCM0tk7Sr9vCrNZo7GmiMpyF6qiYDFrtDRVsqa8k76uEDmK4NbLFrC+pTYrqmQyTf/QJF194wTDcZx2CyWeHMqK88jLtaOIj68Bd17CqrOqfKF1AZ7CnOyKaO8c4jdb3uWPbeMMJXSqrArXryjiG9c2k0yluXfLPp7sCXPrwjwuWl2D3ZYRVSSW4OVdR3lkawdv9oeJ6JIap8am1jJuuaaZqvJChBDUeD1cva6Kbd2HTxtPMpVmb1svDz9zkK1HJhlLStYWWfnx7Su5cFVt1isNjwb4w/aDPPpqL+9OxLErgjtai/n+bWspcuciBBR7cih0aPzTY0dwaO3cvLaM79++Hk1T0XXJW/t7+OnmQ6R0SVrCqkon61YuwDodWiLRBNtfa+eR54/y58EI/pSkQBM0Flq4cYOXr127/KweY6aH6R2Y4IltB3li9wCH/EnsKtzYVMgPb19DdaU7k5wXOGmoyIWuEBeWWNmwqjqTTwGJZIpdb3Xy4B8Ps7M7yGRKkqcKavJMXNVSyl03raIw3zG/hLXEY6W+2pNtGE4FomzZdohfvjWSfc/hSJqOXT76RiMkU5LNnQEEsHqxh2J3btaAB9sH+dWWg7MS9NGpJB3be7FbNe64cTVOhwWLWWPpojIuyD9OKDF7w3RiMsxDT7fx3/snsvnGC0NRrjg4wKqlVdisZtK6zjsH+/jZM8fpjmdCx1Ra8tz+MTb5JvG4cxGA1WIi32HieCwEwKbk7O9Kp3U6gknC06XVXza6Zy2wgx0D/OqJw7wyEsuOJZCQ9PiiNPVMkkqfe98tnkix9dUOfrK1m+B0GPTr8OiBcS5vH6Rq2muZTRqF+VYAVtTmU16Sn71Gd984v37yII92Bk+NQ5f0jcUp75wgkUh97NtgH5pKt428HFv29dConx1to6e9Ly3hdx1+Nndmkna3JvCW5WE2aVkD7jnQf1rVBzClS7a/42N4LHCqAi1wUuU6fbWnUmlGA4nTKqSxqRip1KkbGY2nmHxPe2AiniYYimcy+OkcQ1U+WIhwq6fP560DA7wyGuMjVOroumQiEMuK6iQjKcnweBg9LbP5nklTUQV4S3OzqUU6rdPW4eOFntCZx/EJNHTPS1gOq5atNqSEQDCGL3zuFWBXBE6HJZtjJJNpBkfDZ33/gD9JMHRKdGazSo7d9MFvkJSzbHg2G+vy/CztVAU5zlPzSSTT9L/PfBTxUTpDJxeRzsxZCQE2IchzWrLVcCqt4xsNMZmWZ83hxHwUViKZnrVqrBYTuaZzXyolM/nQzAk6bGePxg6zMqvKSuuSZEpnvqBzqmI7KRzL+9jBnW9Fm94amkvSUpJOzxabWXufceSaZ7Vb5o2whiZjhCLx7OsSTy5ravPO6WInUjrDo6FsnmGxmGiq91BtUc7oSlbX5lE0nb8ABEMxhqbi80ZY/pRk0h/Nisti0WjwuihUT/cHi+wqSxuKsVi02Z5jDlxHTMKEP5q1q6aq1FS5aLCpZ9wVaFlcjMNhmX/Cah+J0uebRE6HELfLyU0bF/HVGudpR0gabCp3LSngBq+TqA5tx8ey4U1TFVqXLeBbGyrwzjiaIYCvVDu54YuN2X06XZd09ozRMT6PhKVLOvsmicWTQCbfWbvCy20rPOTMyNOqLQp3X1rFiqbKbMEjBBS5nCywq8iPmPNI4Fi/n1A4lhVs86Jybl1fRtkMD+pWBXevKWHD6ppsXjivqsJ9wRSvv9PL4vrS7PmkVUu9/GOOjY37e+n1BZFSUuSys7jOQ311EW8d6OWNB/ax48gE1x71sW5lDaqqUOTO5Y4bV9JYU0jb0VGi8RRVJTmsW+FlUV1JtoM9Nhlix1u9HI+lWW6aP3vnbx4Z4/qhKRbWFANQVV7I976+iub6Lo71TmLWFJY2FLFuZTWFBc4Z4UqwsKaIOy/z8outXR95HHs6/XT2jOHKdyCEwONycsdXVlJfVcDB42NICYtqXFy4qoby0oKP3S7a+a6QLbsHaF7Yle14m00aixeWUV9TRGK6HWAyqZg0FUURBMMxlrgsvDgU49FtRygtyqXG60ERghJPHtde3sQXL0qi6xKzScVi1rKd31A4zku7jrLlnRHmGy/1Rdi+6xjFntzsXmeN10NFWQHxeAohBFaLCU1TCEXiRKMJ3K4chID8PDvNDSW4X+79yON4YzLBczuP4a1wUezORQhBWXE+mzYu5cp4EmQmFzaZVGLxJKqqZI8CzZtQCLBnKsk9Txxkx5vHCASj04fDwGzScDos2d6TomS2T2xWM+UFVhDwwL5x7t+ylyPHfNl+iqYqOO0Wcp1WrBZTdttlbCLEn14+xD1Pd3Aslp53wgrokgde7OH5V48w6Y9kw5rZpJHjtOJ0WNA0hUAoygs723nsuf1MTGV6ZMFgjF3v9rE/lJyTsTy028dT2w4yPBrIVromTSXHYSXHacVkUgkEo+x6+wRTgcj881gnE6Fn+yKM/vZdbjo6woUtXirLCnDaLaiqggSSyRT+QJQTfePsfLuX3d2ZrZCohF/sHqJ7KMx1Fy1g+ZJyitw5WS+VSusEQ1FO9I7z0ptdPPrnIdqj6RnVIYxNhhkamQIEI2MB4mc48B+Ophge9ROJxEnrOpP+6BlaEpkTA0MjfoQQTEyFicbT79kbfH/2BpP862OH6R8KcNmaGirLXNismcURiycZHJ7i1T1dPPRyD/6EntksvrAe30iAZ98eQgX8wThDI340TSUSSxCKJM/oBQLhBEMjfswmjUQyhT8UR5muULsTOj9/5ji+sTAbL6qlptKNw2FBEYJ4IoVvxM+ON0/wdsco7gI76ZSOlJLxyQgni9tJf5ShET+qohAMxwjHUucpj00PyrlweytyTSwpc1DhtmG3mUindaaCCXpGIhwaic4SxsyY6tEEyz1WGsocePKtqKpCKJL5XNtghLYz9MdU4EulNlyOTE8rmkizYyDCxHv6NjUWhVXldrTphLl7PMauMxzQu8xjoTRveiskpbN7IMLAtFD/8/o67r65FaslM6fH//Qudz7UdsbzUJqANQVmmipzKCm0oQjB6FSMQ31B3hiNZU+aFqiCi8vtJFKS5wYznmNVnomFHisg0KVk32CEI2ew2TKnxuISG4LMBvjhoSj7QqfbqCXXxLJKJ+UeOyZNYcIf51BfkNdHYtgEXFxhxzp9zmwkmGD7dJN6fYGZBYWZbn5Kl7w9EKYzrv//COuzynWVDn585ypamr0IIUgkUzzw2B6+88RRDKOdIxR6LSo98bRhiRlc4NC4/eIKLm2t5oKG8mwREY4k6Br0G6L6IFHsm6uLDSu8hxqXhS9ftogVF1RlO9S6LjnWNcwbR6cMA30QYa1uKr2tzGT8vHAmXRNxJqYinNxdTKbSHO0a5n+fO8xr86hBO58RAF/90ePy8a6QYY1pbALuubmRKy9ZhD8Q5dCxIZ59vZtH2qc+0vMMPlc5FsDG1srYi73t1rPthn/eiEp46MUudh8Ypnc8Stt4nKHz+G3d595jAdz546fkA4emDOMZzK2wADbc/T9yp5FDGMxF8j7zxXeva7h/Za7JsIrB3HosgM3PvPPwfz3dcevOsbgRFg3mTlgnuePvn5JPdfiZ0o2E3mAOhQVw/+Y35PN/7mfXQARfUjesZTA3wjrJH7btv/vNNt99j7w1nHnAhoHBOfg/hg+aTYQBFscAAAAASUVORK5CYII="
                            alt=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block">
                          <span class="apple-link">Comfandi 2025</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->
                  <!-- END CENTERED WHITE CONTAINER -->
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>`;
};

export const techRegisterSignPendingNotificationTextBody = (
  appointment_date: string,
  consultor_name: string,
  business_name: string,  
) => {
  return `
¡Te informamos que se ha generado una nueva acta de asistencia\r\n
creada por el consultor ${consultor_name} para la cita con la\r\n
empresa ${business_name}.\r\n

Verifica la información y diligencia la firma pendiente.\r\n\r\n

La cita fue llevada a cabo el ${appointment_date}\r\n\r\n

Muchas gracias por tu atención\r\n\r\n

Atentamente,\r\n 
Comfandi.`;
};