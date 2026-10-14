<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background-color: #0f172a; border-bottom: 1px solid #1e293b;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">
                Sovereign2Fresh Empire
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">
                Elite Engineering & Technology Partners
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                Discovery Consultation Confirmed
              </h2>

              <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Hello {{ $consultation->contact_name }}, thank you for scheduling a technical discovery session with Sovereign2Fresh Empire on behalf of <strong>{{ $consultation->company_name }}</strong>.
              </p>

              <div style="padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
                  Session Overview
                </h3>
                @if($consultation->squad_type)
                <p style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a;">
                  <strong>Requested Focus:</strong> {{ $consultation->squad_type }}
                </p>
                @endif
                @if($consultation->timeline)
                <p style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a;">
                  <strong>Target Timeline:</strong> {{ $consultation->timeline }}
                </p>
                @endif
                <p style="margin: 0; font-size: 13px; color: #64748b;">
                  Status: <em>Scheduled for Review & Calendar Invitation</em>
                </p>
              </div>

              <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 700; color: #0f172a;">
                Agenda for Our Call:
              </h3>
              <ol style="margin: 0 0 24px 0; padding-left: 20px; font-size: 14px; color: #475569; line-height: 1.7;">
                <li><strong>Scope & Stack Assessment:</strong> Deep dive into your product architecture, codebase requirements, and tech stack alignment.</li>
                <li><strong>Squad Composition:</strong> Determining the optimal mix of senior engineers, tech leads, or cybersecurity auditors.</li>
                <li><strong>Timeline & Budget Modeling:</strong> Reviewing milestones, delivery SLAs, and agency engagement agreements (MSA & NDA).</li>
              </ol>

              <p style="margin: 0; font-size: 14px; color: #64748b;">
                Our Tech Lead will send a calendar invitation (Google Meet or Zoom) shortly.<br><br>
                Warm regards,<br>
                <strong style="color: #0f172a;">Sovereign2Fresh Empire Leadership</strong><br>
                <a href="https://sovereign2freshempire.com" style="color: #2563eb; text-decoration: none;">sovereign2freshempire.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              &copy; {{ date('Y') }} Sovereign2Fresh Empire. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
