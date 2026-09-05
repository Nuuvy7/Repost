<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support Ticket - REPOST</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7faf5; font-family: 'Inter', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7faf5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="500" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #005139; padding: 30px 40px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700;">💬 REPOST</h1>
                            <p style="color: #89f87f; font-size: 12px; margin: 8px 0 0 0; letter-spacing: 2px; text-transform: uppercase;">Support Ticket</p>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #393030; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
                                Pesan Baru dari {{ $ticket->name }}
                            </h2>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7faf5; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                                <tr>
                                    <td>
                                        <p style="color: #393030; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Nama</p>
                                        <p style="color: #393030; font-size: 14px; margin: 0 0 16px 0;">{{ $ticket->name }}</p>

                                        <p style="color: #393030; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Email</p>
                                        <p style="color: #393030; font-size: 14px; margin: 0 0 16px 0;">{{ $ticket->email }}</p>

                                        <p style="color: #393030; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Subjek</p>
                                        <p style="color: #393030; font-size: 14px; margin: 0 0 16px 0;">{{ $ticket->subject }}</p>

                                        <p style="color: #393030; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Pesan</p>
                                        <p style="color: #393030; font-size: 14px; margin: 0; line-height: 1.6;">{{ $ticket->message }}</p>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #393030; font-size: 12px; margin: 0; opacity: 0.5;">
                                Ticket ID: #{{ $ticket->id }} | {{ $ticket->created_at->format('d M Y, H:i') }}
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #f7faf5; text-align: center; border-top: 1px solid #e8f0ea;">
                            <p style="color: #393030; font-size: 11px; margin: 0; opacity: 0.5;">
                                © {{ date('Y') }} REPOST. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
