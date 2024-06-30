from email.mime.multipart import MIMEMultipart
import pandas as pd
import smtplib
from email.mime.text import MIMEText


def send_email(subject, df, sender, recipients, password):
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = ", ".join(recipients)

    html = """\
    <html>
      <head></head>
      <body>
        {0}
      </body>
    </html>
    """.format(df.to_html())

    part1 = MIMEText(html, 'html')
    msg.attach(part1)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        smtp_server.login(sender, password)
        smtp_server.sendmail(sender, recipients, msg.as_string())
    print("Message sent!")


exceptions = pd.read_excel('data/mock_exceptions.xlsx')
mapping = pd.read_excel('data/mapping.xlsx')

exceptions = exceptions.rename(columns={'Nombre de Materia': 'Materia'})

requests_by_dep = pd.merge(exceptions, mapping, on='Materia', how='inner')

requests_by_dep = requests_by_dep.groupby('Responsable')

for name in mapping['Responsable'].unique():
    subject = 'Excepciones para ' + name
    df = requests_by_dep.get_group(name)
    df = df.drop(['Responsable', 'Mail'], axis=1)
    send_email(subject, df, "mavasquez@itba.edu.ar", ['mavasquez@itba.edu.ar'], "f l k c r p a y c y j a t c y c")
