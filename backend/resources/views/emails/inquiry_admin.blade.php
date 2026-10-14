<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enterprise Inquiry</title>
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
                New Inbound Lead & Project Inquiry
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <div style="display: inline-block; padding: 4px 10px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; font-size: 12px; font-weight: 600; color: #1d4ed8; margin-bottom: 20px;">
                New Lead Alert
              </div>

              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                Inquiry Details
              </h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; width: 140px;">Full Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">{{ $inquiry->name }}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Email Address</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a;">
                    <a href="mailto:{{ $inquiry->email }}" style="color: #2563eb; text-decoration: none;">{{ $inquiry->email }}</a>
                  </td>
                </tr>
                @if($inquiry->company)
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Company / Org</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a;">{{ $inquiry->company }}</td>
                </tr>
                @endif
                @if($inquiry->phone)
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a;">{{ $inquiry->phone }}</td>
                </tr>
                @endif
                @if($inquiry->service_type)
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Service Track</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a;">{{ ucwords(str_replace('_', ' ', $inquiry->service_type)) }}</td>
                </tr>
                @endif
                @if($inquiry->budget_range)
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Estimated Budget</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a;">{{ $inquiry->budget_range }}</td>
                </tr>
                @endif
                @if($inquiry->timeline)
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Target Timeline</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a;">{{ $inquiry->timeline }}</td>
                </tr>
                @endif
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Submitted At</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">{{ $inquiry->created_at->format('M j, Y - H:i T') }}</td>
                </tr>
              </table>

              <div style="margin-top: 24px;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em;">
                  Project Brief & Requirements:
                </h3>
                <div style="padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; color: #334155; white-space: pre-line; line-height: 1.6;">
{{ $inquiry->message }}
                </div>
              </div>

              <!-- Call to Action -->
              <div style="margin-top: 32px; text-align: left;">
                <a href="mailto:{{ $inquiry->email }}?subject=RE:%20Sovereign2Fresh%20Empire%20Inquiry" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                  Reply to {{ $inquiry->name }}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the Sovereign2Fresh Empire API.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
