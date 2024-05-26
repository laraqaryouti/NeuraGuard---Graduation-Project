import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import config

def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg['From'] = config.EMAIL_FROM
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(config.EMAIL_HOST, config.EMAIL_PORT)
        server.starttls()
        server.login(config.EMAIL_USER, config.EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(config.EMAIL_FROM, to_email, text)
        server.quit()
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
