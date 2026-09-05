<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - REPOST</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7faf5; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7faf5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #005139 0%, #005139 100%); padding: 40px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700;">REPOST</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #393030; font-size: 22px; margin: 0 0 16px 0;">Reset Password</h2>
                            <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                                Anda menerima email ini karena kami menerima permintaan reset password untuk akun Anda.
                            </p>

                            <!-- Reset Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="http://localhost:5173/reset-password?token={{ $token }}&email={{ urlencode($email) }}"
                                           style="display: inline-block; background-color: #005139; color: #ffffff; text-decoration: none; padding: 14px 48px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
                                Atau copy link ini ke browser Anda:
                            </p>
                            <p style="word-break: break-all; color: #5aa9e6; font-size: 13px; margin: 0 0 24px 0;">
                                http://localhost:5173/reset-password?token={{ $token }}&email={{ urlencode($email) }}
                            </p>

                            <!-- Warning -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3cd; border-radius: 8px; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style="color: #856404; font-size: 13px; margin: 0;">
                                            ⚠️ Link ini akan kedaluwarsa dalam 60 menit. Jika Anda tidak meminta reset password, abaikan email ini.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f7faf5; padding: 24px 40px; text-align: center;">
                            <p style="color: #999; font-size: 12px; margin: 0;">
                                © 2026 REPOST. Semua hak dilindungi.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
