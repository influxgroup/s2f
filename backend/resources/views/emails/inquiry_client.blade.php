<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Received</title>
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
                Thank you for reaching out, {{ $inquiry->name }}.
              </h2>

              <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                We have received your project details. Our technical leadership team is reviewing your requirements to align the appropriate engineering resources and technical architecture.
              </p>

              <div style="padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
                  Submission Summary
                </h3>
                <p style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a;">
                  <strong>Service Track:</strong> {{ ucwords(str_replace('_', ' ', $inquiry->service_type ?? 'General Inquiry')) }}
                </p>
                @if($inquiry->timeline)
                <p style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a;">
                  <strong>Timeline:</strong> {{ $inquiry->timeline }}
                </p>
                @endif
                @if($inquiry->budget_range)
                <p style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a;">
                  <strong>Budget Scope:</strong> {{ $inquiry->budget_range }}
                </p>
                @endif
                <p style="margin: 0; font-size: 14px; color: #64748b; font-style: italic;">
                  "{{ \Illuminate\Support\Str::limit($inquiry->message, 180) }}"
                </p>
              </div>

              <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 700; color: #0f172a;">
                What to Expect Next:
              </h3>
              <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 14px; color: #475569; line-height: 1.7;">
                <li>A dedicated technical lead will review your project scope and stack needs.</li>
                <li>You will receive a direct email response within <strong>24 business hours</strong>.</li>
                <li>If mutual fit is confirmed, we will invite you to an introductory technical roadmap consultation.</li>
              </ul>

              <p style="margin: 0; font-size: 14px; color: #64748b;">
                Best regards,<br>
                <strong style="color: #0f172a;">The Sovereign2Fresh Empire Team</strong><br>
                <a href="https://sovereign2freshempire.com" style="color: #2563eb; text-decoration: none;">sovereign2freshempire.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              &copy; {{ date('Y') }} Sovereign2Fresh Empire. All rights reserved. Confidential and proprietary.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
